<?php

session_start();

require_once __DIR__ . '/../util.php';

function canUserAccess(string $token, string $userRole): bool
{
    if (empty($_SESSION[$token])) {
        sendResponse(['message' => 'Unauthorized', 'error' => 'User is not logged.', 401, false]);
    }

    if ($userRole !== $_SESSION[$token]['role']) {
        sendResponse(['message' => 'Unauthorized', 'error' => 'User is not permitted to this operation.', 401, false]);
    }
    return true;
}