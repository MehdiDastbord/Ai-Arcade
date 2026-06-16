const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const fireBtn = document.getElementById("fireBtn");

let player;
let bullets;
let enemies;
let score;
let gameOver;
let animationId;

function initGame() {

    player = {
        x: 180,
        y: 540,
        width: 40,
        height: 40
    };

    bullets = [];
    enemies = [];

    score = 0;
    scoreElement.textContent = score;

    gameOver = false;

    cancelAnimationFrame(animationId);

    createEnemy();
    gameLoop();
}

function createEnemy() {

    enemies.push({
        x: Math.random() * 360,
        y: -40,
        width: 30,
        height: 30,
        speed: 2 + Math.random() * 2
    });
}

function fireBullet() {

    if (gameOver) return;

    bullets.push({
        x: player.x + 17,
        y: player.y,
        width: 6,
        height: 12,
        speed: 8
    });
}

function update() {

    bullets.forEach(bullet => {
        bullet.y -= bullet.speed;
    });

    bullets = bullets.filter(
        bullet => bullet.y > -20
    );

    enemies.forEach(enemy => {
        enemy.y += enemy.speed;
    });

    enemies.forEach((enemy, enemyIndex) => {

        if (enemy.y > canvas.height) {
            endGame();
        }

        bullets.forEach((bullet, bulletIndex) => {

            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {

                bullets.splice(bulletIndex, 1);
                enemies.splice(enemyIndex, 1);

                score++;
                scoreElement.textContent = score;
            }

        });

    });

    if (
        Math.random() < 0.02 &&
        enemies.length < 6
    ) {
        createEnemy();
    }
}

function draw() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "#22c55e";

    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );

    ctx.fillStyle = "#facc15";

    bullets.forEach(bullet => {

        ctx.fillRect(
            bullet.x,
            bullet.y,
            bullet.width,
            bullet.height
        );

    });

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

    animationId =
        requestAnimationFrame(gameLoop);
}

function moveLeft() {

    player.x -= 20;

    if (player.x < 0) {
        player.x = 0;
    }
}

function moveRight() {

    player.x += 20;

    if (
        player.x + player.width >
        canvas.width
    ) {
        player.x =
            canvas.width - player.width;
    }
}

function endGame() {

    if (gameOver) return;

    gameOver = true;

    setTimeout(() => {
        alert(
            `Game Over!\n\nScore: ${score}`
        );
    }, 100);
}

document.addEventListener(
    "keydown",
    e => {

        if (e.key === "ArrowLeft") {
            moveLeft();
        }

        if (e.key === "ArrowRight") {
            moveRight();
        }

        if (e.key === " ") {
            fireBullet();
        }

    }
);

leftBtn.addEventListener(
    "click",
    moveLeft
);

rightBtn.addEventListener(
    "click",
    moveRight
);

fireBtn.addEventListener(
    "click",
    fireBullet
);

restartBtn.addEventListener(
    "click",
    initGame
);

initGame();