<?php

require_once __DIR__ . '/../src/services/apiController.php';
require_once __DIR__ . '/../src/services/user/userService.php';
require_once __DIR__ . '/../src/db/Database.php';

checkRequestType('GET');
if (empty($_GET['token'])) {
    badRequest('Token is missing!');
}

$token = htmlspecialchars($_GET['token']);
//todo implementacija strane za unos passworda