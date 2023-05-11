<?php

require_once __DIR__ . '/../src/services/user/authService.php';

checkRequestType();
if (true !== ($result = logoutUser())) {
    unauthorized($result);
};

sendResponse(['message' => 'User logged out successfully']);

