const gameBoard = document.getElementById('game-board');
const ctx = gameBoard.getContext("2d");
const scoreText = document.getElementById('score');
const scoreZone = document.getElementById('score-zone');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
const snakeColor = 'purple';
const foodColor = 'blue';
const yourScore = document.createElement('p');


let matrixSize = 25;
let gameSpeed = 90;
let run = false;
let xVel = matrixSize;
let yVel = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x: matrixSize * 4, y:0},
    {x: matrixSize * 3, y:0},
    {x: matrixSize * 2, y:0},
    {x: matrixSize * 1, y:0},
]

//Events

window.addEventListener('keydown', changeDirection);

startBtn.addEventListener('click', (e) => {
    resetBtn.classList.remove('hide');
    startBtn.classList.add('hide');
    gameStart();
})
resetBtn.addEventListener('click', resetGame);


//Function

function gameStart(){
    run = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    tick();
};

function resetGame(){
    score = 0;
    yourScore.innerHTML = '';
    gameSpeed = 90;
    xVel = matrixSize;
    yVel = 0;
    snake = [
        {x: matrixSize * 4, y:0},
        {x: matrixSize * 3, y:0},
        {x: matrixSize * 2, y:0},
        {x: matrixSize * 1, y:0},
    ];
    gameStart();
};

function createFood(){
    const randomFood = (min, max) =>{
        //
        const randomN = Math.round((Math.random() * (max - min) + min) / matrixSize) * matrixSize
        return randomN
    };
    foodX = randomFood(0, WIDTH - matrixSize);
    foodY = randomFood(0, WIDTH - matrixSize);
};

function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, matrixSize, matrixSize);
};

function drawSnake(){
    ctx.fillStyle = snakeColor;
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, matrixSize, matrixSize);
    })
};

function moveSnake(){
    const snakeHead = {x: snake[0].x + xVel, y: snake[0].y + yVel};
    snake.unshift(snakeHead);
    if(snake[0].x == foodX && snake[0].y == foodY){
        score++;
        gameSpeed -= 1;
        console.log(gameSpeed)
        scoreText.textContent = score;
        createFood();
    } else{
        snake.pop();
    }
};

function tick(){
    if(run) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            tick();
        }, gameSpeed)
    } else {
        gameOver();
    }
};

function clearBoard(){
    ctx.fillStyle = '#121212';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function changeDirection(e){
    // UP = 38 / DOWN = 40 / LEFT = 37 / RIGTH = 39;
    const keyPressed = e.keyCode;
    switch(keyPressed){
        case 38:
            if(yVel == 0){
                xVel = 0;
                yVel = -matrixSize;
            }
            break;
        case 40:
            if(yVel == 0){
                xVel = 0;
                yVel = matrixSize;
            }
            break;
        case 37:
            if(xVel == 0){
                xVel = -matrixSize;
                yVel = 0;
            }
            break;
        case 39:
            if(xVel == 0){
                xVel = matrixSize;
                yVel = 0;
            }
            break;
    };
};

function checkGameOver(){
    switch(true){
        case (snake[0].x < 0):
            run = false;
            break;
        case (snake[0].x >= WIDTH):
            run = false;
            break;
        case (snake[0].y < 0):
            run = false;
            break
        case (snake[0].y >= HEIGHT):
            run = false;
            break
    };
    for(let i = 1; i < snake.length; i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            run = false;
        }
    }
};

function gameOver(){
    scoreText.innerHTML = 'GAME OVER!';
    yourScore.innerText = score;
    scoreZone.appendChild(yourScore);
};


