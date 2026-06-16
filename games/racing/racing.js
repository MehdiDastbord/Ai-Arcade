const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

let player;
let enemies;
let score;
let gameOver;
let animationId;

function initGame() {

    player = {
        x: 175,
        y: 500,
        width: 50,
        height: 80,
        speed: 25
    };

    enemies = [];

    score = 0;
    scoreElement.textContent = score;

    gameOver = false;

    createEnemy();

    cancelAnimationFrame(animationId);
    gameLoop();
}

function createEnemy() {

    const lanes = [25, 125, 225, 325];

    enemies.push({
        x: lanes[Math.floor(Math.random() * lanes.length)],
        y: -100,
        width: 50,
        height: 80,
        speed: 4 + Math.random() * 3
    });
}

function update() {

    enemies.forEach(enemy => {

        enemy.y += enemy.speed;

        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            endGame();
        }

        if (enemy.y > canvas.height) {
            enemy.y = -100;
            enemy.x = [25,125,225,325][Math.floor(Math.random() * 4)];

            score++;
            scoreElement.textContent = score;
        }
    });

    if (Math.random() < 0.01 && enemies.length < 4) {
        createEnemy();
    }
}

function drawRoad() {

    ctx.fillStyle = "#2d3748";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;

    for (let y = 0; y < canvas.height; y += 40) {

        ctx.beginPath();
        ctx.moveTo(100, y);
        ctx.lineTo(100, y + 20);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(200, y);
        ctx.lineTo(200, y + 20);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(300, y);
        ctx.lineTo(300, y + 20);
        ctx.stroke();
    }
}

function draw() {

    drawRoad();

    ctx.fillStyle = "#22c55e";

    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );

    ctx.fillStyle = "#ef4444";

    enemies.forEach(enemy => {

        ctx.fillRect(
            enemy.x,
            enemy.y,
            enemy.width,
            enemy.height
        );
    });
}

function gameLoop() {

    if (gameOver) return;

    update();
    draw();

    animationId = requestAnimationFrame(gameLoop);
}

function moveLeft() {

    if (player.x > 0) {
        player.x -= player.speed;
    }
}

function moveRight() {

    if (player.x + player.width < canvas.width) {
        player.x += player.speed;
    }
}

function endGame() {

    if (gameOver) return;

    gameOver = true;

    setTimeout(() => {
        alert(`Game Over!\n\nScore: ${score}`);
    }, 100);
}

document.addEventListener("keydown", e => {

    if (e.key === "ArrowLeft") {
        moveLeft();
    }

    if (e.key === "ArrowRight") {
        moveRight();
    }
});

leftBtn.addEventListener("click", moveLeft);
rightBtn.addEventListener("click", moveRight);

restartBtn.addEventListener("click", initGame);

initGame();