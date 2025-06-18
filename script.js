const board = document.getElementById("board");
const statusText = document.getElementById("status");
const modeSelector = document.getElementById("modeSelector");
let currentPlayer = "X";
let gameActive = true;
let gameState = Array(9).fill("");

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function createBoard() {
  board.innerHTML = "";
  gameState.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.dataset.index = index;
    cellDiv.textContent = cell;
    cellDiv.addEventListener("click", handleClick);
    board.appendChild(cellDiv);
  });
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (!gameState[index] && gameActive) {
    gameState[index] = currentPlayer;
    createBoard();
    if (checkResult()) return;

    if (modeSelector.value === "ai" && currentPlayer === "X") {
      currentPlayer = "O";
      setTimeout(aiMove, 300);
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function aiMove() {
  if (!gameActive) return;

  let available = gameState
    .map((val, i) => (val === "" ? i : null))
    .filter((i) => i !== null);
  if (available.length === 0) return;

  const move = available[0]; // Simple AI logic
  gameState[move] = "O";
  createBoard();
  checkResult();
  currentPlayer = "X";
  statusText.textContent = `Player X's turn`;
}

function checkResult() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      statusText.textContent = `Player ${gameState[a]} wins!`;
      gameActive = false;
      return true;
    }
  }

  if (!gameState.includes("")) {
    statusText.textContent = "Draw!";
    gameActive = false;
    return true;
  }

  return false;
}

function restartGame() {
  gameState = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's turn";
  createBoard();
}

createBoard();
