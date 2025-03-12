let timer;
let startButton;
let square;
let timerDisplay;
let title;
let container;
let countdown;
let gameInterval;
let reactionStart;
let score = 0;

document.addEventListener('DOMContentLoaded', () => {
  timerDisplay = document.getElementById('timer');
  startButton = document.getElementById('startBtn');
  square = document.getElementById('square');
  title = document.querySelector('h1');
  container = document.querySelector('.container');

  startButton.addEventListener('click', startGame);
  square.addEventListener('click', handleSquareClick);

  function startGame() {
    // Reset game variables
    score = 0;
    countdown = 30; // 30 seconds countdown
    timerDisplay.textContent = formatTime(countdown);

    // Hide title and button
    title.classList.add('hidden');
    startButton.classList.add('hidden');

    // Show square
    square.style.display = 'block';

    // Start countdown
    timer = setInterval(() => {
      countdown--;
      timerDisplay.textContent = formatTime(countdown);

      if (countdown <= 0) {
        clearInterval(timer);
        gameOver();
      }
    }, 1000);

    // Start moving square
    moveSquare();
  }

  function moveSquare() {
    let randomDelay = Math.floor(Math.random() * 2000) + 500; // 500ms - 2500ms
    gameInterval = setTimeout(() => {
      let maxX = window.innerWidth - square.clientWidth;
      let maxY = window.innerHeight - square.clientHeight;

      let randomX = Math.floor(Math.random() * maxX);
      let randomY = Math.floor(Math.random() * maxY);

      square.style.left = `${randomX}px`;
      square.style.top = `${randomY}px`;

      // Change color to green (ready to be clicked)
      square.style.backgroundColor = "#00b300";

      // Start reaction timer
      reactionStart = performance.now();

      moveSquare();
    }, randomDelay);
  }

  function handleSquareClick() {
    let reactionTime = performance.now() - reactionStart;
    score++;

    // Change color to gray after click
    square.style.backgroundColor = "#707070";

    console.log(`Reaction Time: ${reactionTime.toFixed(2)}ms | Score: ${score}`);
  }

  function formatTime(seconds) {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  }

  function gameOver() {
    clearTimeout(gameInterval);
    alert(`Game Over! Your score: ${score}`);
    
    // Reset UI
    title.classList.remove('hidden');
    startButton.classList.remove('hidden');
    square.style.display = 'none';
  }
});
