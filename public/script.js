let timerDisplay, startButton, square, title;
let timer;
let missedCount = 0;
let reactionTime = 0;
let totalReactionTime = 0;
let reactionCount = 0;
let events = [];

document.addEventListener("DOMContentLoaded", () => {
    timerDisplay = document.getElementById("timer");
    startButton = document.getElementById("startBtn");
    square = document.getElementById("square");
    title = document.getElementById("title");

    startButton.addEventListener("click", startGame);

    function startGame() {
        startButton.style.display = "none";
        title.style.opacity = "0";
        setTimeout(() => {
            title.style.display = "none";
        }, 500);

        square.style.display = "block";

        missedCount = 0;
        totalReactionTime = 0;
        reactionCount = 0;
        events = [];

        let countdown = 60;
        timerDisplay.textContent = countdown;

        let interval = setInterval(() => {
            countdown--;
            timerDisplay.textContent = countdown;

            if (countdown <= 0) {
                clearInterval(interval);
                gameOver();
            }
        }, 1000);

        showSquare();
    }

    function showSquare() {
        let startTime = Date.now();
        square.style.backgroundColor = "#707070";

        let timeToReact = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;

        let changeColorTimeout = setTimeout(() => {
            let newColor = lightenGreyColor("#707070");
            console.log(`Color change to: ${newColor}`);
            square.style.backgroundColor = newColor;

            let reactionTimeout = setTimeout(() => {
                missedCount++;
                events.push({ reacted: false, time: null });
                console.log("Missed reaction!");

                square.style.backgroundColor = "#707070";
                showSquare();
            }, Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000);

            function handleReaction() {
                clearTimeout(reactionTimeout);
                let reactionDuration = (Date.now() - startTime) / 1000;
                totalReactionTime += reactionDuration;
                reactionCount++;
                events.push({ reacted: true, time: reactionDuration });

                console.log(`Reacted in ${reactionDuration.toFixed(3)} seconds`);
                square.style.backgroundColor = "#707070";
                showSquare();
            }

            square.addEventListener("click", handleReaction, { once: true });
            window.addEventListener("keydown", function (e) {
                if (e.key === " ") {
                    handleReaction();
                }
            }, { once: true });
        }, timeToReact);
    }

    function lightenGreyColor(currentColor) {
        let rgb = currentColor.match(/\d+/g).map(Number);
        let lightenedGrey = rgb.map(c => Math.min(c + 30, 255));
        return `rgb(${lightenedGrey.join(", ")})`;
    }

    function gameOver() {
        let avgReactionTime = reactionCount > 0 ? (totalReactionTime / reactionCount).toFixed(3) : 0;
        alert(
            `Game Over!\nTotal Misses: ${missedCount}\nAverage Reaction Time: ${avgReactionTime} seconds\nEvents:\n${events
                .map((event, index) => `Event ${index + 1}: ${event.reacted ? `Reacted in ${event.time.toFixed(3)} seconds` : "Missed"}`)
                .join("\n")}`
        );

        square.style.display = "none";
        startButton.style.display = "block";
        title.style.display = "block";
        title.style.opacity = "1";
    }
});
