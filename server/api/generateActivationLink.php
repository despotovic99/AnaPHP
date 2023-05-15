<?php

require_once __DIR__ . '/../src/db/Database.php';
require_once __DIR__ . '/../src/services/apiController.php';
require_once __DIR__ . '/../src/services/user/userService.php';

checkRequestType();

$db = Database::getConnection();
try {
    $username = getDataFromPostRequest('username');

    $statement = $db->prepare("SELECT email, verifiedAt FROM user WHERE username=:username");
    $statement->bindParam('username', $username);
    $statement->execute();
    $result = $statement->fetch(PDO::FETCH_ASSOC);
    if (!$result || $result['verifiedAt']) {
        badRequest('Account already activated.');
    }

    $db->beginTransaction();
    $email = $result['email'];

    $query = "SELECT * FROM pendingEmail WHERE email=:email AND expiresAt IS NULL";
    $statement = $db->prepare($query);
    $statement->bindParam('email', $email);
    $statement->execute();

    $token = hash('md5', $email . rand());
    $result = $statement->fetch(PDO::FETCH_ASSOC);
    if ($result) {
        $query = "UPDATE pendingEmail SET token='$token' WHERE id='{$result['id']}'";
        $db->query($query);
    } else {
        $query = "INSERT INTO pendingEmail (email,token)
                    VALUES (:email,:token)";
        $statement = $db->prepare($query);

        $statement->bindParam('email', $email);
        $statement->bindParam('token', $token);

        $statement->execute();
    }

    sendActivationLinkOnEmail($email, $token);

    $db->commit();
    sendResponse(['message' => 'Activation link generated, check your email.']);
} catch (Exception $e) {
    $db->rollBack();
    sendResponse(['message' => 'Server error'], 500, false);
}