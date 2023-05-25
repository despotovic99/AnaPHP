<?php

require_once __DIR__ . '/../../src/services/apiController.php';
require_once __DIR__ . '/../../src/services/user/authService.php';
require_once __DIR__ . '/../../src/services/file/fileService.php';
require_once __DIR__ . '/../../src/db/Database.php';

checkRequestType('GET');
//$user = canUserAccess('izvrsilac');

$id = htmlspecialchars($_GET['id']);
$fileName = htmlspecialchars($_GET['fileName']);

$folderName = 'task-' . $id;
try {
    $filePath = __DIR__ . "/../../uploads/$folderName/$fileName";
    if (!file_exists($filePath)) {
        badRequest('File not exist');
    }
    header($_SERVER["SERVER_PROTOCOL"] . " 200 OK");
    header("Cache-Control: public");
    header("Content-Transfer-Encoding: Binary");
    header("Content-Length:" . filesize($filePath));
    header("Content-Disposition: attachment; filename=$fileName");
    readfile($filePath);
    die($fileName);
} catch (Exception $exception) {
    badRequest('Error occurred, file not downloaded');
}
sendResponse(['message' => 'File added successfully']);

