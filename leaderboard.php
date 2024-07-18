<?php
session_start();

function resetGame() {
    $_SESSION['game'] = array_fill(0, 9, '');
}

function updateLeaderboard($winner) {
    if (!isset($_SESSION['leaderboard'][$winner])) {
        $_SESSION['leaderboard'][$winner] = 0;
    }
    $_SESSION['leaderboard'][$winner]++;
    arsort($_SESSION['leaderboard']);
    $_SESSION['leaderboard'] = array_slice($_SESSION['leaderboard'], 0, 10, true);
}

if (!isset($_SESSION['game'])) {
    resetGame();
}

if (!isset($_SESSION['leaderboard'])) {
    $_SESSION['leaderboard'] = [];
}

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'move':
        $data = json_decode(file_get_contents("php://input"), true);
        $index = $data['index'];
        $player = $data['player'];

        $_SESSION['game'][$index] = $player;

        echo json_encode(['message' => 'Move recorded']);
        break;

    case 'reset':
        resetGame();
        echo json_encode(['message' => 'Game reset']);
        break;

    case 'updateLeaderboard':
        $data = json_decode(file_get_contents("php://input"), true);
        $winner = $data['winner'];

        updateLeaderboard($winner);
        echo json_encode(['leaderboard' => $_SESSION['leaderboard']]);
        break;

    case 'getLeaderboard':
        echo json_encode(['leaderboard' => $_SESSION['leaderboard']]);
        break;

    default:
        echo json_encode(['message' => 'Invalid action']);
        break;
}
?>
