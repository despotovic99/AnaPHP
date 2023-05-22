<?php

require_once __DIR__ . '/../../src/services/apiController.php';
require_once __DIR__ . '/../../src/services/user/authService.php';
require_once __DIR__ . '/../../src/services/file/fileService.php';
require_once __DIR__ . '/../../src/db/Database.php';

checkRequestType('GET');
$user = canUserAccess('izvrsilac');

if (empty($_GET['id'])) {
    badRequest('Id missing!');
}
$id = htmlspecialchars(trim($_GET['id']));

$db = Database::getConnection();
try {
    $query = "SELECT t.title,
                   t.priority,
                   t.description,
                   t.dueDate, 
                   t.status, 
                   u.firstName,
                   u.id as managerId, 
                   tG.id as taskGroupId,
                   tG.name as taskName 
            FROM task t
             INNER JOIN taskGroup tG on t.taskGroupId = tG.id
             INNER JOIN user u on t.managerId = u.id
             WHERE t.id=?";

    $statement = $db->prepare($query);
    if (!$statement->execute([$id])) {
        badRequest('Can not get task with id ' . $id);
    }
    $task = $statement->fetch(PDO::FETCH_ASSOC);
    if (!$task) {
        badRequest('Task with id ' . $id . ' not found.');
    }

    $query = "SELECT u.id as userId, u.firstName 
            FROM selectedTask st
             INNER JOIN user u on st.userId = u.id
             WHERE st.taskId=?";
    $statement = $db->prepare($query);
    if (!$statement->execute([$id])) {
        badRequest('Can not get executors for task with id ' . $id);
    }
    $executors = $statement->fetchAll(PDO::FETCH_ASSOC);
    if (!$executors) {
        $executors = [];
    }
    $task['executors'] = $executors;
    sendResponse(['task' => $task]);
} catch (Exception $e) {
    badRequest('Could not found tasks!');
}
