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
$executors = getDataFromPostRequest('executors',false);
if (!empty($executors) && !is_array($executors)) {
    badRequest('Executors must be an array.');
}
$status = getDataFromPostRequest('status', false);
if (!$status) {
    $status = null;
}

$priority = getDataFromPostRequest('priority');
if ($priority < 1 || $priority > 10) {
    badRequest('Priority must be 1-10');
}

$manager = getDataFromPostRequest('managerId', false);
if (!$manager) {
    if ($user['userRole'] == 'Admin') {
        badRequest('Admin cannot be manager.');
    }
    $manager = $user['userId'];
}

$db = Database::getConnection();
try {
    $db->beginTransaction();

    $statement = $db->prepare(
        "UPDATE task SET title=?, description=?,dueDate=?,priority=?,taskGroupId=?,managerId=?,status=? WHERE id=?"
    );
    if (!$statement->execute([$title, $description, $dueDate, $priority, $taskGroupId, $manager, $status, $id])) {
        throw new Exception();
    }

    $statement = $db->prepare(
        "DELETE FROM selectedTask WHERE taskId=?"
    );
    if (!$statement->execute([$id])) {
        throw new Exception();
    }

    foreach ($executors as $executor) {
        $statement = $db->prepare(
            "INSERT INTO selectedTask (userId,taskId) VALUES (?,?)"
        );
        if (!$statement->execute([$executor, $id])) {
            throw new Exception();
        }
    }

    if (!empty($_FILES['files'])) {
        storeTaskFiles("task-$id", $_FILES['files']);
    }

    $db->commit();
} catch (Exception $exception) {
    $db->rollBack();
    badRequest('Task not updated successfully');
}
sendResponse(['message' => 'Task updated successfully']);

