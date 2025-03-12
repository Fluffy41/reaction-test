let timer;
let timerTime = 30 * 60; // 30 minutes in seconds
let startButton = document.getElementById("startButton");
let timerDisplay = document.getElementById("timer");
let square = document.getElementById("square");
let lastChangeTime = 0;

let isRunning = false;
let lastChange = 0;
let changeTimeout;

const startTimer = () => {
    isRunning = true;
    startButton.style.display = "none"; // Hide the button after click
    square.style.display = "block"; // Show the square
    let interval = setInterval(() => {
        if (timerTime <= 0) {
            clearInterval(interval);
            alert("Time's up!");
            return;
        }
        timerTime--;
        let minutes = Math.floor(timerTime / 60);
        let seconds = timerTime % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }, 1000);

    // Start the square color change loop
    changeSquareColor();
};

const changeSquareColor = () => {
    // Randomize the time until the next change (between 15 and 300 seconds)
    let changeIn = Math.floor(Math.random() * (300 - 15 + 1) + 15);
    lastChangeTime = Date.now();
    changeTimeout = setTimeout(() => {
        if (isRunning) {
            // Randomize the grey shade
            let greyShade = Math.floor(Math.random() * 256);
            square.style.backgroundColor = `rgb(${greyShade}, ${greyShade}, ${greyShade})`;
            playTone();
            changeSquareColor();
        }
    }, changeIn * 1000);
};

const playTone = () => {
    // Play a simple beep sound on color change
    let audio = new Audio('https://www.soundjay.com/button/beep-07.wav');
    audio.play();
};

const onReaction = (event) => {
    if (event.type === 'click' || (event.type === 'keydown' && event.key === ' ')) {
        // Check if the square was clicked within the 1-2 second window
        let timeDiff = (Date.now() - lastChangeTime) / 1000;
        if (timeDiff <= 2) {
            console.log("Good reaction!");
            square.classList.add('clicked');
            setTimeout(() => square.classList.remove('clicked'), 300);
            square.style.backgroundColor = '#4caf50'; // Reset to default green color
        } else {
            console.log("Too slow!");
        }
    }
};

startButton.addEventListener('click', startTimer);
square.addEventListener('click', onReaction);
document.addEventListener('keydown', onReaction);
