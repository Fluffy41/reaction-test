let timer = 0;
let timerInterval;
let squareTimeout;
let squareShown = false;

const square = document.getElementById('square');
const startButton = document.getElementById('startButton');
const timerElement = document.getElementById('timer');

function startTest() {
  startButton.disabled = true;
  timer = 0;
  squareShown = false;
  square.style.display = 'none';
  timerElement.textContent = `Time: ${timer}`;

  // Show square after a random delay
  squareTimeout = setTimeout(() => {
    square.style.display = 'block';
    squareShown = true;
    startTimer();
  }, Math.random() * 5000 + 1000);
}

function startTimer() {
  timerInterval = setInterval(() => {
    if (squareShown) {
      timer++;
      timerElement.textContent = `Time: ${timer}`;
    }
  }, 1000);
}

square.addEventListener('click', () => {
  if (squareShown) {
    clearInterval(timerInterval);
    clearTimeout(squareTimeout);
    alert(`You reacted in ${timer} seconds!`);
    startButton.disabled = false;
  }
});

startButton.addEventListener('click', startTest);
