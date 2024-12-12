// src/Board.js
import React from 'react';
import Square from './Square';

const BOARD_SIZE = 15;

function Board({ squares, onClick }) {
  const renderSquare = (i) => {
    return (
      <Square value={squares[i]} onClick={() => onClick(i)} />
    );
  };

  const rows = [];
  for (let y = 0; y < BOARD_SIZE; y++) {
    const row = [];
    for (let x = 0; x < BOARD_SIZE; x++) {
      const index = y * BOARD_SIZE + x;
      row.push(renderSquare(index));
    }
    rows.push(<div key={y} className="board-row">{row}</div>);
  }

  return <div>{rows}</div>;
}

export default Board;