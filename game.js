let cells = document.querySelectorAll(".cellButton");
let resetButton = document.querySelector("#resetBtn");
let playAgainBtn = document.querySelector("#playAgainBtn");
let winnerText = document.querySelector("#winnerText");
let winnerContainer = document.querySelector(".modalContent");
let howToPlay = document.querySelector("#howtoplayBtn");

const getState = () => {
  fetch('api.php?action=getState')
    .then(response => response.json())
    .then(data => updateUI(data))
    .catch(error => console.error('Error:', error));
};

const makeMove = (index) => {
  fetch('api.php?action=move', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index })
  })
    .then(response => response.json())
    .then(data => updateUI(data))
    .catch(error => console.error('Error:', error));
};

const resetGame = () => {
  fetch('api.php?action=reset')
    .then(response => response.json())
    .then(data => updateUI(data))
    .catch(error => console.error('Error:', error));
};

const updateUI = (data) => {
  cells.forEach((cell, index) => {
    cell.innerHTML = data.board[index];
    cell.disabled = data.board[index] !== '';
  });

  if (data.winner) {
    if (data.winner === 'draw') {
      winnerText.innerText = `It's a draw`;
    } else {
      winnerText.innerText = `The winner is ${data.winner}`;
    }
    winnerContainer.classList.remove("hide");
  } else {
    winnerContainer.classList.add("hide");
  }

  // Updating leaderboard
  const leaderboard = document.querySelector("#leaderboard");
  leaderboard.innerHTML = '<h2>Leaderboard</h2>';
  data.leaderboard.forEach((player, index) => {
    const playerScore = document.createElement('p');
    playerScore.innerText = `${index + 1}. ${player}`;
    leaderboard.appendChild(playerScore);
  });
};

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => makeMove(index));
});

resetButton.addEventListener("click", resetGame);
playAgainBtn.addEventListener("click", resetGame);

howToPlay.addEventListener("click", () => {
  toggleRules();
});

let rulesShown = false;
const toggleRules = () => {
  const rules = `
    1. The game is played on a grid that's 3 squares by 3 squares.
    2. You are X, your friend (or the computer in this case) is O. Players take turns putting their marks in empty squares.
    3. The first player to get 3 of her marks in a row (up, down, across, or diagonally) is the winner.
    4. When all 9 squares are full, the game is over. If no player has 3 marks in a row, the game ends in a tie.
  `;

  const rulesElement = document.querySelector("#rules");
  if (rulesShown) {
    rulesElement.innerText = "";
  } else {
    rulesElement.innerText = rules;
  }

  rulesShown = !rulesShown;
};

document.addEventListener("DOMContentLoaded", getState);
