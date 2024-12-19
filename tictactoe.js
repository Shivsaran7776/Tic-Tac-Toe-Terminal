const prompt = require('prompt-sync')();

let gameBoard = [' ',' ',' ',' ',' ',' ',' ',' ',' '];

let currentPlayer = "X";

let gameActive = true;

function printBoard() {
    console.log(`
        ${gameBoard[0]} | ${gameBoard[1]} | ${gameBoard[2]}
        _________
        ${gameBoard[3]} | ${gameBoard[4]} | ${gameBoard[5]}
        _________
        ${gameBoard[6]} | ${gameBoard[7]} | ${gameBoard[8]}
        `);
}

function handleMoves(position) {
    if(gameBoard[position] == ' ') {
        gameBoard[position] = currentPlayer;
    } else {
        console.log("Cell is occupied by other player, choose other cell");
        return false;
    }

    if(checkWin()) {
        printBoard();
        console.log(`Player ${currentPlayer} wins`);
        gameActive = false;
        return true;
    }
    
    if(gameBoard.every(cell => cell !== " ")) {
        printBoard();
        console.log("It's a draw");
        gameActive = false;
        return true;
    }
    
    currentPlayer = (currentPlayer == "X" ? "O" : "X");
    return true;
}

function checkWin() {
    const conditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ];

    return conditions.some(condition => {
        const [a,b,c] = condition;
        return gameBoard[a] == currentPlayer && gameBoard[b] == currentPlayer && gameBoard[c] == currentPlayer;
    })
}

while(gameActive) {
    printBoard();
    const position = prompt(`Player ${currentPlayer} enter your move[0-8]: `);

    if(position >= 0 && position <= 8) {
        handleMoves(parseInt(position));
    } else {
        console.log("Invalid position, enter number between [0-8]");
    }
}