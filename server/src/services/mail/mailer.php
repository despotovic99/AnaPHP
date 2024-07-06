<?php

require_once __DIR__ . '/../../../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

function getMailer(): PHPMailer
{
    $mailer = new PHPMailer(true);

    $mailer->isSMTP();
    $mailer->SMTPAuth = true;

    $mailer->Host = 'smtp.gmail.com';
    $mailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mailer->Port = 587;

    $mailer->Username = '';
    $mailer->Password = '';

    $mailer->setFrom('', 'Task Management App');

    return $mailer;
}