<?php

require_once __DIR__ . '/../apiController.php';
require_once __DIR__ . '/../../db/Database.php';

function canUserAccess(string $userRole): array
{
    $token = !empty($_SERVER['HTTP_ACCESS_TOKEN']) ? $_SERVER['HTTP_ACCESS_TOKEN'] : 'invalid_token';

    $db = Database::getConnection();
    $result = $db->query(
        "SELECT accessToken.*, u.*, uR.name as userRole FROM accessToken 
                INNER JOIN user u on accessToken.userId = u.id
                INNER JOIN userRole uR on u.userRoleId = uR.id
                WHERE token='$token'"
    );
    $user = $result->fetch(PDO::FETCH_ASSOC);
    if (!$user) {
        unauthorized('User is not logged.');
    }

    $currentUserAccessLevel = getUserAccessLevel($user['userRole']);
    $necessaryUserAccessLevel = getUserAccessLevel($userRole);
    if ($currentUserAccessLevel < $necessaryUserAccessLevel) {
        unauthorized('User is not permitted to this operation.');
    }
    return $user;
}

function getUserAccessLevel(string $role): int
{
    $role = strtolower($role);
    $accessLevel = [
        'admin' => 4,
        'rukovodilac' => 3,
        'izvrsilac' => 2,
        'default' => 1
    ];
    if (empty($accessLevel[$role])) {
        $role = 'default';
    }
    return $accessLevel[$role];
}

function logoutUser($token): string|bool
{
    try {
        $db = Database::getConnection();

        $db->query("DELETE FROM accessToken WHERE token='$token'");
    } catch (Exception $e) {
        return 'User is not logged out successfully.';
    }
    return true;
}
