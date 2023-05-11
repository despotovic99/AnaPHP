<?php

/**
 * @throws Exception
 */
function getDataFromPostRequest(string $dataKey, bool $mandatory = true): string
{
    $data = !empty($_POST[$dataKey]) ? $_POST[$dataKey] : '';
    if (!$data && $mandatory) {
        throw new Exception('Parameter ' . $dataKey . ' missing!');
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

    if (!empty($error)) {
        $response['error'] = $error;
    }

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
    if ($_SERVER['REQUEST_METHOD'] !== $type) {
        sendResponse(['message' => 'Bad request!', 'error' => 'No route found!'], 400, false);
    }
}