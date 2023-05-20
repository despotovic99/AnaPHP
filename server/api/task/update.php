<?php

require_once __DIR__ . '/../../src/services/apiController.php';
require_once __DIR__ . '/../../src/services/user/authService.php';
require_once __DIR__ . '/../../src/services/file/fileService.php';
require_once __DIR__ . '/../../src/db/Database.php';

checkRequestType();
$user = canUserAccess('Rukovodilac');

$id = getDataFromPostRequest('id');
$title = getDataFromPostRequest('title');
$taskGroupId = getDataFromPostRequest('taskGroupId');
$description = getDataFromPostRequest('description');
$dueDate = getDataFromPostRequest('dueDate');
$executors = getDataFromPostRequest('executors');

$priority = getDataFromPostRequest('priority');
if ($priority < 1 || $priority > 10) {
    badRequest('Priority must be 1-10');
}
$manager = getDataFromPostRequest('manager', false);
if (!$manager) {
    $manager = $user['userId'];
}

$db = Database::getConnection();
try {
    $db->beginTransaction();

    $statement = $db->prepare(
        "UPDATE task SET title=?, description=?,dueDate=?,priority=?,taskGroupId=?,managerId=? WHERE id=?"
    );
    if (!$statement->execute([$title, $description, $dueDate, $priority, $taskGroupId, $manager,$id])) {
        throw new Exception();
    }

    $db->commit();
} catch (Exception $exception) {
    $db->rollBack();
    badRequest('Task not updated successfully');
}
sendResponse(['message' => 'Task updated successfully']);

