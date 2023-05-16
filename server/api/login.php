<?php

require_once __DIR__ . '/../src/services/apiController.php';
require_once __DIR__ . '/../src/db/Database.php';

checkRequestType();

try {
    $username = getDataFromPostRequest('username');
    $password = getDataFromPostRequest('password');

    $db = Database::getConnection();
    $statement = $db->prepare(
        'SELECT * FROM user 
            WHERE username=:username AND password=:password;'
    );
    $statement->bindParam('username', $username);
    $password = hash('md5', $password);
    $statement->bindParam('password', $password);

    $success = $statement->execute();
    if (!$success || !($user = $statement->fetch(PDO::FETCH_ASSOC))) {
        badRequest('User not found!');
    }

    if ($user['verifiedAt'] == null) {
        sendResponse(['message' => 'Bad request', 'error' => 'User not verified!'], 400, false);
    }

    $result = $db->query("SELECT * FROM accessToken WHERE userId='{$user['id']}'");
    $accessToken = $result->fetch(PDO::FETCH_ASSOC);
    if ($accessToken) {
        sendResponse(['token' => $accessToken['token'], 'message' => 'User already logged in']);
    }

    $token = hash('md5', $user['email'] . rand() . (new DateTime())->format('Y-m-d'));
    $result = $db->query("INSERT INTO accessToken (token,userId) VALUES ('$token','{$user['id']}')");
    if (!$result) {
        badRequest('User not logged in.');
    }

    sendResponse(['token' => $token, 'message' => 'User successfully logged in']);
} catch (Exception $e) {
    sendResponse(['message' => 'Server error'], 500, false);
}
