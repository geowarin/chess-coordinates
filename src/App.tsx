import "./App.css";
import { useState } from "react";
import { playClickSound } from "./playClickSound.ts";

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

export function App() {
  const [clickedSquares, setClickedSquares] = useState<Set<string>>(new Set());

  const handleSquareClick = (square: string) => {
    playClickSound();
    setClickedSquares((prev) => new Set(prev).add(square));

    // Remove the animation class after animation completes
    setTimeout(() => {
      setClickedSquares((prev) => {
        const newSet = new Set(prev);
        newSet.delete(square);
        return newSet;
      });
    }, 600); // Match animation duration
  };

  return (
    <div className="grid-container">
      {ranks.map((rank, rankIndex) =>
        files.map((file, fileIndex) => {
          const square = `${file}${rank}`;
          const isLight = (rankIndex + fileIndex) % 2 === 0;
          const isClicked = clickedSquares.has(square);

          return (
            <div
              className={`square ${isLight ? "light" : "dark"} ${isClicked ? "clicked" : ""}`}
              key={square}
              onClick={() => handleSquareClick(square)}
            >
              {square}
            </div>
          );
        }),
      )}
    </div>
  );
}

function pickRandom(array: string[]): string {
  return array[Math.floor(Math.random() * array.length)];
}

function randomSquare(): [string, string] {
  const file = pickRandom(files);
  const rank = pickRandom(ranks.map(String));
  return [file, rank];
}
