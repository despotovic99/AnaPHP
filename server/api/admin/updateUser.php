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
$firstName = getDataFromPostRequest('firstName');
$lastName = getDataFromPostRequest('lastName');
$phoneNumber = getDataFromPostRequest('phone', false);
$dateOfBirth = getDataFromPostRequest('birthday', false);
$roleId = intval(getDataFromPostRequest('roleId'));

if (!$roleId) {
    badRequest('Invalid role provided.');
}


$result = updateUser(
    $id,
    $username,
    $email,
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
