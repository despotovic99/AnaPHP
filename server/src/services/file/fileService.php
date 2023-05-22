<?php

require_once __DIR__ . '/../../exception/TaskFilesException.php';

/**
 * @throws TaskFilesException
 */
function storeTaskFiles(string $taskFolder, array $files): void
{
    $targetDir = __DIR__ . '/../../../uploads/' . $taskFolder;
    if (
        !is_dir($targetDir) &&
        !mkdir($targetDir, 0777, true)
    ) {
        throw new TaskFilesException('Could not create folder for storing files');
    }

    $filesCount = count($files['name']);
    for ($i = 0; $i < $filesCount; $i++) {

        $fileFullPath = realpath($targetDir) . '/' . basename($files['name'][$i]);
        if (false === move_uploaded_file($files['tmp_name'][$i], $fileFullPath)) {
            throw new TaskFilesException('Task file not stored successfully');
        }
    }
}

function deleteFolder($folderPath): void
{
    if (!is_dir($folderPath)) {
        return;
    }

    $files = glob($folderPath . '/*');
    foreach ($files as $file) {
        if (is_dir($file)) {
            deleteFolder($file);
        } else {
            unlink($file);
        }
    }

    rmdir($folderPath);
}

function deleteFile(string $filePath)
{
    if (!is_file($filePath) || !file_exists($filePath)) {
        return;
    }
    unlink($filePath);
}
