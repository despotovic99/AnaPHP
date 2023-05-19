<?php

require_once __DIR__ . '/../../src/services/apiController.php';
require_once __DIR__ . '/../../src/services/user/authService.php';
require_once __DIR__ . '/../../src/db/Database.php';

checkRequestType();
if ((true !== $result = canUserAccess('Rukovodilac'))) {
    unauthorized($result);
}

$name = getDataFromPostRequest('name');
$db = Database::getConnection();
try {
    $db->beginTransaction();

    $statement = $db->prepare('INSERT INTO taskGroup (name) VALUES (:name)');
    $statement->bindParam('name', $name);
    $statement->execute();

    $db->commit();
} catch (Exception $exception) {
    $db->rollBack();
    badRequest('Error occurred, task group not created.');
}

sendResponse(['message' => 'Task group created successfully']);