<?php

/**
 * @throws TaskFilesException
 */
function storeTaskFiles(string $taskFolder, int $taskId, array $files, PDO $db): void
{
    $targetDir = __DIR__ . '/../../../uploads/' . $taskFolder;
    if (
        !is_dir($targetDir) &&
        !mkdir($targetDir)
    ) {
        throw new TaskFilesException('Could not create folder for storing files');
    }
    try {
        $query = "INSERT INTO file (name,fullPath,taskId) VALUES ";
        $filesCount = count($files['name']);
        for ($i = 0; $i < $filesCount; $i++) {
            $fileFullPath = realpath($targetDir) . '/' . basename($files['name'][$i]);
            if (false === move_uploaded_file($files['tmp_name'][$i], $fileFullPath)) {
                throw new Exception();
            }
            $query .= " ('{$files['name'][$i]}','$fileFullPath','$taskId'), ";
        }
        $query = rtrim($query, ', ');
        $db->query($query);
    } catch (Exception $e) {
        throw new TaskFilesException('Task file not stored successfully');
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