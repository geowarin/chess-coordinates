import "./App.css";
import { useCallback, useState } from "react";
import { playBuzzerSound, playClickSound } from "./playClickSound";

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

function pickRandom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomSquare(): string {
  const file = pickRandom(files);
  const rank = pickRandom(ranks);
  const square = `${file}${rank}`;
  console.log(square);
  return square;
}

export function App() {
  const [clickedSquares, setClickedSquares] = useState<Set<string>>(new Set());
  const [wrongSquares, setWrongSquares] = useState<Set<string>>(new Set());
  const [targetSquare, setTargetSquare] = useState<string>(() =>
    randomSquare(),
  );

  const handleSquareClick = useCallback(
    (square: string) => {
      const isCorrect = square === targetSquare;

      if (isCorrect) {
        // Correct answer - play click sound and show success animation
        playClickSound();
        setClickedSquares((prev) => new Set(prev).add(square));

        // Remove animation after completion
        setTimeout(() => {
          setClickedSquares((prev) => {
            const newSet = new Set(prev);
            newSet.delete(square);
            return newSet;
          });
        }, 600);
      } else {
        // Wrong answer - play buzzer and show error animation
        playBuzzerSound();
        setWrongSquares((prev) => new Set(prev).add(square));

        // Remove animation after completion
        setTimeout(() => {
          setWrongSquares((prev) => {
            const newSet = new Set(prev);
            newSet.delete(square);
            return newSet;
          });
        }, 600);
      }

      // Pick new target square after a short delay
      setTimeout(() => {
        setTargetSquare(randomSquare());
      }, 100);
    },
    [targetSquare],
  );

  return (
    <div>
      <div className="target-display">{targetSquare.toUpperCase()}</div>
      <div className="grid-container">
        {ranks.map((rank, rankIndex) =>
          files.map((file, fileIndex) => {
            const square = `${file}${rank}`;
            const isLight = (rankIndex + fileIndex) % 2 === 0;
            const isClicked = clickedSquares.has(square);
            const isWrong = wrongSquares.has(square);

            return (
              <div
                className={`square ${isLight ? "light" : "dark"} ${
                  isClicked ? "clicked" : ""
                } ${isWrong ? "wrong" : ""}`}
                key={square}
                onClick={() => handleSquareClick(square)}
              ></div>
            );
          }),
        )}
      </div>
    </div>
  );
}
