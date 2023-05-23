<?php

require_once __DIR__ . '/../../src/services/apiController.php';
require_once __DIR__ . '/../../src/services/user/authService.php';
require_once __DIR__ . '/../../src/db/Database.php';

checkRequestType('GET');
canUserAccess('Rukovodilac');

if (empty($_GET['id'])) {
    badRequest('Id is missing!');
}
$id = htmlspecialchars($_GET['id']);

try {
    $db = Database::getConnection();

    $taskGroup = [];
    $statement = $db->prepare("SELECT * FROM taskGroup WHERE id=:id");
    $statement->bindParam('id', $id);
    $statement->execute();
    if (!($taskGroup = $statement->fetch(PDO::FETCH_ASSOC))) {
        badRequest('Can not get task group with provided id ' . $id);
    }

    sendResponse(['taskGroup' => $taskGroup]);
} catch (Exception $exception) {
    badRequest('Error occurred while getting task group with id ' . $id);
}