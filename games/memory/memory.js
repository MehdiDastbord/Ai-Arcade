const gameBoard = document.getElementById("gameBoard");
const movesElement = document.getElementById("moves");
const restartBtn = document.getElementById("restartBtn");

const emojis = [
    "🚀","🚀",
    "🐍","🐍",
    "🐦","🐦",
    "🏎️","🏎️",
    "⭐","⭐",
    "🎮","🎮",
    "🔥","🔥",
    "👑","👑"
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;

function shuffle(array) {

    for(let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(
            Math.random() * (i + 1)
        );

        [array[i], array[j]] =
        [array[j], array[i]];
    }

    return array;
}

function createBoard() {

    gameBoard.innerHTML = "";

    const shuffled =
        shuffle([...emojis]);

    shuffled.forEach(emoji => {

        const card =
            document.createElement("div");

        card.classList.add("card");

        card.dataset.emoji = emoji;

        card.textContent = "❓";

        card.addEventListener(
            "click",
            flipCard
        );

        gameBoard.appendChild(card);

    });

    moves = 0;
    movesElement.textContent = moves;

    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function flipCard() {

    if(lockBoard) return;

    if(this === firstCard) return;

    if(
        this.classList.contains("matched")
    ) return;

    this.textContent =
        this.dataset.emoji;

    this.classList.add("flipped");

    if(!firstCard) {

        firstCard = this;
        return;

    }

    secondCard = this;

    moves++;
    movesElement.textContent = moves;

    checkMatch();
}

function checkMatch() {

    const matched =
        firstCard.dataset.emoji ===
        secondCard.dataset.emoji;

    if(matched) {

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        resetTurn();

        checkWin();

    } else {

        lockBoard = true;

        setTimeout(() => {

            firstCard.textContent = "❓";
            secondCard.textContent = "❓";

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            resetTurn();

        }, 800);

    }
}

function resetTurn() {

    [firstCard, secondCard] =
    [null, null];

    lockBoard = false;
}

function checkWin() {

    const matchedCards =
        document.querySelectorAll(
            ".matched"
        );

    if(matchedCards.length === 16) {

        setTimeout(() => {

            alert(
                `You Win!\n\nMoves: ${moves}`
            );

        }, 200);

    }
}

restartBtn.addEventListener(
    "click",
    createBoard
);

createBoard();