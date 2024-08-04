# Tic-Tac-Toe

This repository features a web-based Tic Tac Toe game created for the CSI3140 course on WWW Structures and Standards at the University of Ottawa.

## Overview

The Tic Tac Toe game is a classic implementation of the popular board game, designed to run in any modern web browser. The game features a user-friendly interface with a responsive layout, making it accessible and enjoyable on both desktop and mobile devices.

## Features

- **Interactive Gameplay**: Play Tic Tac Toe against a friend with an intuitive interface.
- **Responsive Design**: Enjoy a seamless experience on various devices.
- **Leaderboard**: View and track high scores.
- **Game Rules**: Easy-to-follow rules accessible through the “How to Play” button.
- **Reset Functionality**: Restart the game at any time using the reset button.
- **User Authentication**: Log in or register to save your game progress and view personalized leaderboards.

## System Design

[System Design](/docs/design_system.md)

## Installation

To get started with this project:

1. Clone the repository

```bash
git clone https://github.com/nalank1/tictactoe.git
```

2. Navigate to the project directory:

```bash
cd tictactoe
```

## Usage

- **Making Moves**: Click on any empty cell within the game grid to make your move. The game alternates between two players (traditionally X and O). Your selection will be indicated by the corresponding symbol.
- **Winning the Game**: The game will automatically detect when a player has won or if the game ends in a draw. Winning lines will be highlighted to show which player has won.
- **Viewing Results**: When a game is won or ends in a draw, a modal will appear displaying the result. You can view the winner's message and have the option to play again. 
-**Using the Reset Button**: If you want to start a new game without closing the browser, click the "Reset Game" button located below the game grid. This will clear the board and reset the game state.
- **How to Play Again**: After a game concludes, you can click the "Play Again" button in the modal that appears. This will reset the game and allow you to start a new game immediately.
- **How to Play Button**: Click the "How to Play" button to view a brief overview of the game rules. This will open a section within the page explaining the basic rules of Tic Tac Toe.
- **Leaderboard Section**: The game includes a leaderboard to display high scores. You can find this section at the bottom of the page. It lists player scores in descending order and provides a quick reference for top scores.
- **User Authentication**: Use the "Login" and "Register" buttons in the authentication container to access or create an account. This feature helps save game progress and view personalized leaderboards.

![image](/docs/assets/design_system/leaderboard.PNG)

![image](/docs/assets/design_system/firstOne.png)

![image](/docs/assets/design_system/P4-1.PNG)

![image](/docs/assets/design_system/P4-2.PNG)

![image](/docs/assets/design_system/P4-3.PNG)

![image](/docs/assets/design_system/P4-4.PNG)

![image](/docs/assets/design_system/P4-5.PNG)

## PHP Integration

PHP sessions are employed to maintain the game state and leaderboard across different HTTP requests.

1. **Game Moves**:

PHP Script: leaderboard.php handles game moves. The JavaScript function sendMove(index, player) sends the player's move to the server, where it updates the game state.

2. **Game Reset**:

PHP Script: leaderboard.php handles resetting the game. The JavaScript function resetGameOnServer() sends a request to reset the game state on the server.

3. **Leaderboard Management**:

Updating Leaderboard: When a game ends, the winner is sent to the server using updateLeaderboard(winner). The server updates the leaderboard and responds with the updated list.
Fetching Leaderboard: On page load, the fetchLeaderboard() function requests the current leaderboard from the server and displays it on the page.

## API Endpoints

The game uses PHP for server-side operations to handle game state and leaderboard updates. These endpoints respond to AJAX requests made from the client-side JavaScript.

- **`GET /leaderboard.php?action=getLeaderboard`**: Fetches the current leaderboard.
- **`POST /leaderboard.php?action=move`**: Records a player's move. Expects JSON payload `{ "index": number, "player": "X" | "O" }`.
- **`POST /leaderboard.php?action=reset`**: Resets the game state.
- **`POST /leaderboard.php?action=updateLeaderboard`**: Updates the leaderboard with the winner. Expects JSON payload `{ "winner": "X" | "O" }`.

1. **Action detection**: The PHP script detects the requested action (making a move, resetting the game, fetching the leaderboard) based on the HTTP request method and parameters.
2. **Make move**: When a move is made by a player (place a X or O):
   - The server receives the position of the move and the current player.
   - The server updates the game state and checks for a winner.
   - If a player wins, their score is updated in the leaderboard.
   - The updated game state and current player are sent back to the client.
3. **Reset game**: When the game is reset:
   - The game state is re-initialized.
   - The new game state is sent back to the client to update the UI.
4. **Fetch leaderboard**: When the leaderboard is requested:
   - The server retrieves the scores from the leaderboard.
   - The leaderboard data is sent back to the client for display.

## Acknowledgment

We thank TAs and Professor Kalala for their assistance throughout this course and assignment.

## Contributors

Nalan Kurnaz - 300245521
Myrtille Murangamirwa - 08444640
