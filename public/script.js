let timer;
let square;
let startButton;
let timerDisplay;
let reactionTime = 0;
let missedCount = 0;
let totalReactionTime = 0;
let reactionCount = 0;
let events = [];

document.addEventListener('DOMContentLoaded', () => {
  timer = document.getElementById('timer');
  square = document.getElementById('square');
  startButton = document.getElementById('startBtn');
  timerDisplay = document.getElementById('timer');

  startButton.addEventListener('click', startGame);

  function startGame() {
    startButton.disabled = true;
    reactionTime = 0;
    missedCount = 0;
    totalReactionTime = 0;
    reactionCount = 0;
    events = [];
    
    square.style.display = 'none';
    timerDisplay.textContent = '01:00';

    let countdown = 60;
    timerDisplay.textContent = formatTime(countdown);

    // Start the 1-minute countdown
    let interval = setInterval(() => {
      countdown--;
      timerDisplay.textContent = formatTime(countdown);

      if (countdown <= 0) {
        clearInterval(interval);
        showSquare();
      }
    }, 1000);
  }

  function showSquare() {
    square.style.display = 'block';
    let timeToChange = getRandomTime();
    let startTime = Date.now();

    // Change the color of the square every 15-300 seconds
    let changeInterval = setInterval(() => {
      if (Date.now() - startTime >= timeToChange) {
        square.style.backgroundColor = lightenGrey(square.style.backgroundColor);
        timeToChange = getRandomTime();
      }
    }, 1000);

    // Wait for the reaction within 1-2 seconds
    let reactionStarted = false;
    let reactionTimer = setTimeout(() => {
      if (!reactionStarted) {
        missedCount++;
        events.push({ reacted: false, time: null });
        square.style.display = 'none';
        if (reactionCount === 5) { // After 5 events, stop the game
          endGame();
        } else {
          showSquare(); // Show next square
        }
      }
    }, Math.floor(Math.random() * 1000) + 1000); // Between 1 and 2 seconds

    square.addEventListener('click', recordReaction);
    window.addEventListener('keydown', function (e) {
      if (e.key === " " && !reactionStarted) {
        recordReaction();
      }
    });

    function recordReaction() {
      if (reactionStarted) return;
      reactionStarted = true;
      clearTimeout(reactionTimer);
      clearInterval(changeInterval);
      let reactionDuration = (Date.now() - startTime) / 1000;
      totalReactionTime += reactionDuration;
      reactionCount++;
      events.push({ reacted: true, time: reactionDuration });

      square.style.display = 'none';

      if (reactionCount === 5) { // After 5 events, stop the game
        endGame();
      } else {
        showSquare(); // Show next square
      }
    }
  }

  function getRandomTime() {
    return Math.floor((Math.random() * (300 - 15 + 1)) + 15) * 1000;
  }

  function lightenGrey(color) {
    let greyValue = parseInt(color.slice(4, 7), 10);
    greyValue = Math.min(255, greyValue + 20); // Lighten by 20 units
    return `rgb(${greyValue}, ${greyValue}, ${greyValue})`;
  }

  function formatTime(seconds) {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  }

  function endGame() {
    let avgReactionTime = reactionCount > 0 ? (totalReactionTime / reactionCount).toFixed(3) : 0;
    alert(`Game Over! \nTotal Misses: ${missedCount} \nAverage Reaction Time: ${avgReactionTime} seconds\nEvents:\n${events.map((event, index) => `Event ${index + 1}: ${event.reacted ? `Reacted in ${event.time.toFixed(3)} seconds` : 'Missed'}`).join('\n')}`);
    startButton.disabled = false;
  }
});
