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

function checkRequestType(string $type = 'POST')
{
    if ($_SERVER['REQUEST_METHOD'] !== $type) {
        sendResponse(['message' => 'Bad request!', 'error' => 'No route found!'], 400, false);
    }
}