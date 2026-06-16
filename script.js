document.addEventListener("DOMContentLoaded", () => {

    const playBtn = document.getElementById("playNowBtn");

    if (playBtn) {
        playBtn.addEventListener("click", () => {
            document.querySelector(".games-section").scrollIntoView({
                behavior: "smooth"
            });
        });
    }

    const gameCards = document.querySelectorAll(".game-card");

    gameCards.forEach(card => {

        const gameName = card.querySelector("h3").textContent;

        card.addEventListener("click", () => {

            switch (gameName) {

                case "Snake AI":
                    window.location.href = "games/snake/snake.html";
                    break;

                case "Flappy Bird":
                    window.location.href = "games/flappybird/flappybird.html";
                    break;

                case "Racing":
                    window.location.href = "games/racing/racing.html";
                    break;

                case "Space Shooter":
                    window.location.href = "games/spaceshooter/spaceshooter.html";
                    break;

                case "Breakout":
                    window.location.href = "games/breakout/breakout.html";
                    break;

                case "Runner":
                    window.location.href = "games/runner/runner.html";
                    break;

                case "Memory Match":
                    window.location.href = "games/memory/memory.html";
                    break;

                case "Asteroid Dodge":
                    alert("Asteroid Dodge is coming soon...");
                    break;

                case "Aim Trainer":
                    alert("Aim Trainer is coming soon...");
                    break;

                case "AI Maze":
                    alert("AI Maze is coming soon...");
                    break;

                default:
                    alert(gameName);
            }

        });

    });

});