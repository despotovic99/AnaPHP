<?php

require_once __DIR__ . '/../src/services/user/authService.php';

checkRequestType();
if(empty($_SERVER['HTTP_ACCESS_TOKEN'])){
    badRequest('Token missing');
}
if (true !== ($result = logoutUser($_SERVER['HTTP_ACCESS_TOKEN']))) {
    unauthorized($result);
};

sendResponse(['message' => 'User logged out successfully']);

