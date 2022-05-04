import { useState } from 'react';
import Cell from './Cell';
import './Board.css';

export default function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.25 }) {
  const [hasWon, setHasWon] = useState(false);
  const [board, setBoard] = useState(createBoard());

  function createBoard() {
    const board = [];

    for (let i = 0; i < nrows; i++) {
      const row = [];

      for (let k = 0; k < ncols; k++) {
        row.push(Math.random() < chanceLightStartsOn);
      }

      board.push(row);
    }

    return board;
  }

  const flipCellsAround = coord => {
    const [y, x] = coord.split('-').map(Number);

    const flipCell = (y, x) => {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    };

    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y - 1, x);
    flipCell(y + 1, x);

    const isWin = board.every(row => row.every(cell => !cell));

    setHasWon(isWin);
    setBoard([...board]);
  };

  const returnCells = () => {
    return board.map((row, rIdx) => {
      return (
        <tr key={rIdx}>
          {row.map((col, cIdx) => {
            const coord = `${rIdx}-${cIdx}`;
            return <Cell isLit={col} key={coord} flipCellsAroundMe={() => flipCellsAround(coord)} />;
          })}
        </tr>
      );
    });
  };

  if (hasWon)
    return (
      <div className="Board-title">
        <div className="neon">You</div>
        <div className="flux">Win</div>
      </div>
    );

  return (
    <div>
      <div className="Board-title">
        <div className="neon">Lights</div>
        <div className="flux">Out</div>
      </div>
      <table className="Board">
        <tbody>{returnCells()}</tbody>
      </table>
    </div>
  );
}
