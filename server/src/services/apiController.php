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
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE');
    header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type,Content-Length, Accept");
    header('Access-Control-Allow-Credentials: true');
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
        header('HTTP/1.1 200 OK');
    }
    if ($_SERVER['REQUEST_METHOD'] !== $type) {
        badRequest('No route found!');
    }
}
