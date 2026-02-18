const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const againBtn = document.getElementById("againBtn");

const start = document.getElementById("start");
const game = document.getElementById("game");
const over = document.getElementById("over");

const cells = document.querySelectorAll(".cell");
const result = document.getElementById("result");

const xScoreEl = document.getElementById("xScore");
const oScoreEl = document.getElementById("oScore");

let board = ["", "", "", "", "", "", "", "", ""];
let player = "X";
let xScore = 0;
let oScore = 0;
let playing = false;


startBtn.onclick = () => {
    start.classList.remove("show");
    game.classList.add("show");
    playing = true;
};


cells.forEach(cell => {
    cell.onclick = () => {
        const i = cell.dataset.i;
        if (!playing || board[i] !== "") return;

        board[i] = player;
        cell.textContent = player;
        cell.classList.add(player.toLowerCase());

        if (checkWin()) {
            updateScore();
            endGame(player + " Wins");
            return;
        }

        if (board.every(v => v !== "")) {
            endGame("Draw");
            return;
        }

        player = player === "X" ? "O" : "X";
    };
});


function checkWin() {
    const w = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return w.some(c => c.every(i => board[i] === player));
}


function endGame(text) {
    playing = false;
    game.classList.remove("show");
    over.classList.add("show");
    result.textContent = text;
}


function updateScore() {
    if (player === "X") {
        xScore++;
        xScoreEl.textContent = xScore;
    } else {
        oScore++;
        oScoreEl.textContent = oScore;
    }
}


restartBtn.onclick = reset;
againBtn.onclick = () => {
    over.classList.remove("show");
    game.classList.add("show");
    reset();
};

function reset() {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(c => {
        c.textContent = "";
        c.classList.remove("x", "o");
    });
    player = "X";
    playing = true;
}