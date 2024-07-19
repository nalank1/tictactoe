<?php
session_start();

class TicTacToe {
    public $board = [];
    public $currentPlayer = 'X';
    public $winner = null;

    public function __construct() {
        $this->board = array_fill(0, 9, null);
    }

    public function makeMove($position) {
        if ($this->board[$position] === null && $this->winner === null) {
            $this->board[$position] = $this->currentPlayer;
            if ($this->checkWinner()) {
                $this->winner = $this->currentPlayer;
            }
            $this->currentPlayer = $this->currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    public function reset() {
        $this->board = array_fill(0, 9, null);
        $this->currentPlayer = 'X';
        $this->winner = null;
    }

    private function checkWinner() {
        $winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        foreach ($winningCombinations as $combination) {
            if ($this->board[$combination[0]] !== null &&
                $this->board[$combination[0]] === $this->board[$combination[1]] &&
                $this->board[$combination[1]] === $this->board[$combination[2]]) {
                return true;
            }
        }
        return false;
    }
}

class Leaderboard {
    public $scores = [];

    public function addScore($winner) {
        if (!isset($this->scores[$winner])) {
            $this->scores[$winner] = 0;
        }
        $this->scores[$winner]++;
        arsort($this->scores);
        $this->scores = array_slice($this->scores, 0, 10, true);
    }

    public function getTopScores() {
        return $this->scores;
    }
}

if (!isset($_SESSION['game'])) {
    $_SESSION['game'] = new TicTacToe();
}

if (!isset($_SESSION['leaderboard'])) {
    $_SESSION['leaderboard'] = new Leaderboard();
}

$game = $_SESSION['game'];
$leaderboard = $_SESSION['leaderboard'];

$response = ['status' => 'error', 'message' => 'Invalid request'];
$action = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $action = $data['action'] ?? null;
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $action = $_GET['action'] ?? null;
}

if ($action) {
    switch ($action) {
        case 'makeMove':
            $position = intval($data['position']);
            $game->makeMove($position);
            if ($game->winner) {
                $leaderboard->addScore($game->winner);
            }
            $_SESSION['game'] = $game;
            $_SESSION['leaderboard'] = $leaderboard;
            $response = [
                'status' => 'success',
                'board' => $game->board,
                'currentPlayer' => $game->currentPlayer,
                'winner' => $game->winner
            ];
            break;

        case 'reset':
            $game->reset();
            $_SESSION['game'] = $game;
            $response = [
                'status' => 'success',
                'board' => $game->board,
                'currentPlayer' => $game->currentPlayer,
                'winner' => $game->winner
            ];
            break;

        case 'getLeaderboard':
            $response = [
                'status' => 'success',
                'leaderboard' => $leaderboard->getTopScores()
            ];
            break;
    }
}

echo json_encode($response);
