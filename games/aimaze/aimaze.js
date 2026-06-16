const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const generateBtn = document.getElementById("generateBtn");
const restartBtn = document.getElementById("restartBtn");
const statusText = document.getElementById("status");

const size = 10;
const cols = 40;
const rows = 40;

let grid = [];
let player = { x: 0, y: 0 };
let goal = { x: cols - 1, y: rows - 1 };

let gameActive = false;

function createMaze() {

    grid = [];

    for (let y = 0; y < rows; y++) {

        let row = [];

        for (let x = 0; x < cols; x++) {

            // 25% دیوار
            row.push(Math.random() < 0.25 ? 1 : 0);

        }

        grid.push(row);
    }

    // تضمین مسیر شروع و پایان
    grid[0][0] = 0;
    grid[rows - 1][cols - 1] = 0;

    player = { x: 0, y: 0 };
    goal = { x: cols - 1, y: rows - 1 };

    gameActive = true;

    statusText.textContent = "Maze generated! Reach the green goal 🟢";

    draw();
}

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw maze
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {

            if (grid[y][x] === 1) {
                ctx.fillStyle = "#1f2937";
                ctx.fillRect(x * size, y * size, size, size);
            }

        }
    }

    // goal
    ctx.fillStyle = "#22c55e";
    ctx.fillRect(goal.x * size, goal.y * size, size, size);

    // player
    ctx.fillStyle = "#facc15";
    ctx.fillRect(player.x * size, player.y * size, size, size);
}

function move(dx, dy) {

    if (!gameActive) return;

    let nx = player.x + dx;
    let ny = player.y + dy;

    // خارج نشه
    if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) return;

    // برخورد با دیوار
    if (grid[ny][nx] === 1) return;

    player.x = nx;
    player.y = ny;

    // برد
    if (player.x === goal.x && player.y === goal.y) {

        gameActive = false;
        statusText.textContent = "You Win 🎉";

        setTimeout(() => {
            alert("You solved the maze!");
        }, 100);
    }

    draw();
}

// ⌨️ کنترل کیبورد
document.addEventListener("keydown", (e) => {

    if (e.key === "ArrowUp") move(0, -1);
    if (e.key === "ArrowDown") move(0, 1);
    if (e.key === "ArrowLeft") move(-1, 0);
    if (e.key === "ArrowRight") move(1, 0);

});

// 🎮 دکمه‌ها
generateBtn.addEventListener("click", createMaze);
restartBtn.addEventListener("click", createMaze);

// 🌍 برای دکمه‌های HTML (onclick)
window.move = move;

// شروع اولیه
createMaze();