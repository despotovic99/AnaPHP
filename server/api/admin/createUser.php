<?php

require_once __DIR__ . '/../../src/services/apiController.php';
require_once __DIR__ . '/../../src/services/user/authService.php';
require_once __DIR__ . '/../../src/services/user/userService.php';
require_once __DIR__ . '/../../src/db/Database.php';

checkRequestType();
canUserAccess('Admin');

$username = getDataFromPostRequest('username');
$email = getDataFromPostRequest('email');
$password = getDataFromPostRequest('password');
$confirmedPassword = getDataFromPostRequest('confirmedPassword');
$firstName = getDataFromPostRequest('firstName');
$lastName = getDataFromPostRequest('lastName');
$phoneNumber = getDataFromPostRequest('phone', false);
$dateOfBirth = getDataFromPostRequest('birthday', false);
$roleId = intval(getDataFromPostRequest('roleId'));

if (!$roleId) {
    badRequest('Invalid role provided.');
}

if ($password != $confirmedPassword) {
    badRequest('Passwords does not match!');
}

$result = registerUser(
    $username,
    $email,
    $password,
    $firstName,
    $lastName,
    $phoneNumber,
    $dateOfBirth,
    $roleId,
    false
);

if (true !== $result) {
    badRequest($result);
}

sendResponse(['message' => 'User account created successfully']);
