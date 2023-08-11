import React, { useEffect, useMemo, useState } from 'react';
import BoardLogic from './logic';
import Grid from './Grid';

const GRID_COMBINATION = [
  [2, 1, 2, 1],
  [2, 4, 1, 1],
  [2, 0, 2, 2],
  [2, 4, 2, 2],
];

const Logic2048 = new BoardLogic(GRID_COMBINATION);

export default function Gameboard() {
  const [number, setNumber] = useState(GRID_COMBINATION);
  const score = useMemo(() => Logic2048.getScore(), [number]);

  function checkKeyPress(event) {
    event.preventDefault();

    const left = 'ArrowLeft';
    const right = 'ArrowRight';
    const bottom = 'ArrowDown';
    const top = 'ArrowUp';

    if (![left, right, bottom, top].includes(event.key)) return;

    switch (event.key) {
      case left:
        setNumber(Logic2048.moveToLeft(number));
        break;
      case right:
        setNumber(Logic2048.moveToRight(number));
        break;
      case bottom:
        setNumber(Logic2048.moveToBottom(number));
        break;
      case top:
        setNumber(Logic2048.moveToTop(number));
        break;
      default:
        break;
    }
  }

  function undoMovement() {
    setNumber(Logic2048.undoMovement());
  }
  function redoMovement() {
    setNumber(Logic2048.redoMovement());
  }

  useEffect(() => {
    window.addEventListener('keydown', checkKeyPress);
    return () => window.removeEventListener('keydown', checkKeyPress);
  }, [number]);

  return (
    <div className="w-1/2 flex justify-center items-center flex-col">
      <div className="mb-5 w-[400px] text-center bg-white text-black">Score: {score}</div>
      <div className="grid grid-cols-2 gap-x-10 mb-5">
        <button type="button" className="border rounded-md p-5 bg-white" onClick={undoMovement}>
          Undo Last Move
        </button>
        <button type="button" className="border rounded-md p-5 bg-white" onClick={redoMovement}>
          Redo
        </button>
      </div>
      <Grid data={number} />
    </div>
  );
}
