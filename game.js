let cells = document.querySelectorAll(".cellButton");
let resetButton = document.querySelector("#resetBtn");
let playAgainBtn = document.querySelector("#playAgainBtn");
let winnerText = document.querySelector("#winnerText");
let winnerContainer = document.querySelector(".modalContent");
let howToPlay = document.querySelector("#howtoplayBtn");
let leaderboardList = document.querySelector("#leaderboardList");

let turnO = true; // Player O starts the game
let gameActive = true;

const winning_conditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach((cellButton, index) => {
  cellButton.addEventListener("click", () => {
    if (!gameActive) return;

    if (turnO) {
      cellButton.innerHTML = "O";
      turnO = false;
    } else {
      cellButton.innerHTML = "X";
      turnO = true;
    }
    cellButton.disabled = true;

    checkWinner();
    sendMove(index, cellButton.innerHTML); // Send move to the server
  });
});

const showWinner = (winner) => {
  winnerText.innerText = `The winner is ${winner}`;
  winnerContainer.classList.remove("hide");
  gameActive = false;
  updateLeaderboard(winner); // Update leaderboard on the server
};

const disableCells = () => {
  cells.forEach((cell) => {
    cell.disabled = true;
  });
};

const enableCells = () => {
  cells.forEach((cell) => {
    cell.disabled = false;
    cell.innerText = "";
  });
};

const checkWinner = () => {
  let draw = true;

  for (let pattern of winning_conditions) {
    let pos1 = cells[pattern[0]].innerText;
    let pos2 = cells[pattern[1]].innerText;
    let pos3 = cells[pattern[2]].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos3 === pos2) {
      showWinner(pos1);
      return;
    }

    if (pos1 === "" || pos2 === "" || pos3 === "") {
      draw = false;
    }
  }

  if (draw) {
    showDraw();
  }
};

const showDraw = () => {
  winnerText.innerText = `It's a draw`;
  winnerContainer.classList.remove("hide");
  gameActive = false;
};

const resetGame = () => {
  turnO = true;
  gameActive = true;
  enableCells();
  winnerContainer.classList.add("hide");
  resetGameOnServer(); // Reset game on the server
};

let rulesShown = false;
const toggleRules = () => {
  const rules = `
    1. The game is played on a grid that's 3 squares by 3 squares.
    2. You are X, your friend (or the computer in this case) is O. Players take turns putting their marks in empty squares.
    3. The first player to get 3 of their marks in a row (up, down, across, or diagonally) is the winner.
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

howToPlay.addEventListener("click", () => {
  toggleRules();
});

playAgainBtn.addEventListener("click", () => {
  resetGame();
});

resetButton.addEventListener("click", () => {
  resetGame();
});

// AJAX functions to communicate with the server
const sendMove = (index, player) => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "leaderboard.php?action=move", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({ index, player }));

  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      console.log(response.message);
    } else {
      console.error("Error recording move.");
    }
  };
};

const resetGameOnServer = () => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "leaderboard.php?action=reset", true);
  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      console.log(response.message);
    } else {
      console.error("Error resetting game.");
    }
  };
};

const updateLeaderboard = (winner) => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "leaderboard.php?action=updateLeaderboard", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({ winner }));

  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      displayLeaderboard(response.leaderboard);
    } else {
      console.error("Error updating leaderboard.");
    }
  };
};

const displayLeaderboard = (leaderboard) => {
  leaderboardList.innerHTML = "";

  leaderboard.forEach((entry) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${entry.username}: ${entry.wins}`;
    leaderboardList.appendChild(listItem);
  });
};

// Fetch leaderboard on page load
const fetchLeaderboard = () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "leaderboard.php?action=getLeaderboard", true);
  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      displayLeaderboard(response.leaderboard);
    } else {
      console.error("Error fetching leaderboard.");
    }
  };
};

fetchLeaderboard();

// AJAX function for registering a user
const registerUser = (username, name, location, profilePicture) => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "register.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
      // Handle response (e.g., show success message or handle errors)
    }
  };
  xhr.send(`username=${username}&name=${name}&location=${location}&profile_picture=${profilePicture}`);
};

// AJAX function for logging in a user
const loginUser = (username) => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "login.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
      // Handle response (e.g., redirect to game page or show error message)
    }
  };
  xhr.send(`username=${username}`);
};

// Event listener for registration form submission
document.querySelector("#registerForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const username = event.target.username.value;
  const name = event.target.name.value;
  const location = event.target.location.value;
  const profilePicture = event.target.profile_picture.value;

  registerUser(username, name, location, profilePicture);
});

// Event listener for login form submission
document.querySelector("#loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const username = event.target.username.value;

  loginUser(username);
});
