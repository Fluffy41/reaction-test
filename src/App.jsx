import { useState, useEffect } from "react";

export default function ReactionTest() {
  const [reactionTimes, setReactionTimes] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [gameEnd, setGameEnd] = useState(Date.now() + 30 * 60 * 1000);
  const [squareColor, setSquareColor] = useState("rgb(120,120,120)");
  const [message, setMessage] = useState("Wait for the square to change color...");
  const [roundTimeout, setRoundTimeout] = useState(null);

  function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min) * 1000;
  }

  useEffect(() => {
    function startNewRound() {
      if (Date.now() > gameEnd) {
        endGame();
        return;
      }
      let waitTime = getRandomDelay(15, 300);
      setRoundTimeout(
        setTimeout(() => {
          if (Date.now() > gameEnd) return;
          let brightness = 55 + Math.random() * 5;
          setSquareColor(`rgb(${brightness}, ${brightness}, ${brightness})`);
          setStartTime(Date.now());
          setMessage("Click now!");
          setIsActive(true);
          setTimeout(() => {
            setSquareColor("rgb(120, 120, 120)");
            setMessage("Too slow! Wait for the next change...");
            setIsActive(false);
            startNewRound();
          }, getRandomDelay(1, 2));
        }, waitTime)
      );
    }

    startNewRound();

    // Cleanup timeout when component unmounts or game ends
    return () => clearTimeout(roundTimeout);
  }, [gameEnd, roundTimeout]);

  function handleClick() {
    if (isActive && startTime) {
      let reactionTime = Date.now() - startTime;
      setReactionTimes((prev) => [...prev, reactionTime]);
      setMessage(`Reaction time: ${reactionTime}ms`);
      setSquareColor("rgb(120, 120, 120)");
      setIsActive(false);
    }
  }

  function endGame() {
    let avgTime =
      reactionTimes.length > 0
        ? (reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length).toFixed(2)
        : "No reactions recorded";
    setMessage(`Game Over! Average Reaction Time: ${avgTime}ms`);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center">
      <h1 className="text-3xl font-bold mb-6">Reaction Test</h1>
      <div
        className="w-48 h-48 rounded-lg cursor-pointer transition-all transform hover:scale-110"
        style={{ backgroundColor: squareColor }}
        onClick={handleClick}
      />
      <p className="mt-4 text-lg">{message}</p>
      <p className="mt-4 text-xl">Time left: {(gameEnd - Date.now()) / 1000}s</p>
    </div>
  );
}
