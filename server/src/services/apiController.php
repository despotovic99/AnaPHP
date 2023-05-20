<?php

function getDataFromPostRequest(string $dataKey, bool $mandatory = true): string|array
{
    $data = !empty($_POST[$dataKey]) ? $_POST[$dataKey] : '';
    if (!$data && $mandatory) {
        badRequest('Parameter ' . $dataKey . ' missing!');
    }
    if (is_string($data)) {
        return htmlspecialchars(trim($data), ENT_QUOTES);
    }

    if (is_array($data)) {
        for ($i = 0; $i < count($data); $i++) {
            $data[$i] = htmlspecialchars(trim($data[$i]), ENT_QUOTES);
        }
    } else {
        badRequest('Invalid input for ' . $dataKey);
    }
    return $data;
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
    die;
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
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE');
    header(
        "Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type,Content-Length, Accept, Access-Token"
    );
    header('Access-Control-Allow-Credentials: true');
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        header('HTTP/1.1 200 OK');
        exit;
    }
    if ($_SERVER['REQUEST_METHOD'] !== $type) {
        badRequest('No route found!');
    }
}
