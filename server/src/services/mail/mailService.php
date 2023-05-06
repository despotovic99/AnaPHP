<?php

require_once __DIR__.'/mailer.php';

function sendEmail(string $email, string $subject, string $body): void
{
    $mailer = getMailer();

    $mailer->addAddress($email);
    $mailer->Subject = $subject;
    $mailer->Body = $body;

    $mailer->send();
}