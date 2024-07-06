<?php

require_once __DIR__ . '/../config/Config.php';
use src\config\Config;

class Database
{

    static ?PDO $connection = null;

    /**
     * @throws Exception
     */
    public static function getConnection(): PDO
    {
        if (self::$connection == null) {
            self::$connection = new PDO(
                'mysql:dbname=' . Config::DATABASE . ';host=' . Config::HOST,
                Config::USER,
                Config::PASSWORD
            );
            if (self::$connection->errorCode()) {
                throw new Exception('Could not connect to database');
            }
        }
        return self::$connection;
    }
}