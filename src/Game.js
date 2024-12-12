// src/Game.js
import React, { useState } from 'react';
import Board from './Board';

const BOARD_SIZE = 15;

function Game() {
  const [history, setHistory] = useState([Array(BOARD_SIZE * BOARD_SIZE).fill(null)]);
  const [currentStep, setCurrentStep] = useState(0);
  const currentSquares = history[currentStep];

  const handleClick = (i) => {
    const newHistory = history.slice(0, currentStep + 1);
    const squares = [...currentSquares];
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = currentStep % 2 === 0 ? 'X' : 'O';
    setHistory([...newHistory, squares]);
    setCurrentStep(newHistory.length);
  };

  const jumpTo = (step) => {
    setCurrentStep(step);
  };

  const winner = calculateWinner(currentSquares);
  const status = winner ? `Winner: ${winner}` : `Next player: ${currentStep % 2 === 0 ? 'X' : 'O'}`;

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const directions = [
    { dx: 1, dy: 0 }, // 水平
    { dx: 0, dy: 1 }, // 垂直
    { dx: 1, dy: 1 }, // 对角线
    { dx: 1, dy: -1 } // 反对角线
  ];

  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const current = squares[y * BOARD_SIZE + x];
      if (current === null) continue;

      for (const direction of directions) {
        let dx = direction.dx;
        let dy = direction.dy;
        let count = 1;

        for (let i = 1; i < 5; i++) {
          const nextX = x + dx * i;
          const nextY = y + dy * i;
          if (nextX < 0 || nextX >= BOARD_SIZE || nextY < 0 || nextY >= BOARD_SIZE) break;
          if (squares[nextY * BOARD_SIZE + nextX] === current) {
            count++;
          } else {
            break;
          }
        }

        if (count === 5) {
          return current;
        }
      }
    }
  }

  return null;
}

export default Game;