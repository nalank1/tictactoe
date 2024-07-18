<?php
require_once '_config.php';

session_start();

if (!isset($_SESSION['leaderboard'])) {
    $_SESSION['leaderboard'] = [];
}

if (!isset($_SESSION['board'])) {
    resetGame();
}

function resetGame() {
    $_SESSION['board'] = array_fill(0, 9, '');
    $_SESSION['turn'] = 'O';
}

function makeMove($index) {
    if ($_SESSION['board'][$index] === '' && !checkWinner($_SESSION['board'])) {
        $_SESSION['board'][$index] = $_SESSION['turn'];
        $_SESSION['turn'] = $_SESSION['turn'] === 'O' ? 'X' : 'O';
    }

    $winner = checkWinner($_SESSION['board']);
    if ($winner) {
        updateLeaderboard($winner);
    }
}

function checkWinner($board) {
    $winning_conditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    foreach ($winning_conditions as $condition) {
        if ($board[$condition[0]] !== '' &&
            $board[$condition[0]] === $board[$condition[1]] &&
            $board[$condition[1]] === $board[$condition[2]]) {
            return $board[$condition[0]];
        }
    }

    if (!in_array('', $board)) {
        return 'draw';
    }

    return null;
}

function updateLeaderboard($winner) {
    if ($winner !== 'draw') {
        $_SESSION['leaderboard'][] = $winner;
        $_SESSION['leaderboard'] = array_slice(array_count_values($_SESSION['leaderboard']), 0, 10, true);
    }
}

$action = $_GET['action'] ?? 'getState';
$data = json_decode(file_get_contents('php://input'), true);

$response = [];

switch ($action) {
    case 'move':
        makeMove($data['index']);
        $response = getState();
        break;
    case 'reset':
        resetGame();
        $response = getState();
        break;
    case 'getState':
        $response = getState();
        break;
    default:
        $response = ['error' => 'Invalid action'];
}

header('Content-Type: application/json');
echo json_encode($response);

function getState() {
    return [
        'board' => $_SESSION['board'],
        'turn' => $_SESSION['turn'],
        'leaderboard' => $_SESSION['leaderboard'],
        'winner' => checkWinner($_SESSION['board'])
    ];
}
?>
