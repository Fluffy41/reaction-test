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

<<<<<<< HEAD
        square.style.display = "block";
=======
    square.style.backgroundColor = 'rgb(50, 50, 50)';
    square.style.display = 'none';
>>>>>>> parent of b3c8779 (Update script.js)

        missedCount = 0;
        totalReactionTime = 0;
        reactionCount = 0;
        events = [];

        let countdown = 60;
        timerDisplay.textContent = countdown;

        let interval = setInterval(() => {
            countdown--;
            timerDisplay.textContent = countdown;

<<<<<<< HEAD
            if (countdown <= 0) {
                clearInterval(interval);
                gameOver();
            }
        }, 1000);

        showSquare();
=======
    showSquare(); // Start the game loop
  }

  function showSquare() {
    if (!reactionStarted) {
      square.style.display = 'block';

      let timeToReact = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;

      let changeColorTimeout = setTimeout(() => {
        let newColor = lightenGreyColor('rgb(50, 50, 50)');
        square.style.backgroundColor = newColor;
        reactionStarted = true;
        reactionStartTime = Date.now();

        let reactionTimeout = setTimeout(() => {
          missedCount++;
          events.push({ reacted: false, time: null });
          resetSquare();
        }, Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000);

        function handleReaction() {
          if (!reactionStarted) return;
          clearTimeout(reactionTimeout);
          let reactionDuration = (Date.now() - reactionStartTime) / 1000;
          totalReactionTime += reactionDuration;
          reactionCount++;
          events.push({ reacted: true, time: reactionDuration });

          resetSquare();
        }

        square.addEventListener('click', handleReaction, { once: true });
        window.addEventListener('keydown', function (e) {
          if (e.key === " " && reactionStarted) {
            handleReaction();
          }
        }, { once: true });

      }, timeToReact);
>>>>>>> parent of b3c8779 (Update script.js)
    }

<<<<<<< HEAD
    function showSquare() {
        let startTime = Date.now();
        square.style.backgroundColor = "#707070";
=======
  function resetSquare() {
    reactionStarted = false;
    square.style.backgroundColor = 'rgb(50, 50, 50)';
    square.style.display = 'none';
    setTimeout(showSquare, 1000); // Start the next round after 1 second
  }
>>>>>>> parent of b3c8779 (Update script.js)

        let timeToReact = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;

        let changeColorTimeout = setTimeout(() => {
            let newColor = lightenGreyColor("#707070");
            console.log(`Color change to: ${newColor}`);
            square.style.backgroundColor = newColor;

<<<<<<< HEAD
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
=======
  function gameOver() {
    let avgReactionTime = reactionCount > 0 ? (totalReactionTime / reactionCount).toFixed(3) : 0;
    alert(`Game Over! \nTotal Misses: ${missedCount} \nAverage Reaction Time: ${avgReactionTime} seconds\nEvents:\n${events.map((event, index) => `Event ${index + 1}: ${event.reacted ? `Reacted in ${event.time.toFixed(3)} seconds` : 'Missed'}`).join('\n')}`);
    startButton.disabled = false;
  }
>>>>>>> parent of b3c8779 (Update script.js)
});
