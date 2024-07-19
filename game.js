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
  cellButton.addEventListener("click", async () => {
    if (!gameActive) return;

    let currentPlayer = turnO ? "O" : "X";
    cellButton.innerHTML = currentPlayer;
    turnO = !turnO;
    cellButton.disabled = true;

    try {
      let response = await fetch("leaderboard.php?action=makeMove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ position: index, player: currentPlayer }),
      });
      let data = await response.json();

      if (data.status === "success") {
        checkWinner(data.board);
        if (data.winner) {
          showWinner(data.winner);
          updateLeaderboard(data.winner);
        } else if (data.board.every((cell) => cell !== null)) {
          showDraw();
        }
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error making move:", error);
    }
  });
});

const showWinner = (winner) => {
  winnerText.innerText = `The winner is ${winner}`;
  winnerContainer.classList.remove("hide");
  gameActive = false;
  updateLeaderboard(winner);
};

const showDraw = () => {
  winnerText.innerText = `It's a draw`;
  winnerContainer.classList.remove("hide");
  gameActive = false;
};

const resetGame = async () => {
  try {
    let response = await fetch("leaderboard.php?action=reset", { method: "POST" });
    let data = await response.json();
    if (data.status === "success") {
      turnO = true;
      gameActive = true;
      enableCells();
      winnerContainer.classList.add("hide");
    }
  } catch (error) {
    console.error("Error resetting game:", error);
  }
};

const updateLeaderboard = async (winner) => {
  try {
    let response = await fetch("leaderboard.php?action=updateLeaderboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ winner }),
    });
    let data = await response.json();
    if (data.status === "success") {
      displayLeaderboard(data.leaderboard);
    }
  } catch (error) {
    console.error("Error updating leaderboard:", error);
  }
};

const displayLeaderboard = (leaderboard) => {
  leaderboardList.innerHTML = "";
  for (const [player, score] of Object.entries(leaderboard)) {
    const listItem = document.createElement("li");
    listItem.textContent = `${player}: ${score}`;
    leaderboardList.appendChild(listItem);
  }
};

const fetchLeaderboard = async () => {
  try {
    let response = await fetch("leaderboard.php?action=getLeaderboard", { method: "GET" });
    let data = await response.json();
    if (data.status === "success") {
      displayLeaderboard(data.leaderboard);
    }
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
  }
};

fetchLeaderboard();
