let timer;
let startButton;
let square;
let timerDisplay;
let missedCount = 0;
let totalReactionTime = 0;
let reactionCount = 0;
let events = [];
let reactionStarted = false;
let reactionStartTime = 0;
let elementsToHide;

document.addEventListener('DOMContentLoaded', () => {
  timerDisplay = document.getElementById('timer');
  startButton = document.getElementById('startBtn');
  square = document.getElementById('square');
  title = document.querySelector('h1');
  elementsToHide = document.querySelectorAll('.hide-on-start'); // Select all elements that should hide

  startButton.addEventListener('click', startGame);

  function startGame() {
    startButton.disabled = true;
    missedCount = 0;
    totalReactionTime = 0;
    reactionCount = 0;
    events = [];
    reactionStarted = false;

    // Hide elements except the square
    elementsToHide.forEach(element => element.classList.add('hidden'));
	
	// Hide title and button
    title.classList.add('hidden');
    startButton.classList.add('hidden');

    square.style.display = 'block';
    square.style.backgroundColor = '#ffffff';

    let countdown = 1800;
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

  function showSquare() {
    if (!reactionStarted) {
      let timeToReact = Math.floor(Math.random() * (210000 - 15000 + 1)) + 15;

      console.log(`Waiting ${timeToReact / 1000} seconds before changing color...`);

      setTimeout(() => {
        let newColor = 'rgb(165, 165, 165)';
        console.log(`Color changed to: ${newColor}`);
        square.style.backgroundColor = newColor;
        reactionStarted = true;
        reactionStartTime = Date.now();

        let reactionTimeout = setTimeout(() => {
          missedCount++;
          events.push({ reacted: false, time: null });
          console.log("Missed reaction!");
          resetSquare();
        }, Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000);

        function handleReaction() {
          if (!reactionStarted) return;
          clearTimeout(reactionTimeout);
          let reactionDuration = (Date.now() - reactionStartTime) / 1000;
          totalReactionTime += reactionDuration;
          reactionCount++;
          events.push({ reacted: true, time: reactionDuration });

          console.log(`Reacted in ${reactionDuration.toFixed(3)} seconds`);

          resetSquare();
        }

        square.addEventListener('click', handleReaction, { once: true });
        window.addEventListener('keydown', function (e) {
          if (e.key === " " && reactionStarted) {
            handleReaction();
          }
        }, { once: true });

      }, timeToReact);
    }
  }

  function resetSquare() {
    reactionStarted = false;
    square.style.backgroundColor = 'rgb(218, 218, 218)';
    console.log("Square reset, waiting for next event...");
    setTimeout(showSquare, 1000);
  }

  function formatTime(seconds) {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  }

  function gameOver() {
    let avgReactionTime = reactionCount > 0 ? (totalReactionTime / reactionCount).toFixed(3) : 0;
    alert(`Game Over! \nTotal Misses: ${missedCount} \nAverage Reaction Time: ${avgReactionTime} seconds\nEvents:\n${events.map((event, index) => `Event ${index + 1}: ${event.reacted ? `Reacted in ${event.time.toFixed(3)} seconds` : 'Missed'}`).join('\n')}`);

    startButton.disabled = false;
    
    // Show elements again
    elementsToHide.forEach(element => element.classList.remove('hidden'));
    title.classList.remove('hidden');
    startButton.classList.remove('hidden');

    console.log("Game Over!");
  }
});
