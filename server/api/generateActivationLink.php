<?php

require_once __DIR__ . '/../src/services/util.php';
require_once __DIR__ . '/../src/services/registrationService.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    response('Bad request', 400, false, 'Route not found.');
}

try {
    $username = getDataFromPostRequest('username');
    generateActivationLink($username);

    response('Activation link generated, check your email.');
} catch (Exception $e) {
    response('Bad request', 400, false, $e->getMessage());
}