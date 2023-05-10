<?php

require_once __DIR__ . '/../src/services/util.php';
require_once __DIR__ . '/../src/services/user/userService.php';
require_once __DIR__ . '/../src/db/Database.php';

checkRequestType();

try {
    $username = getDataFromPostRequest('username');
    $email = getDataFromPostRequest('email');
    $password = getDataFromPostRequest('password');
    $confirmedPassword = getDataFromPostRequest('confirmedPassword');
    $firstName = getDataFromPostRequest('firstName');
    $lastName = getDataFromPostRequest('lastName');
    $phoneNumber = getDataFromPostRequest('phoneNumber', false);
    $dateOfBirth = getDataFromPostRequest('dateOfBirth', false);


    if ($password != $confirmedPassword) {
        sendResponse(['message' => 'Bad Request', 'error' => 'Passwords does not match!', 400, false]);
    }

    $result = registerUser(
        $username,
        $email,
        $password,
        $firstName,
        $lastName,
        $phoneNumber,
        $dateOfBirth
    );

    if (true !== $result) {
        sendResponse(['message' => 'Bad request', 'error' => $result], 400, false);
    }

    sendResponse(['message' => 'User registered successfully, check your email.']);
} catch (Exception $exception) {
    sendResponse(['message' => 'Server error'], 500, false);
}