<?php

require_once __DIR__ . '/../../src/services/apiController.php';
require_once __DIR__ . '/../../src/services/user/authService.php';
require_once __DIR__ . '/../../src/services/user/userService.php';
require_once __DIR__ . '/../../src/db/Database.php';

checkRequestType('GET');
canUserAccess('rukovodilac');

$type = !empty($_GET['type']) ? htmlspecialchars($_GET['type']) : null;

$db = Database::getConnection();

$query = "SELECT u.id,username,firstName,lastName,phone,email, birthday,uR.name as userRole 
                FROM user u INNER JOIN userRole uR on u.userRoleId=uR.id";
if ($type && strtolower($type) !== 'admin') {
    $query .= " WHERE uR.name LIKE '%$type%'";
} else {
    $query .= " WHERE uR.name NOT LIKE 'Admin'";
}
$result = $db->query($query);
if (!$result || !($users = $result->fetchAll(PDO::FETCH_ASSOC))) {
    badRequest('Users not found.');
}
sendResponse(['users' => $users]);
// get all users