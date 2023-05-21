<?php

require_once __DIR__ . '/../../src/services/apiController.php';
require_once __DIR__ . '/../../src/services/user/authService.php';
require_once __DIR__ . '/../../src/services/file/fileService.php';
require_once __DIR__ . '/../../src/db/Database.php';

checkRequestType();
$user = canUserAccess('Rukovodilac');

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

$folderName = 'task';
$db = Database::getConnection();
try {
    $db->beginTransaction();

    $statement = $db->prepare(
        "INSERT INTO task (title,description,dueDate,priority,taskGroupId,managerId) VALUES (?,?,?,?,?,?)"
    );
    if (!$statement->execute([$title, $description, $dueDate, $priority, $taskGroupId, $manager])) {
        throw new Exception();
    }
    $taskId = $db->lastInsertId();

    $folderName .= '-' . $taskId;
    storeTaskFiles($folderName, $_FILES['files']);

    $db->commit();
} catch (Exception $exception) {
    $db->rollBack();
    $message = 'Error occurred, task not saved';
    if ($exception instanceof TaskFilesException) {
        deleteFolder(__DIR__ . "/../../uploads/$folderName");
        $message .= ' ' . $exception->getMessage();
    }
    badRequest($message);
}
sendResponse(['message' => 'Task created successfully']);
