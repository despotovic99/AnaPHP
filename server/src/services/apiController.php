<?php

function getDataFromPostRequest(string $dataKey, bool $mandatory = true): string
{
    $data = !empty($_POST[$dataKey]) ? $_POST[$dataKey] : '';
    if (!$data && $mandatory) {
        badRequest('Parameter ' . $dataKey . ' missing!');
    }
    return htmlspecialchars(trim($data));
}

function sendResponse(array $data, int $status = 200, bool $success = true): void
{
    if ($status != 200) {
        header("HTTP/1.1 $status {$data['message']}");
    }

    $response = [
        'success' => $success,
        'data' => $data,
        'code' => $status
    ];

    echo json_encode($response);
    die();
}

function badRequest(string $error)
{
    sendResponse(['message' => 'Bad Request', 'error' => $error], 400, false);
}

function unauthorized(string $error)
{
    sendResponse(['message' => 'Unauthorized', 'error' => $error], 401, false);
}

function checkRequestType(string $type = 'POST')
{
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        header('Access-Control-Allow-Origin: http://localhost:3000');
        header('Access-Control-Allow-Methods: POST');
        header(
            'Access-Control-Allow-Headers: Content-Type, 
                    Access-Control-Allow-Origin,
                    Authorization,
                    Access-Control-Allow-Methods'
        );
        header('Access-Control-Max-Age: 86400'); // 24 hours
        header('Access-Control-Allow-Credentials: true'); // 24 hours
        header('HTTP/1.1 200 OK');
        exit;
    }
    if ($_SERVER['REQUEST_METHOD'] !== $type) {
        badRequest('No route found!');
    }
}