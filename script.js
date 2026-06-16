document.addEventListener("DOMContentLoaded", () => {

    const playBtn = document.getElementById("playNowBtn");

    if (playBtn) {
        playBtn.addEventListener("click", () => {

            const gamesSection = document.querySelector(".games-section");

            if (gamesSection) {
                gamesSection.scrollIntoView({
                    behavior: "smooth"
                });
            }

        });
    }

    const gameCards = document.querySelectorAll(".game-card");

    gameCards.forEach(card => {

        card.addEventListener("click", () => {

            const gameName = card.querySelector("h3").textContent;

            alert(
                `${gameName}\n\nThis game page will be connected in the next steps.`
            );

        });

    });

});

console.log("AI Arcade Loaded Successfully");