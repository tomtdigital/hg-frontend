'use client';

import React, { useRef, useState } from 'react';
import { getAcrossWordsFromGrid } from '../utils/get-across-words-from-grid';
import { getDownWordsFromGrid } from '../utils/get-down-words-from-grid';

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

    // A–Z input: set letter, make tile white (and keep it white)
    if (/^[A-Z]$/.test(key)) {
      setGrid((prev) => {
        const updated = [...prev];
        updated[index] = {
          letter: key,
          color: 'white',
        };
        return updated;
      });
      return; // don't also move with arrows on same keypress
    }

    // Delete / Backspace: clear letter, reset to black
    if (e.key === 'Backspace' || e.key === 'Delete') {
      setGrid((prev) => {
        const updated = [...prev];
        updated[index] = {
          letter: '',
          color: 'black',
        };
        return updated;
      });
      return;
    }

    // Arrow navigation
    const row = Math.floor(index / size);
    const col = index % size;
    let nextIndex = index;

    switch (e.key) {
      case 'ArrowRight':
        if (col < size - 1) nextIndex = index + 1;
        break;
      case 'ArrowLeft':
        if (col > 0) nextIndex = index - 1;
        break;
      case 'ArrowDown':
        if (row < size - 1) nextIndex = index + size;
        break;
      case 'ArrowUp':
        if (row > 0) nextIndex = index - size;
        break;
      default:
        break;
    }

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
      <pre style={{ fontSize: 14 }}>{JSON.stringify(grid, null, 2)}</pre>
    </>
  );
}
