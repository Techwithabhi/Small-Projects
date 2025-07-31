const cells = document.querySelectorAll(".cell");
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");

function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];
    
    for (let combination of winningCombinations) {
        let [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            popupMessage.textContent = `${currentPlayer} Wins! 🎉`;
            popup.classList.add("show");
            cells[a].classList.add("winning-cell");
            cells[b].classList.add("winning-cell");
            cells[c].classList.add("winning-cell");
            return true;
        }
    }
    
    if (!board.includes("")) {
        popupMessage.textContent = "It's a Draw! 🤝";
        popup.classList.add("show");
        return true;
    }
    return false;
}

function handleClick(event) {
    let index = event.target.id.split("-")[1];
    if (board[index] === "" && currentPlayer === "X") {
        board[index] = "X";
        event.target.textContent = "X";
        if (!checkWin()) {
            currentPlayer = "O";
            document.querySelector(".status").textContent = `Player ${currentPlayer}'s Turn`;
            setTimeout(aiMove, 500);
        }
    }
}

function aiMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = "O";
            let score = minimax(board, 0, false);
            board[i] = "";
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    if (move !== undefined) {
        board[move] = "O";
        cells[move].textContent = "O";
        if (!checkWin()) {
            currentPlayer = "X";
            document.querySelector(".status").textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
}

function minimax(boardState, depth, isMaximizing) {
    const winner = getWinner(boardState);
    if (winner === "O") return 10 - depth;
    if (winner === "X") return depth - 10;
    if (!boardState.includes("")) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < boardState.length; i++) {
            if (boardState[i] === "") {
                boardState[i] = "O";
                let score = minimax(boardState, depth + 1, false);
                boardState[i] = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < boardState.length; i++) {
            if (boardState[i] === "") {
                boardState[i] = "X";
                let score = minimax(boardState, depth + 1, true);
                boardState[i] = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function getWinner(boardState) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let [a, b, c] of winPatterns) {
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return null;
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winning-cell");
    });
    currentPlayer = "X";
    document.querySelector(".status").textContent = "Player X's Turn";
    popup.classList.remove("show");
}

cells.forEach(cell => cell.addEventListener("click", handleClick));