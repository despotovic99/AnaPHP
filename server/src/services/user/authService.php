<?php

require_once __DIR__ . '/../util.php';
require_once __DIR__ . '/../../db/Database.php';

function canUserAccess(string $userRole): bool|string
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
        return 'User is not logged.';
    }

    if ($userRole !== $user['userRole']) {
        return 'User is not permitted to this operation.';
    }
    return true;
}

function logoutUser(): string|bool
{
    try {
        $token = !empty($_SERVER['HTTP_ACCESS_TOKEN']) ? $_SERVER['HTTP_ACCESS_TOKEN'] : 'invalid_token';
        $db = Database::getConnection();

        $result = $db->query("SELECT * FROM accessToken WHERE token='$token'");
        if (!$result->fetch(PDO::FETCH_ASSOC)) {
            return 'User is not logged in.';
        }

        $db->query("DELETE FROM accessToken WHERE token='$token'");
    } catch (Exception $e) {
        return 'User is not logged out successfully.';
    }
    return true;
}