'use client';

import React, { useRef, useState } from 'react';
import { clearCell } from '../utils/clear-cell';
import { getAcrossWordsFromGrid } from '../utils/get-across-words-from-grid';
import { getDownWordsFromGrid } from '../utils/get-down-words-from-grid';
import { getNextIndex } from '../utils/get-next-index';
import { updateCellWithLetter } from '../utils/update-cell-with-letter';

export default function GridCreator({ size = 5 }: { size: number }) {
  const [grid, setGrid] = useState<Cell[]>(
    Array.from({ length: size * size }, () => ({
      letter: '',
      color: 'black',
    }))
  );

  const refs = useRef<React.RefObject<HTMLDivElement>[]>([]);
  if (refs.current.length !== size * size) {
    refs.current = Array.from({ length: size * size }, () =>
      React.createRef<HTMLDivElement>()
    );
  }

  const handleKey = (index: number, e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const key = e.key.toUpperCase();

    if (/^[A-Z]$/.test(key)) {
      setGrid(updateCellWithLetter(index, key));
      return;
    }

    if (e.key === 'Backspace' || e.key === 'Delete') {
      setGrid(clearCell(index));
      return;
    }

    const nextIndex = getNextIndex(index, e.key, size);
    if (nextIndex !== index) {
      refs.current[nextIndex]?.current?.focus();
    }
  };

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${size}, 60px)`,
          gap: 8,
          marginBottom: 20,
        }}
      >
        {grid.map((cell, i) => (
          <div
            key={i}
            ref={refs.current[i]}
            tabIndex={0}
            onKeyDown={(e) => handleKey(i, e)}
            onClick={() => refs.current[i]?.current?.focus()}
            className={`flex h-[60px] w-[60px] items-center justify-center border-2 ${cell.color === 'black' ? 'bg-black text-white' : 'bg-white text-black'} cursor-pointer select-none text-2xl font-bold focus:border-4 focus:border-blue-500 focus:outline-none`}
          >
            {cell.letter}
          </div>
        ))}
      </div>
      <button
        onClick={() =>
          alert(
            `Across: ${JSON.stringify(getAcrossWordsFromGrid(grid, size))}\nDown: ${JSON.stringify(getDownWordsFromGrid(grid, size))}`
          )
        }
      >
        Show Words
      </button>
    </>
  );
}
