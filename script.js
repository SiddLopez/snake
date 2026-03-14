// HTML Elements
const board = document.getElementById("board");
const scoreBoard = document.getElementById("scoreBoard");
const startButton = document.getElementById("start");
const gameOverText = document.getElementById("gameOver");

// Game Settings
const boardSize = 10;
const gameSpeed = 100; // milliseconds
const SquareTypes = {
    empty: 0, 
    snake: 1, 
    food: 2 
};

const directions = {
    ArrowUp: -10 , //No es igual al codigo original
    ArrowDown: 10 , //No es igual al codigo original
    ArrowLeft: -1 , //No es igual al codigo original
    ArrowRight: 1 //No es igual al codigo original
};

// Game Variables
let snake;
let score;
let direction;
let boardSquares;
let emptySquares;
let moveInterval;

const drawSnake = () => {
    snake.forEach(square => drawSquare(square, 'snakeSquare'));
}

const drawSquare = (square, type) => {
    const [row, col] = square.split('');
    boardSquares[row][col] = SquareTypes[type];
    const squareElement = document.getElementById(square);
    squareElement.setAttribute('class', `square ${type}`);

    if(type === 'emptySquare') {
        emptySquares.push(square);
    } else{
        if(emptySquares.indexOf(square) !== -1) {
            emptySquares.splice(emptySquares.indexOf(square), 1);
        }
    }
};

const moveSnake = () => {
    const newSquare = String(
        Number(snake[snake.length - 1]) + directions[direction])
        .padStart(2, '0');
    const [row, col] = newSquare.split(''); //me quede escribiendo esta linea
}

const setDirection = newDirection => {
    direction = newDirection;
}

const directionEvent = key => {
    switch (key.code) {
        case 'ArrowUp':
            direction !== 'ArrowDown' && setDirection(key.code);
            break;
        case 'ArrowDown':
            direction !== 'ArrowUp' && setDirection(key.code);
            break;
        case 'ArrowLeft':
            direction !== 'ArrowRight' && setDirection(key.code);
            break;
        case 'ArrowRight':
            direction !== 'ArrowLeft' && setDirection(key.code);
            break;
    }
}

createRandomFood = () => {
    const randomEmptySquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    drawSquare(randomEmptySquare, 'foodSquare');
}

updateScore = () => {
    scoreBoard.innerText = score;
}

const createBoard = () => {
    boardSquares.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const squareValue = `${rowIndex}${colIndex}`;
            const squareElement = document.createElement('div');
            squareElement.setAttribute('class', 'square emptySquare');
            squareElement.setAttribute('id', squareValue);
            board.appendChild(squareElement);
            emptySquares.push(squareValue);
        });
    });
};
const setGame = () => {
    snake = ['00', '01', '02', '03'];
    score = snake.length;
    direction = 'Right';
    boardSquares = Array.from(Array(boardSize), () => new Array(boardSize).fill(SquareTypes.empty));
    console.log(boardSquares);
    board.innerHTML = '';
    emptySquares = [];
    createBoard();
}


const startGame = () => {
    setGame();
    gameOverText.style.display = 'none';
    startButton.disabled = true;
    drawSnake();
    updateScore();
    createRandomFood();
    document.addEventListener('keydown', directionEvent);
    moveInterval = setInterval(() => moveSnake(), gameSpeed);
}

startButton.addEventListener('click', startGame);