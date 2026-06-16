const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

const upBtn = document.getElementById("upBtn");
const downBtn = document.getElementById("downBtn");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake;
let food;
let dx;
let dy;
let score;
let gameLoop;

function initGame() {

    snake = [
        { x: 10, y: 10 }
    ];

    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };

    dx = 1;
    dy = 0;

    score = 0;
    scoreElement.textContent = score;

    clearInterval(gameLoop);
    gameLoop = setInterval(updateGame, 120);
}

function updateGame() {

    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };

    if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= tileCount ||
        head.y >= tileCount
    ) {
        gameOver();
        return;
    }

    for (let part of snake) {
        if (head.x === part.x && head.y === part.y) {
            gameOver();
            return;
        }
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {

        score++;
        scoreElement.textContent = score;

        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };

    } else {
        snake.pop();
    }

    drawGame();
}

function drawGame() {

    ctx.fillStyle = "#111827";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#22c55e";

    snake.forEach(segment => {
        ctx.fillRect(
            segment.x * gridSize,
            segment.y * gridSize,
            gridSize - 2,
            gridSize - 2
        );
    });

    ctx.fillStyle = "#ef4444";

    ctx.fillRect(
        food.x * gridSize,
        food.y * gridSize,
        gridSize - 2,
        gridSize - 2
    );
}

function gameOver() {

    clearInterval(gameLoop);

    setTimeout(() => {
        alert(`Game Over!\n\nScore: ${score}`);
    }, 100);
}

function setDirection(direction) {

    switch (direction) {

        case "up":
            if (dy !== 1) {
                dx = 0;
                dy = -1;
            }
            break;

        case "down":
            if (dy !== -1) {
                dx = 0;
                dy = 1;
            }
            break;

        case "left":
            if (dx !== 1) {
                dx = -1;
                dy = 0;
            }
            break;

        case "right":
            if (dx !== -1) {
                dx = 1;
                dy = 0;
            }
            break;
    }
}

document.addEventListener("keydown", e => {

    switch (e.key) {

        case "ArrowUp":
            setDirection("up");
            break;

        case "ArrowDown":
            setDirection("down");
            break;

        case "ArrowLeft":
            setDirection("left");
            break;

        case "ArrowRight":
            setDirection("right");
            break;
    }
});

upBtn.addEventListener("click", () => setDirection("up"));
downBtn.addEventListener("click", () => setDirection("down"));
leftBtn.addEventListener("click", () => setDirection("left"));
rightBtn.addEventListener("click", () => setDirection("right"));

restartBtn.addEventListener("click", initGame);

initGame();