let cells = document.querySelectorAll(".cellButton");
let resetButton = document.querySelector("#resetBtn");

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
  cellButton.addEventListener("click", (cellClicked) => {
    console.log("The box was clicked");
    if (turnO) {
      cellButton.innerHTML = "O";
      turnO = false;
    } else {
      cellButton.innerHTML = "X";
      turnO = true;
    }
    cellButton.disabled = true;
  });
});
