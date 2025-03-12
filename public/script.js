let timer;
let square;
let startButton;
let testButton;
let timerDisplay;
let reactionTime = 0;
let interval;
let testMode = false;

document.addEventListener('DOMContentLoaded', () => {
  timer = document.getElementById('timer');
  square = document.getElementById('square');
  startButton = document.getElementById('startBtn');
  testButton = document.getElementById('testBtn');
  timerDisplay = document.getElementById('timer');

  startButton.addEventListener('click', startGame);
  testButton.addEventListener('click', toggleTestMode);

  // Initialize the game to be in test mode for faster testing
  function toggleTestMode() {
    testMode = !testMode;
    testButton.textContent = testMode ? "Disable Test Mode" : "Test Mode";
  }

  function startGame() {
    startButton.disabled = true;
    reactionTime = 0;
    square.style.display = 'none';
    timerDisplay.textContent = '00:00';

    let randomTime = getRandomTime();
    let countdown = randomTime / 1000;
    timerDisplay.textContent = formatTime(countdown);
    
    // Start the countdown
    interval = setInterval(() => {
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

    // Wait for a click or space to stop the reaction time
    let reactionStarted = false;
    square.addEventListener('click', recordReaction);
    window.addEventListener('keydown', function (e) {
      if (e.key === " " && !reactionStarted) {
        recordReaction();
      }
    });

    function recordReaction() {
      if (reactionStarted) return;
      reactionStarted = true;
      clearInterval(changeInterval);
      square.style.display = 'none';
      let reactionDuration = (Date.now() - startTime) / 1000;
      alert(`Your reaction time: ${reactionDuration.toFixed(3)} seconds`);
      startButton.disabled = false;
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
});
