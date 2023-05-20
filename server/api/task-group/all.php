<?php

require_once __DIR__ . '/../../src/services/apiController.php';
require_once __DIR__ . '/../../src/services/user/authService.php';
require_once __DIR__ . '/../../src/db/Database.php';

checkRequestType('GET');
canUserAccess('Rukovodilac');

try {
    $db = Database::getConnection();

    $taskGroups = [];
    $result = $db->query("SELECT * FROM taskGroup");
    if (!$result) {
        sendResponse(['data' => $taskGroups]);
    }
    $taskGroups = $result->fetchAll(PDO::FETCH_ASSOC);

    sendResponse(['data' => $taskGroups]);
} catch (Exception $exception) {
    badRequest('Can not load all task groups.');
}