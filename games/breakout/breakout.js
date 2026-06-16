const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

let paddle;
let ball;
let bricks;
let score;
let gameOver;
let animationId;

function initGame() {

    paddle = {
        x: 160,
        y: 560,
        width: 80,
        height: 15,
        speed: 25
    };

    ball = {
        x: 200,
        y: 300,
        radius: 8,
        dx: 4,
        dy: -4
    };

    bricks = [];

    for(let row = 0; row < 5; row++) {

        for(let col = 0; col < 7; col++) {

            bricks.push({
                x: 10 + col * 55,
                y: 50 + row * 30,
                width: 50,
                height: 20,
                visible: true
            });

        }

    }

    score = 0;
    scoreElement.textContent = score;

    gameOver = false;

    cancelAnimationFrame(animationId);
    gameLoop();
}

function update() {

    ball.x += ball.dx;
    ball.y += ball.dy;

    if(ball.x <= ball.radius ||
       ball.x >= canvas.width - ball.radius) {
        ball.dx *= -1;
    }

    if(ball.y <= ball.radius) {
        ball.dy *= -1;
    }

    if(ball.y > canvas.height) {
        endGame();
    }

    if(
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width &&
        ball.y + ball.radius > paddle.y
    ) {
        ball.dy *= -1;
    }

    bricks.forEach(brick => {

        if(!brick.visible) return;

        if(
            ball.x > brick.x &&
            ball.x < brick.x + brick.width &&
            ball.y > brick.y &&
            ball.y < brick.y + brick.height
        ) {

            brick.visible = false;
            ball.dy *= -1;

            score++;
            scoreElement.textContent = score;
        }

    });

    const remaining =
        bricks.filter(b => b.visible);

    if(remaining.length === 0) {

        setTimeout(() => {
            alert("You Win!");
        }, 100);

        gameOver = true;
    }
}

function draw() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "#3b82f6";

    ctx.fillRect(
        paddle.x,
        paddle.y,
        paddle.width,
        paddle.height
    );

    ctx.beginPath();
    ctx.arc(
        ball.x,
        ball.y,
        ball.radius,
        0,
        Math.PI * 2
    );
    ctx.fillStyle = "#facc15";
    ctx.fill();

    bricks.forEach(brick => {

        if(!brick.visible) return;

        ctx.fillStyle = "#22c55e";

        ctx.fillRect(
            brick.x,
            brick.y,
            brick.width,
            brick.height
        );

    });
}

function gameLoop() {

    if(gameOver) return;

    update();
    draw();

    animationId =
        requestAnimationFrame(gameLoop);
}

function moveLeft() {

    paddle.x -= paddle.speed;

    if(paddle.x < 0) {
        paddle.x = 0;
    }
}

function moveRight() {

    paddle.x += paddle.speed;

    if(
        paddle.x + paddle.width >
        canvas.width
    ) {
        paddle.x =
            canvas.width - paddle.width;
    }
}

function endGame() {

    if(gameOver) return;

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

        if(e.key === "ArrowLeft") {
            moveLeft();
        }

        if(e.key === "ArrowRight") {
            moveRight();
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

restartBtn.addEventListener(
    "click",
    initGame
);

initGame();