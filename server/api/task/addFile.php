<?php

require_once __DIR__ . '/../../src/services/apiController.php';
require_once __DIR__ . '/../../src/services/user/authService.php';
require_once __DIR__ . '/../../src/services/file/fileService.php';
require_once __DIR__ . '/../../src/db/Database.php';

checkRequestType();
$user = canUserAccess('Rukovodilac');

$id = getDataFromPostRequest('id');
$folderName = 'task-' . $id;

try {
    storeTaskFiles($folderName, $_FILES['files']);
} catch (Exception $exception) {
    foreach ($_FILES['files']['name'] as $fileName) {
        deleteFile(__DIR__ . "/../../uploads/$folderName/$fileName");
    }
    $message = 'Error occurred, file not saved';
    if ($exception instanceof TaskFilesException) {
        $message .= ' ' . $exception->getMessage();
    }
    badRequest($message);
}
sendResponse(['message' => 'File added successfully']);

