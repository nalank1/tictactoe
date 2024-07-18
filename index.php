<?php
require_once '_config.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic Tac Toe Game</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div id="board">
        <div class="cellButton" data-index="0"></div>
        <div class="cellButton" data-index="1"></div>
        <div class="cellButton" data-index="2"></div>
        <div class="cellButton" data-index="3"></div>
        <div class="cellButton" data-index="4"></div>
        <div class="cellButton" data-index="5"></div>
        <div class="cellButton" data-index="6"></div>
        <div class="cellButton" data-index="7"></div>
        <div class="cellButton" data-index="8"></div>
    </div>
    <button id="resetBtn">Reset</button>
    <div id="leaderboard"><h2>Leaderboard</h2></div>
    <div class="modalContent hide">
        <p id="winnerText"></p>
        <button id="playAgainBtn">Play Again</button>
    </div>
    <button id="howtoplayBtn">How to Play</button>
    <div id="rules"></div>
    <script src="game.js"></script>
</body>
</html>
