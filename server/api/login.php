<?php

require_once __DIR__ . '/../src/services/util.php';
require_once __DIR__ . '/../src/db/Database.php';

checkRequestType();

try {
    $username = getDataFromPostRequest('username');
    $password = getDataFromPostRequest('password');

    $db = Database::getConnection();
    $statement = $db->prepare('SELECT * FROM user WHERE username=:username AND password=:password;');
    $statement->bindParam('username', $username);
    $password = hash('md5', $password);
    $statement->bindParam('password', $password);

    $success = $statement->execute();
    if (!$success || !($user = $statement->fetch(PDO::FETCH_ASSOC))) {
        response(['message' => 'Bad request', 'error' => 'User not found!', 400, false]);
    }

    if ($user['verifiedAt'] == null) {
        response(['message' => 'Bad request', 'error' => 'User not verified!', 400, false]);
    }

    $token = hash('md5', $user['email'] . rand() . (new DateTime())->format('Y-m-d'));
    $result = $db->query("SELECT * FROM accessToken WHERE userId='{$user['id']}'");

    $accessToken = $result->fetch(PDO::FETCH_ASSOC);
    if ($accessToken) {
        $db->query("DELETE FROM accessToken WHERE userId='{$user['id']}'");
    }
    $db->query("INSERT INTO accessToken (token,userId) VALUES ('$token','{$user['id']}')");

    response(['token' => "Bearer $token", 'message' => 'User successfully logged in']);
} catch (Exception $e) {
    response(['message' => 'Server error'], 500, false);
}
