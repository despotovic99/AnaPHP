<?php

require_once __DIR__ . '/../../src/services/apiController.php';
require_once __DIR__ . '/../../src/services/user/authService.php';
require_once __DIR__ . '/../../src/db/Database.php';

checkRequestType();
if (true !== $result = canUserAccess('Rukovodilac')) {
    unauthorized($result);
}

$id = getDataFromPostRequest('id');

$db = Database::getConnection();
try {
    $db->query('DELETE FROM taskGroup WHERE id=\'' . $id . '\'');
} catch (Exception $exception) {
    badRequest('Task group not deleted.');
}

sendResponse(['message' => 'Task group deleted successfully']);

