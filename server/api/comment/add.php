<?php

require_once __DIR__ . '/../../src/services/apiController.php';
require_once __DIR__ . '/../../src/services/user/authService.php';
require_once __DIR__ . '/../../src/db/Database.php';

checkRequestType();
$user = canUserAccess('izvrsilac');

$db = Database::getConnection();
$taskId = getDataFromPostRequest('taskId');
$content = getDataFromPostRequest('content');

if (!in_array(strtolower($user['userRole']), ['admin', 'rukovodilac'])) {
    $statement = $db->prepare("SELECT * FROM selectedTask WHERE taskId=? AND userId=?");
    if (
        !$statement->execute([$taskId, $user['id']]) ||
        !($tasks = $statement->fetchAll())
    ) {
        unauthorized('Current user can\'t comment on this task');
    }
}

try {
    $db->beginTransaction();
    $statement = $db->prepare("INSERT INTO comment (content, userId, taskId) VALUES (?,?,?)");
    $statement->execute([$content, $user['id'], $taskId]);
    $db->commit();
} catch (\Throwable $e) {
    $db->rollBack();
    badRequest('Comment not added');
}
sendResponse(['message' => 'Comment added successfully']);