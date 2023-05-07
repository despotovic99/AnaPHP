<?php

require_once __DIR__ . '/../src/services/util.php';
require_once __DIR__ . '/../src/services/registrationService.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    response('Bad request!', 400, false, 'No route found!');
}

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

    response('User registered successfully, check your email.');
} catch (Exception $exception) {
    response('Bad request', 400, false, $exception->getMessage());
}