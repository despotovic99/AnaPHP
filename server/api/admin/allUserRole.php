<?php

require_once __DIR__ . '/../../src/services/apiController.php';
require_once __DIR__ . '/../../src/services/user/authService.php';
require_once __DIR__ . '/../../src/db/Database.php';

checkRequestType('GET');
canUserAccess('Admin');

$db = Database::getConnection();
try {
    $roles = [];
    $result = $db->query("SELECT * FROM userRole");
    if ($result) {
        $roles = $result->fetchAll(PDO::FETCH_ASSOC);
    }

    sendResponse(['roles' => $roles]);
} catch (Exception $exception) {
    badRequest('Error occurred while getting all user roles.');
}