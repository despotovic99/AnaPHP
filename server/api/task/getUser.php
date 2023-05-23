<?php

require_once __DIR__ . '/../../src/services/apiController.php';
require_once __DIR__ . '/../../src/services/user/authService.php';
require_once __DIR__ . '/../../src/services/user/userService.php';
require_once __DIR__ . '/../../src/db/Database.php';

checkRequestType('GET');
canUserAccess('rukovodilac');

$id = !empty($_GET['id']) ? htmlspecialchars($_GET['id']) : null;

$db = Database::getConnection();

$query = "SELECT u.id,username,firstName,lastName,phone,email, birthday,uR.name as userRole 
                FROM user u INNER JOIN userRole uR on u.userRoleId=uR.id
                WHERE u.id=$id AND uR.name='Admin'";

$result = $db->query($query);
if (!$result || !($user = $result->fetch(PDO::FETCH_ASSOC))) {
    $user = [];
}
sendResponse(['users' => $user]);
