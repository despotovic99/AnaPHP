<?php

require_once __DIR__ . '/../../src/services/apiController.php';
require_once __DIR__ . '/../../src/services/user/authService.php';
require_once __DIR__ . '/../../src/db/Database.php';

checkRequestType();
$user = canUserAccess('izvrsilac');

$taskId = getDataFromPostRequest('taskId');
$completed = getDataFromPostRequest('completed');
if ($completed != 0 && $completed != 1) {
    badRequest('Completed value must be 0 or 1');
}

$db = Database::getConnection();
try {
    $db->beginTransaction();

    $statement = $db->prepare(
        "UPDATE selectedTask SET completed=? WHERE taskId=? AND userId=?"
    );
    if (!$statement->execute([$completed, $taskId, $user['id']])) {
        throw new Exception();
    }


    $db->commit();
} catch (Exception $exception) {
    $db->rollBack();
    badRequest('Task not completed successfully');
}
sendResponse(['message' => 'Task completed successfully']);

