const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const restartBtn = document.getElementById("restartBtn");

let score = 0;
let time = 30;
let gameOver = false;

let target = {
    x: 0,
    y: 0,
    radius: 20
};

let timerInterval;

function randomTarget() {

    target.x = Math.random() * (canvas.width - 40) + 20;
    target.y = Math.random() * (canvas.height - 40) + 20;
}

function drawTarget() {

    ctx.beginPath();
    ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);

    ctx.fillStyle = "#ef4444";
    ctx.fill();

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();
}

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawTarget();
}

function update() {
    draw();
}

function startTimer() {

    timerInterval = setInterval(() => {

        time--;
        timeElement.textContent = time;

        if (time <= 0) {
            endGame();
        }

    }, 1000);
}

function endGame() {

    gameOver = true;
    clearInterval(timerInterval);

    setTimeout(() => {
        alert(`Game Over!\n\nScore: ${score}`);
    }, 100);
}

function resetGame() {

    score = 0;
    time = 30;
    gameOver = false;

    scoreElement.textContent = score;
    timeElement.textContent = time;

    randomTarget();
    startTimer();
    update();
}

canvas.addEventListener("click", (e) => {

    if (gameOver) return;

    const rect = canvas.getBoundingClientRect();

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const dist = Math.sqrt(
        (clickX - target.x) ** 2 +
        (clickY - target.y) ** 2
    );

    if (dist < target.radius) {

        score++;
        scoreElement.textContent = score;

        randomTarget();
        update();
    }

});

restartBtn.addEventListener("click", resetGame);

randomTarget();
startTimer();
update();