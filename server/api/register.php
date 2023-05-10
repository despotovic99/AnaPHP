<?php

require_once __DIR__ . '/../src/services/util.php';
require_once __DIR__ . '/../src/services/registrationService.php';

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

    registerUser(
        $username,
        $email,
        $password,
        $confirmedPassword,
        $firstName,
        $lastName,
        $phoneNumber,
        $dateOfBirth
    );

    response(['message' => 'User registered successfully, check your email.']);
} catch (Exception $exception) {
    response(['message' => 'Bad request', 'error' => $exception->getMessage()], 400, false);
}