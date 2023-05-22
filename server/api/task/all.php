<?php

require_once __DIR__ . '/../../src/services/apiController.php';
require_once __DIR__ . '/../../src/services/user/authService.php';
require_once __DIR__ . '/../../src/services/file/fileService.php';
require_once __DIR__ . '/../../src/db/Database.php';

checkRequestType('GET');
$user = canUserAccess('izvrsilac');

$dateFrom = !empty($_GET['from']) ? htmlspecialchars($_GET['from']) : '';
$dateTo = !empty($_GET['to']) ? htmlspecialchars($_GET['to']) : '';
$priority = !empty($_GET['priority']) ? htmlspecialchars($_GET['priority']) : '';
$executors = !empty($_GET['executors']) ? htmlspecialchars($_GET['executors']) : '';
$taskTitle = !empty($_GET['title']) ? htmlspecialchars($_GET['title']) : '';

$db = Database::getConnection();

try {
    $query = "SELECT t.id as id,
                 t.title as title,
                 t.description as description,
                 t.dueDate as dueDate,
                 t.priority as priority,
                 t.status as status,
                 tG.name as taskGroupName
    FROM task t  
        INNER JOIN taskGroup tG on t.taskGroupId = tG.id ";

    $where = null;
    $groupBy = null;
    if (($dateTo && $dateFrom) || $priority || $executors || $taskTitle) {
        $where = ' WHERE ';
    }

    if ($executors && strtolower($user['userRole']) != 'izvrsilac') {
        $query .= "
        INNER JOIN selectedTask st ON t.id = st.taskId
        INNER JOIN user u on st.userId = u.id ";
        $where .= " u.firstName LIKE '%$executors%' AND ";
        $groupBy = " GROUP BY id ";
    }

    if (strtolower($user['userRole']) == 'izvrsilac') {
        $query .= "
        INNER JOIN selectedTask st ON t.id = st.taskId
        INNER JOIN user u on st.userId = u.id ";
        $where .= " userId='{$user['userId']}' AND ";
    }

    if ($taskTitle) {
        $where .= " title LIKE '%$taskTitle%' AND ";
    }

    if ($priority) {
        $where .= " priority='$priority' AND ";
    }

    if ($dateFrom && $dateTo) {
        $where .= " dueDate BETWEEN '$dateFrom' AND '$dateTo' ";
    }

    if ($where) {
        $where = rtrim($where, 'AND ');
        $query .= $where;
        if ($groupBy) {
            $query .= $groupBy;
        }
    }

    $result = $db->query($query);
    $tasks = $result->fetchAll(PDO::FETCH_ASSOC);
    sendResponse(['tasks' => $tasks]);
} catch (Exception $e) {
    badRequest('Could not found tasks!');
}
