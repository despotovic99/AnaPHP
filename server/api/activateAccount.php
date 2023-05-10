<?php

require_once __DIR__ . '/../src/services/util.php';
require_once __DIR__ . '/../src/db/Database.php';

checkRequestType('GET');

if (empty($_GET['token'])) {
    response(['message' => 'Bad request', 'error' => 'Token missing.'], 400, false);
}

$token = htmlspecialchars(trim($_GET['token']));
$db = Database::getConnection();
try {
    $db->beginTransaction();
    $query = "SELECT * FROM pendingEmail WHERE token=:token";
    $statement = $db->prepare($query);
    $statement->bindParam('token', $token);
    $statement->execute();

    $result = $statement->fetch(PDO::FETCH_ASSOC);
    if (!$result) {
        response(['message' => 'Bad request', 'error' => 'Email not found.'], 500, false);
    }
    $email = $result['email'];

    $now = (new DateTime('now'))->format('Y-m-d H:i:s');
    $query = "UPDATE user SET verifiedAt='$now' WHERE email='$email'";
    $db->query($query);
    $query = "DELETE FROM pendingEmail WHERE email='$email'";
    $db->query($query);

    $db->commit();

    response(['message' => 'Account activated']);
} catch (Exception $e) {
    response(['message' => 'Server error'], 500, false);
}
