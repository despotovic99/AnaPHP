<?php

require_once __DIR__ . '/../../src/services/apiController.php';
require_once __DIR__ . '/../../src/services/user/authService.php';
require_once __DIR__ . '/../../src/db/Database.php';

checkRequestType('GET');
$user = canUserAccess('izvrsilac');

if (empty('taskId')) {
    badRequest('TaskId missing');
}
$taskId = htmlspecialchars($_GET['taskId']);

$db = Database::getConnection();

$comments = [];
$statement = $db->prepare("SELECT * FROM comment WHERE taskId=?");
if (
    $statement->execute([$taskId]) &&
    ($result = $statement->fetchAll(PDO::FETCH_ASSOC))
) {
    $comments = $result;
}

sendResponse(['comments' => $comments]);

