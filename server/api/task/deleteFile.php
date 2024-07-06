<?php

require_once __DIR__ . '/../../src/services/apiController.php';
require_once __DIR__ . '/../../src/services/user/authService.php';
require_once __DIR__ . '/../../src/services/file/fileService.php';
require_once __DIR__ . '/../../src/db/Database.php';

checkRequestType();
$user = canUserAccess('Rukovodilac');

$id = getDataFromPostRequest('id');
$fileName = getDataFromPostRequest('fileName');
$folderName = 'task-' . $id;

try {
    deleteFile(__DIR__ . "/../../uploads/$folderName/$fileName");
} catch (Exception $exception) {
    badRequest('Error occurred, file not saved');
}
sendResponse(['message' => 'File deleted successfully']);

