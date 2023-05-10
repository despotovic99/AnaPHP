<?php

session_start();

require_once __DIR__ . '/../src/services/util.php';
require_once __DIR__ . '/../src/db/Database.php';

checkRequestType();

try {
    $username = getDataFromPostRequest('username');
    $password = getDataFromPostRequest('password');

    $db = Database::getConnection();
    $statement = $db->prepare(
        'SELECT user.*, uR.name as role FROM user 
            INNER JOIN userRole uR on user.userRoleId = uR.id
            WHERE username=:username AND password=:password;'
    );
    $statement->bindParam('username', $username);
    $password = hash('md5', $password);
    $statement->bindParam('password', $password);

    $success = $statement->execute();
    if (!$success || !($user = $statement->fetch(PDO::FETCH_ASSOC))) {
        sendResponse(['message' => 'Bad request', 'error' => 'User not found!', 400, false]);
    }

    if ($user['verifiedAt'] == null) {
        sendResponse(['message' => 'Bad request', 'error' => 'User not verified!', 400, false]);
    }

    $token = hash('md5', $user['email'] . rand() . (new DateTime())->format('Y-m-d'));
    $_SESSION[$token] = ['username' => $user['username'], 'role' => $user['role']];

    sendResponse(['token' => $token, 'message' => 'User successfully logged in']);
} catch (Exception $e) {
    sendResponse(['message' => 'Server error'], 500, false);
}
