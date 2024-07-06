<?php

require_once __DIR__ . '/../src/services/apiController.php';
require_once __DIR__ . '/../src/services/user/userService.php';
require_once __DIR__ . '/../src/db/Database.php';

checkRequestType();

$email = getDataFromPostRequest('email');

$db = Database::getConnection();

$statement = $db->prepare('SELECT * FROM pendingEmail WHERE email=:email');
$statement->bindParam('email', $email);
$statement->execute();
$result = $statement->fetch(PDO::FETCH_ASSOC);

$expiresAt = (new DateTime())->modify('+30 minutes')->format('Y-m-d H:i:s');
$token = hash('md5', rand());
try {
    $db->beginTransaction();
    if ($result) {
        if (empty($result['expiresAt'])) {
            badRequest('Verify your account first!');
        }
        $db->query("UPDATE pendingEmail SET token='$token', expiresAt='$expiresAt' WHERE id={$result['id']}");
        $message = 'Link renewed, check your email.';
    } else {
        $message = 'Link sent, check your email.';
        $db->query("INSERT INTO pendingEmail  (email,token,expiresAt) VALUES ('$email','$token','$expiresAt')");
    }

    sendForgotPasswordLinkOnEmail($email, $token);
    $db->commit();
    sendResponse(['message' => $message]);
} catch (Exception $e) {
    $db->rollBack();
    badRequest('Link not generated.');
}
