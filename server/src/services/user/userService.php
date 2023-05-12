<?php

require_once __DIR__ . '/../db/Database.php';
require_once __DIR__ . '/mail/mailService.php';

function registerUser(
    string $username,
    string $email,
    string $password,
    string $firstName,
    string $lastName,
    string $phoneNumber,
    string $dateOfBirth,
    string $userRole = 'Izvrsilac',
    bool $sendActivationMail = true
): bool|string {
    $db = Database::getConnection();

    $password = hash('md5', $password);

    if (false !== ($result = usernameAndEmailAlreadyTaken($username, $email))) {
        return $result;
    }

    if (!userRoleExist($userRole)) {
        return $userRole . ' role does not exist!';
    }

    $birthday = null;
    if (!empty($dateOfBirth)) {
        $birthday = (new DateTime($dateOfBirth))->format('Y-m-d');
    }

    if (empty($phoneNumber)) {
        $phoneNumber = null;
    }

    try {
        $db->beginTransaction();

        $query = "INSERT INTO user (username,password,firstName,lastName,phone,email,birthday,userRoleId)
                    VALUES (:username,:password,:firstName,:lastName,:phone,:email,:birthday,:userRoleId)";

        $statement = $db->prepare($query);
        $statement->bindParam('username', $username);
        $statement->bindParam('password', $password);
        $statement->bindParam('firstName', $firstName);
        $statement->bindParam('lastName', $lastName);
        $statement->bindParam('phone', $phoneNumber);
        $statement->bindParam('email', $email);
        $statement->bindParam('birthday', $birthday);
        $statement->bindParam('userRoleId', $role['id']);

        $statement->execute();

        if ($sendActivationMail) {
            $query = "INSERT INTO pendingEmail (email,token)
                    VALUES (:email,:token)";
            $statement = $db->prepare($query);

            $token = hash('md5', $email . rand());
            $statement->bindParam('email', $email);
            $statement->bindParam('token', $token);

            $statement->execute();

            sendActivationLinkOnEmail($email, $token);
        }

        $db->commit();
    } catch (Exception $e) {
        $db->rollBack();
        return 'Error occurred, user not registered.';
    }

    return true;
}

function usernameAndEmailAlreadyTaken(string $username, string $email): string|false
{
    $db = Database::getConnection();
    $query = "SELECT * FROM user WHERE username LIKE '$username';";
    $result = $db->query($query);
    if (!empty($result->fetchAll())) {
        return 'Username is already taken.';
    }

    $query = "SELECT * FROM user WHERE email LIKE '$email';";
    $result = $db->query($query);
    if (!empty($result->fetchAll())) {
        return 'Email is already taken.';
    }

    return false;
}

function userRoleExist(string $role)
{
    $db = Database::getConnection();
    $query = "SELECT * FROM userRole WHERE name='$role'";
    $result = $db->query($query);

    return $result->fetch(PDO::FETCH_ASSOC);
}

function sendActivationLinkOnEmail(string $email, string $token)
{
    sendEmail(
        $email,
        'Aktivacija naloga',
        'Aktivirajte Vas nalog klikom na link: http://localhost/api/activateAccount.php?token=' . $token
    );
}