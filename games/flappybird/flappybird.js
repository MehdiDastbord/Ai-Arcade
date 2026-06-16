const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");
const jumpBtn = document.getElementById("jumpBtn");

let bird;
let pipes;
let score;
let gameOver;
let animationId;

const gravity = 0.45;
const jumpForce = -7;
const pipeWidth = 60;
const pipeGap = 170;
const pipeSpeed = 2.5;

function initGame() {

    bird = {
        x: 80,
        y: 250,
        width: 30,
        height: 30,
        velocity: 0
    };

    pipes = [];

    score = 0;
    scoreElement.textContent = score;

    gameOver = false;

    createPipe();

    cancelAnimationFrame(animationId);
    gameLoop();
}

function createPipe() {

    const minHeight = 80;
    const maxHeight = 320;

    const topHeight =
        Math.floor(
            Math.random() * (maxHeight - minHeight)
        ) + minHeight;

    pipes.push({
        x: canvas.width,
        topHeight,
        counted: false
    });
}

function jump() {

    if (gameOver) return;

    bird.velocity = jumpForce;
}

function update() {

    bird.velocity += gravity;
    bird.y += bird.velocity;

    if (bird.y < 0) {
        bird.y = 0;
    }

    if (bird.y + bird.height > canvas.height) {
        endGame();
    }

    pipes.forEach(pipe => {

        pipe.x -= pipeSpeed;

        if (
            bird.x < pipe.x + pipeWidth &&
            bird.x + bird.width > pipe.x &&
            (
                bird.y < pipe.topHeight ||
                bird.y + bird.height >
                pipe.topHeight + pipeGap
            )
        ) {
            endGame();
        }

        if (!pipe.counted && pipe.x + pipeWidth < bird.x) {
            pipe.counted = true;
            score++;
            scoreElement.textContent = score;
        }
    });

    pipes = pipes.filter(pipe => pipe.x > -pipeWidth);

    if (
        pipes.length === 0 ||
        pipes[pipes.length - 1].x < 220
    ) {
        createPipe();
    }
}

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#facc15";

    ctx.fillRect(
        bird.x,
        bird.y,
        bird.width,
        bird.height
    );

    ctx.fillStyle = "#16a34a";

    pipes.forEach(pipe => {

        ctx.fillRect(
            pipe.x,
            0,
            pipeWidth,
            pipe.topHeight
        );

        ctx.fillRect(
            pipe.x,
            pipe.topHeight + pipeGap,
            pipeWidth,
            canvas.height
        );
    });
}

function gameLoop() {

    if (gameOver) return;

    update();
    draw();

    animationId = requestAnimationFrame(gameLoop);
}

function endGame() {

    if (gameOver) return;

    gameOver = true;

    setTimeout(() => {
        alert(`Game Over!\n\nScore: ${score}`);
    }, 100);
}

document.addEventListener("keydown", e => {

    if (e.code === "Space") {
        jump();
    }
});

canvas.addEventListener("click", jump);
jumpBtn.addEventListener("click", jump);
restartBtn.addEventListener("click", initGame);

initGame();