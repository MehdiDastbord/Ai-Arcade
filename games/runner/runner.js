const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");
const jumpBtn = document.getElementById("jumpBtn");

let player;
let obstacles;
let score;
let gameOver;
let animationId;

const gravity = 0.7;
const jumpPower = -12;

function initGame() {

    player = {
        x: 60,
        y: 380,
        width: 40,
        height: 40,
        velocityY: 0,
        jumping: false
    };

    obstacles = [];

    score = 0;
    scoreElement.textContent = score;

    gameOver = false;

    cancelAnimationFrame(animationId);

    createObstacle();
    gameLoop();
}

function createObstacle() {

    obstacles.push({
        x: canvas.width,
        y: 390,
        width: 30,
        height: 30,
        speed: 5
    });
}

function jump() {

    if (!player.jumping) {

        player.velocityY = jumpPower;
        player.jumping = true;

    }
}

function update() {

    player.velocityY += gravity;
    player.y += player.velocityY;

    if (player.y >= 380) {

        player.y = 380;
        player.velocityY = 0;
        player.jumping = false;

    }

    obstacles.forEach(obstacle => {

        obstacle.x -= obstacle.speed;

        if (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
        ) {
            endGame();
        }

    });

    obstacles = obstacles.filter(
        obstacle => obstacle.x > -50
    );

    if (
        obstacles.length === 0 ||
        obstacles[obstacles.length - 1].x < 220
    ) {
        createObstacle();
    }

    score++;
    scoreElement.textContent = Math.floor(score / 10);
}

function drawGround() {

    ctx.fillStyle = "#374151";

    ctx.fillRect(
        0,
        430,
        canvas.width,
        70
    );
}

function draw() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawGround();

    ctx.fillStyle = "#22c55e";

    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );

    ctx.fillStyle = "#ef4444";

    obstacles.forEach(obstacle => {

        ctx.fillRect(
            obstacle.x,
            obstacle.y,
            obstacle.width,
            obstacle.height
        );

    });
}

function gameLoop() {

    if (gameOver) return;

    update();
    draw();

    animationId =
        requestAnimationFrame(gameLoop);
}

function endGame() {

    if (gameOver) return;

    gameOver = true;

    setTimeout(() => {

        alert(
            `Game Over!\n\nScore: ${
                Math.floor(score / 10)
            }`
        );

    }, 100);
}

document.addEventListener(
    "keydown",
    e => {

        if (
            e.code === "Space" ||
            e.key === "ArrowUp"
        ) {
            jump();
        }

    }
);

jumpBtn.addEventListener(
    "click",
    jump
);

restartBtn.addEventListener(
    "click",
    initGame
);

canvas.addEventListener(
    "click",
    jump
);

initGame();