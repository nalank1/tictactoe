let cells = document.querySelectorAll(".cellButton");
let resetButton = document.querySelector("#resetBtn");
let newGateBtn = document.querySelector("#playAgainBtn");
let winnerText = document.querySelector("#winnerText");
let winnercontainer = document.querySelector(".modalContent");

let turnO = true; //playerX, playerY, to interchange between players

const winning_conditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]; //better way to organise for using 2d array

cells.forEach((cellButton) => {
  cellButton.addEventListener("click", () => {
    console.log("The box was clicked");
    if (turnO) {
      cellButton.innerHTML = "O";
      turnO = false;
    } else {
      cellButton.innerHTML = "X";
      turnO = true;
    }
    cellButton.disabled = true;

    checkWinner();
  });
});

const showWinner = (winner) => {
  winnerText.innerText = `The winner is ${winner}`;
  winnercontainer.classList.remove("hide");
  disableCells();
};

const disableCells = () => {
  for (let cell of cells) {
    cell.disabled = true;
  }
};

const enableCells = () => {
  for (let cell of cells) {
    cell.disabled = false;
    cell.innerText = "";
  }
};

const checkWinner = () => {
  let draw = true;
  for (let pattern of winning_conditions) {
    console.log(pattern[0], pattern[1], pattern[2]);

    let pos1 = cells[pattern[0]].innerText;
    let pos2 = cells[pattern[1]].innerText;
    let pos3 = cells[pattern[2]].innerText;

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        console.log("winner", pos1);
        showWinner(pos1);
        return;
      }
    } else {
      draw = false;
    }
  }

  if (draw) {
    console.log("draw");
    showDraw();
  }
};

const showDraw = () => {
  winnerText.innerText = `It's a draw`;
  winnercontainer.classList.remove("hide");
  disableCells();
};

const resetGame = () => {
  turnO = true;
  enableCells();
  winnercontainer.classList.add("hide");
};

playAgainBtn.addEventListener("click", () => {
  resetGame();
});

resetButton.addEventListener("click", () => {
  resetGame();
});
