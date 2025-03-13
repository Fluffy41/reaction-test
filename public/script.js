let startButton;
let square;
let timerDisplay;
let missedCount = 0;
let totalReactionTime = 0;
let reactionCount = 0;
let events = [];
let reactionStarted = false;
let reactionStartTime = 0;
let scoreDisplay;
let testInProgress = false; // New flag to track test state

document.addEventListener('DOMContentLoaded', () => {
  timerDisplay = document.getElementById('timer');
  startButton = document.getElementById('startBtn');
  square = document.getElementById('square');
  title = document.querySelector('h1');
  scoreDisplay = document.getElementById('score');

  startButton.addEventListener('click', startGame);

  function startGame() {
    startButton.disabled = true;
    missedCount = 0;
    totalReactionTime = 0;
    reactionCount = 0;
    events = [];
    reactionStarted = false;
    testInProgress = true; // Set flag to true

    // Hide title and button
    title.classList.add('hidden');
    startButton.classList.add('hidden');

    square.style.display = 'block';
    square.style.backgroundColor = '#ffffff';

    let countdown = 1800; // 30 minutes
    //let countdown = 10 // 10 seconds
    timerDisplay.textContent = formatTime(countdown);

    let interval = setInterval(() => {
      countdown--;
      timerDisplay.textContent = formatTime(countdown);

      if (countdown <= 0) {
        clearInterval(interval);
        testComplete();
      }
    }, 1000);

    showSquare();
  }

  let reactionInProgress = false;

  function showSquare() {
    if (!reactionStarted && !reactionInProgress && testInProgress) { // Check flag before starting new event
      reactionInProgress = true;
      let timeToReact = Math.floor(Math.random() * (210000 - 15000 + 1)) + 1000; // 210 - 15 seconds
      //let timeToReact = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000; // 1 - 5 seconds

      console.log(`Waiting ${timeToReact / 1000} seconds before changing color...`);

      square.classList.add('blinking-border'); // Start blinking

      setTimeout(() => {
        if (!testInProgress) return; // Check flag before changing color
        let newColor = 'rgb(165, 165, 165)';
        console.log(`Color changed to: ${newColor}`);
        square.style.backgroundColor = newColor;
        square.classList.remove('blinking-border'); // Stop blinking
        reactionStarted = true;
        reactionStartTime = Date.now();

        let reactionTimeout = setTimeout(() => {
          if (!testInProgress) return; // Check flag before handling missed reaction
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

        function handleKeydown(e) {
          if (e.key === " " && reactionStarted) {
            handleReaction();
            window.removeEventListener('keydown', handleKeydown);
          }
        }

        window.addEventListener('keydown', handleKeydown, { once: true });

      }, timeToReact);
    }
  }

  function resetSquare() {
    reactionStarted = false;
    reactionInProgress = false;
    square.style.backgroundColor = '#ffffff';
    console.log("Square reset, waiting for next event...");
    showSquare();
  }

  function formatTime(seconds) {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  }

  function testComplete() {
    testInProgress = false; // Reset flag to false
    let avgReactionTime = reactionCount > 0 ? (totalReactionTime / reactionCount).toFixed(3) : 0;
    scoreDisplay.innerHTML = `
    <span>Test Complete!</span><br>
    <span>Total Misses: ${missedCount}</span><br>
    <span>Average Reaction Time: ${avgReactionTime} seconds</span><br> 
    <table class="events-table">
      <thead>
        <tr>
          <th>Event</th>
          <th>Reaction Time (seconds)</th>
        </tr>
      </thead>
      <tbody>
        ${events.map((event, index) => `
          <tr>
            <td>Event ${index + 1}</td>
            <td>${event.reacted ? event.time.toFixed(3) : 'Missed'}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

    scoreDisplay.style.display = 'block'; // Make the score visible

    startButton.disabled = false;

    // Show elements again
    title.classList.remove('hidden');
    startButton.classList.remove('hidden');

    // Reset and hide the square
    square.style.display = 'none';
    square.classList.remove('blinking-border');
    square.style.backgroundColor = '#ffffff';

    console.log("Test Complete!");
  }
});