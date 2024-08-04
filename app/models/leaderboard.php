<?php
// leaderboard.php
session_start();
include 'db.php';

function resetGame() {
    $_SESSION['game'] = array_fill(0, 9, '');
}

function updateLeaderboard($winner) {
    global $pdo;

    // Fetch user
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$winner]);
    $user = $stmt->fetch();

    if ($user) {
        $stmt = $pdo->prepare("INSERT INTO leaderboard (username, wins) VALUES (?, 1)
                              ON CONFLICT (username) DO UPDATE SET wins = leaderboard.wins + 1");
        $stmt->execute([$winner]);
    }
}

if (!isset($_SESSION['game'])) {
    resetGame();
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
        echo json_encode(['leaderboard' => getLeaderboard()]);
        break;

    case 'getLeaderboard':
        echo json_encode(['leaderboard' => getLeaderboard()]);
        break;

    default:
        echo json_encode(['message' => 'Invalid action']);
        break;
}

function getLeaderboard() {
    global $pdo;

    $stmt = $pdo->query("SELECT * FROM leaderboard ORDER BY wins DESC LIMIT 10");
    return $stmt->fetchAll();
}
?>
