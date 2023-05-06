<?php

require_once __DIR__ . '/../src/services/util.php';
require_once __DIR__ . '/../src/services/registrationService.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'success' => false,
        'message' => 'Bad request',
        'error' => 'No route found!',
        'code' => 400
    ]);
    die();
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


} catch (Exception $exception) {
    echo json_encode([
        'success' => false,
        'message' => 'Bad request',
        'error' => $exception->getMessage(),
        'code' => 400
    ]);
}