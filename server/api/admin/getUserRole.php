<?php

require_once __DIR__ . '/../../src/services/apiController.php';
require_once __DIR__ . '/../../src/services/user/authService.php';
require_once __DIR__ . '/../../src/db/Database.php';

checkRequestType('GET');
if ((true !== $result = canUserAccess('Admin'))) {
    unauthorized($result);
}

if (empty($_GET['id'])) {
    badRequest('Id is missing!');
}
$id = htmlspecialchars($_GET['id']);

$db = Database::getConnection();
try {
    $role = [];
    $statement = $db->prepare("SELECT * FROM userRole WHERE id=:id");
    $statement->bindParam('id', $id);
    $statement->execute();
    if (!$statement || !($role = $statement->fetch(PDO::FETCH_ASSOC))) {
        badRequest('Can not get task with provided id ' . $id);
    }

    sendResponse(['data' => $role]);
} catch (Exception $exception) {
    badRequest('Error occurred while getting user role.');
}