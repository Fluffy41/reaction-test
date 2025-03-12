let timer;
let startButton;
let square;
let timerDisplay;
let missedCount = 0;
let reactionTime = 0;
let totalReactionTime = 0;
let reactionCount = 0;
let events = [];

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  timerDisplay = document.getElementById('timer');
  startButton = document.getElementById('startBtn');
  square = document.getElementById('square');

  startButton.addEventListener('click', startGame);

  // Start game when the Start button is clicked
  function startGame() {
    startButton.disabled = true;
    missedCount = 0;
    totalReactionTime = 0;
    reactionCount = 0;
    events = [];

    // Reset Timer and Square
    square.style.backgroundColor = 'rgb(50, 50, 50)'; // Start with dark grey
    square.style.display = 'none'; // Invisible square

    // Start the countdown (1 minute)
    let countdown = 60;
    timerDisplay.textContent = formatTime(countdown);

    let interval = setInterval(() => {
      countdown--;
      timerDisplay.textContent = formatTime(countdown);

      if (countdown <= 0) {
        clearInterval(interval);
        gameOver();
      }
    }, 1000);

    showSquare();
  }

  // Show the square with a random color change
  function showSquare() {
    let startTime = Date.now();
    square.style.display = 'block'; // Make square visible

    // Set random time interval between 1 and 10 seconds to change color
    let timeToReact = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000; 

    // Change color randomly after timeToReact milliseconds
    let changeColorTimeout = setTimeout(() => {
      let newColor = getRandomColor();
      square.style.backgroundColor = newColor;

      // Set a timer for the user to react (1-2 seconds to click or press space)
      let reactionTimeout = setTimeout(() => {
        // Missed the reaction (time expired)
        missedCount++;
        events.push({ reacted: false, time: null });
        square.style.display = 'none';

        showSquare(); // Continue the game
      }, Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000); // Wait for 1-2 seconds for reaction

      // Handle reactions: click or space key
      function handleReaction() {
        clearTimeout(reactionTimeout); // Stop the timeout if reaction happens

        let reactionDuration = (Date.now() - startTime) / 1000; // Time taken to react
        totalReactionTime += reactionDuration;
        reactionCount++;
        events.push({ reacted: true, time: reactionDuration });

        square.style.display = 'none'; // Hide square again

        showSquare(); // Continue the game
      }

      square.addEventListener('click', handleReaction); // Click reaction
      window.addEventListener('keydown', function (e) {
        if (e.key === " " && !reactionStarted) {
          handleReaction();
        }
      });

    }, timeToReact);
  }

  // Helper to get a random grey color
  function getRandomColor() {
    let greyValue = Math.floor(Math.random() * 50) + 100; // Random grey shade
    return `rgb(${greyValue}, ${greyValue}, ${greyValue})`;
  }

  // Helper to format time for the timer
  function formatTime(seconds) {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  }

  // End game and show stats
  function gameOver() {
    let avgReactionTime = reactionCount > 0 ? (totalReactionTime / reactionCount).toFixed(3) : 0;
    alert(`Game Over! \nTotal Misses: ${missedCount} \nAverage Reaction Time: ${avgReactionTime} seconds\nEvents:\n${events.map((event, index) => `Event ${index + 1}: ${event.reacted ? `Reacted in ${event.time.toFixed(3)} seconds` : 'Missed'}`).join('\n')}`);
    startButton.disabled = false; // Re-enable the start button
  }
});
