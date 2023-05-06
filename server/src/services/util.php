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