<?php

require_once __DIR__ . '/../../src/services/apiController.php';
require_once __DIR__ . '/../../src/services/user/authService.php';
require_once __DIR__ . '/../../src/db/Database.php';

checkRequestType();
canUserAccess('Admin');

$db = Database::getConnection();
try {
    $db->beginTransaction();
    $userRoleName = getDataFromPostRequest('name');

    $statement = $db->prepare("INSERT INTO userRole (name) VALUES(:name)");
    $statement->bindParam('name', $userRoleName);
    $result = $statement->execute();
    if (!$result) {
        badRequest('User role not saved.');
    }
    $db->commit();
    sendResponse(['message' => 'User role saved successfully']);
} catch (Exception $exception) {
    $db->rollBack();
    badRequest('User role not saved.');
}