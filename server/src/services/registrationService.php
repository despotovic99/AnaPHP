<?php

require_once __DIR__ . '/../db/Database.php';
require_once __DIR__ . '/mail/mailService.php';

/**
 * @throws Exception
 */
function registerUser(
    string $username,
    string $email,
    string $password,
    string $confirmedPassword,
    string $firstName,
    string $lastName,
    string $phoneNumber,
    string $dateOfBirth
) {
    $db = Database::getConnection();

    if ($password != $confirmedPassword) {
        throw new Exception('Passwords does not match!');
    }
    $password = hash('md5', $password);

    $query = "SELECT * FROM user WHERE username LIKE '$username';";
    $result = $db->query($query);
    if (!empty($result->fetchAll())) {
        throw new Exception('Username is already taken.');
    }

    $query = "SELECT * FROM user WHERE email LIKE '$email';";
    $result = $db->query($query);
    if (!empty($result->fetchAll())) {
        throw new Exception('Email is already taken.');
    }

    $query = "SELECT * FROM userRole WHERE name='Izvrsilac'";
    $result = $db->query($query);

    $role = $result->fetch(PDO::FETCH_ASSOC);
    if (!$role) {
        throw new Exception('Izvrsilac role does not exist!');
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

        $query = "INSERT INTO pendingEmail (email,token)
                    VALUES (:email,:token)";
        $statement = $db->prepare($query);

        $token = hash('md5', $email . rand());
        $statement->bindParam('email', $email);
        $statement->bindParam('token', $token);

        $statement->execute();

        sendEmail(
            $email,
            'Aktivacija naloga',
            'Aktivirajte Vas nalog klikom na link: http://localhost/api/activateAccount.php?token=' . $token
        );

        $db->commit();
    } catch (Exception $e) {
        $db->rollBack();
        throw new Exception('User not registered.');
    }
}


function activateAccount(string $token): void
{
    $db = Database::getConnection();
    $db->beginTransaction();

    try {
        $query = "SELECT * FROM pendingEmail WHERE token=:token";
        $statement = $db->prepare($query);
        $statement->bindParam('token', $token);
        $statement->execute();

        $result = $statement->fetch(PDO::FETCH_ASSOC);
        if (!$result) {
            throw new Exception('Email not found.');
        }
        $email = $result['email'];

        $now = (new DateTime('now'))->format('Y-m-d H:i:s');
        $query = "UPDATE user SET verifiedAt='$now' WHERE email='$email'";
        $db->query($query);
        $query = "DELETE FROM pendingEmail WHERE email='$email'";
        $db->query($query);

        $db->commit();
    } catch (Throwable $e) {
        $db->rollBack();
        throw new Exception('Account not activated');
    }
}

function generateActivationLink(string $username): void
{
    $db = Database::getConnection();

    $statement = $db->prepare("SELECT email, verifiedAt FROM user WHERE username=:username");
    $statement->bindParam('username', $username);
    $statement->execute();
    $result = $statement->fetch(PDO::FETCH_ASSOC);
    if (!$result || $result['verifiedAt']) {
        throw new Exception('Account already activated.');
    }

    try {
        $db->beginTransaction();
        $email = $result['email'];

        $query = "SELECT * FROM pendingEmail WHERE email=:email AND expiresAt IS NULL";
        $statement = $db->prepare($query);
        $statement->bindParam('email', $email);
        $statement->execute();

        $token = hash('md5', $email . rand());
        $result = $statement->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            $query = "UPDATE pendingEmail SET token='$token' WHERE id='{$result['id']}'";
            $db->query($query);
        } else {
            $query = "INSERT INTO pendingEmail (email,token)
                    VALUES (:email,:token)";
            $statement = $db->prepare($query);

            $statement->bindParam('email', $email);
            $statement->bindParam('token', $token);

            $statement->execute();
        }


        sendEmail(
            $email,
            'Aktivacija naloga',
            'Aktivirajte Vas nalog klikom na link: http://localhost/api/activateAccount.php?token=' . $token
        );

        $db->commit();
    } catch (Throwable $e) {
        $db->rollBack();
        throw new Exception('Activation link not generated');
    }
}