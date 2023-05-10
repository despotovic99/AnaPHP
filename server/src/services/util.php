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

function response(string $message, int $status = 200, bool $success = true, string $error = ''): void
{
    $response = [
        'success' => $success,
        'message' => $message,
        'code' => $status
    ];

    if (!empty($error)) {
        $response['error'] = $error;
    }

    echo json_encode($response);
    die();
}