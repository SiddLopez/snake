// HTML Elements
const board = document.getElementById("board");
const scoreBoard = document.getElementById("scoreBoard");
const startButton = document.getElementById("start");
const gameOverText = document.getElementById("gameOver");

// Game Settings
const boardSize = 10;
const gameSpeed = 100; // milliseconds
const SquareTypes = {
    empty: 0, //No es igual al codigo original
    snake: 1, //No es igual al codigo original
    food: 2 //No es igual al codigo original
};

const directions = {
    up: { x: 0, y: -10 }, //No es igual al codigo original
    down: { x: 0, y: 10 }, //No es igual al codigo original
    left: { x: -1, y: 0 }, //No es igual al codigo original
    right: { x: 1, y: 0 } //No es igual al codigo original
};

// Game Variables
let snake;
let score;
let direction;
let boardSquares;
let emptySquares;
let moveInterval;

const setGame = () => {
    snake = ['00', '01', '02', '03'];
    score = snake.length;
    direction = 'Right';
    boardSquares = Array.from(Array(boardSize), () => new Array(boardSize).fill(SquareTypes.empty));
    console.log(JSON.stringify(boardSquares));
}


const startGame = () => {
    setGame();
}

startButton.addEventListener('click', startGame);