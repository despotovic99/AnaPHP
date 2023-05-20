<?php

require_once __DIR__ . '/../../src/services/apiController.php';
require_once __DIR__ . '/../../src/services/user/authService.php';
require_once __DIR__ . '/../../src/services/user/userService.php';
require_once __DIR__ . '/../../src/db/Database.php';

checkRequestType();
canUserAccess('admin');

$id = getDataFromPostRequest('id');
$username = getDataFromPostRequest('username');
$email = getDataFromPostRequest('email');
$password = getDataFromPostRequest('password');
$confirmedPassword = getDataFromPostRequest('confirmedPassword');
$firstName = getDataFromPostRequest('firstName');
$lastName = getDataFromPostRequest('lastName');
$phoneNumber = getDataFromPostRequest('phoneNumber', false);
$dateOfBirth = getDataFromPostRequest('dateOfBirth', false);
$roleId = intval(getDataFromPostRequest('roleId'));

if (!$roleId) {
    badRequest('Invalid role provided.');
}

if ($password != $confirmedPassword) {
    badRequest('Passwords does not match!');
}

$result = updateUser(
    $id,
    $username,
    $email,
    $password,
    $firstName,
    $lastName,
    $phoneNumber,
    $dateOfBirth,
    $roleId
);
if (true !== $result) {
    badRequest($result);
}

sendResponse(['message' => 'User account updated successfully']);