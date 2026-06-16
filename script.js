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
                    window.location.href =
                        "games/snake/snake.html";
                    break;

                case "Flappy Bird":
                    window.location.href =
                        "games/flappybird/flappybird.html";
                    break;

                case "Racing":
                    alert("Racing is coming soon...");
                    break;

                case "Space Shooter":
                    alert("Space Shooter is coming soon...");
                    break;

                case "Breakout":
                    alert("Breakout is coming soon...");
                    break;

                case "Runner":
                    alert("Runner is coming soon...");
                    break;

                case "Memory Match":
                    alert("Memory Match is coming soon...");
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