const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

let player;
let asteroids;
let score;
let gameOver;
let animationId;

function initGame() {

    player = {
        x: 180,
        y: 520,
        width: 40,
        height: 40,
        speed: 20
    };

    asteroids = [];

    score = 0;
    scoreElement.textContent = score;

    gameOver = false;

    cancelAnimationFrame(animationId);

    createAsteroid();
    gameLoop();
}

function createAsteroid() {

    asteroids.push({
        x: Math.random() * 360,
        y: -40,
        size: 30 + Math.random() * 20,
        speed: 3 + Math.random() * 3
    });
}

function update() {

    asteroids.forEach(a => {
        a.y += a.speed;

        if (
            player.x < a.x + a.size &&
            player.x + player.width > a.x &&
            player.y < a.y + a.size &&
            player.y + player.height > a.y
        ) {
            endGame();
        }

        if (a.y > canvas.height) {
            a.y = -50;
            a.x = Math.random() * 360;

            score++;
            scoreElement.textContent = score;
        }
    });

    if (Math.random() < 0.02 && asteroids.length < 8) {
        createAsteroid();
    }
}

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // player (ship)
    ctx.fillStyle = "#22c55e";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // asteroids
    ctx.fillStyle = "#ef4444";

    asteroids.forEach(a => {
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.size / 2, 0, Math.PI * 2);
        ctx.fill();
    });
}

function gameLoop() {

    if (gameOver) return;

    update();
    draw();

    animationId = requestAnimationFrame(gameLoop);
}

function moveLeft() {
    player.x -= player.speed;
    if (player.x < 0) player.x = 0;
}

function moveRight() {
    player.x += player.speed;
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
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

    if (e.key === "ArrowLeft") moveLeft();
    if (e.key === "ArrowRight") moveRight();

});

leftBtn.addEventListener("click", moveLeft);
rightBtn.addEventListener("click", moveRight);
restartBtn.addEventListener("click", initGame);

initGame();