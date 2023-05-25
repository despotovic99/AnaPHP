<?php

require_once __DIR__ . '/../../src/services/apiController.php';
require_once __DIR__ . '/../../src/services/user/authService.php';
require_once __DIR__ . '/../../src/db/Database.php';

checkRequestType();
$user = canUserAccess('izvrsilac');

$db = Database::getConnection();
$id = getDataFromPostRequest('id');

if (!in_array(strtolower($user['userRole']), ['admin', 'rukovodilac'])) {
    $statement = $db->prepare("SELECT * FROM comment WHERE id=? AND userId=?");
    if (
        !$statement->execute([$id, $user['id']]) ||
        !($tasks = $statement->fetchAll())
    ) {
        unauthorized('Current user can\'t delete this comment');
    }
}

try {
    $db->beginTransaction();
    $statement = $db->prepare("DELETE FROM comment WHERE id='$id'");
    $statement->execute([$id]);
    $db->commit();
} catch (\Throwable $e) {
    $db->rollBack();
    badRequest('Comment not deleted');
}
sendResponse(['message' => 'Comment deleted successfully']);
