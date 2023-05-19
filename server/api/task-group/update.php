<?php

require_once __DIR__ . '/../../src/services/apiController.php';
require_once __DIR__ . '/../../src/services/user/authService.php';
require_once __DIR__ . '/../../src/db/Database.php';

checkRequestType();
if ((true !== $result = canUserAccess('Rukovodilac'))) {
    unauthorized($result);
}

$id = getDataFromPostRequest('id');
$name = getDataFromPostRequest('name');
$db = Database::getConnection();
try {
    $db->beginTransaction();

    $statement = $db->prepare('UPDATE taskGroup SET name=:name WHERE id=:id');
    $statement->bindParam('name', $name);
    $statement->bindParam('id', $id);
    $statement->execute();

    $db->commit();
} catch (Exception $exception) {
    $db->rollBack();
    badRequest('Error occurred, task group not updated.');
}

sendResponse(['message' => 'Task group updated successfully']);