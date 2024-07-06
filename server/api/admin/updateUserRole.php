<?php

require_once __DIR__ . '/../../src/services/apiController.php';
require_once __DIR__ . '/../../src/services/user/authService.php';
require_once __DIR__ . '/../../src/db/Database.php';

checkRequestType();
canUserAccess('Admin');

$db = Database::getConnection();
try {
    $db->beginTransaction();
    $id = getDataFromPostRequest('id');
    $userRoleName = getDataFromPostRequest('name');

    $statement = $db->prepare("UPDATE userRole SET name=:name WHERE id=:id");
    $statement->bindParam('name', $userRoleName);
    $statement->bindParam('id', $id);
    $result = $statement->execute();
    if (!$result) {
        badRequest('User role not updated.');
    }
    $db->commit();
    sendResponse(['message'=>'User role updated successfully']);
} catch (Exception $exception) {
    $db->rollBack();
    badRequest('User role not updated.');
}