'use client';

import { useAppDispatch } from '@/app/redux/hooks';
import {
  setGridValues,
  setStep,
} from '@/app/redux/slices/create-crossword-slice';
import React, { useEffect, useRef, useState } from 'react';
import { clearCell } from './utils/clear-cell';
import { getNextIndex } from './utils/get-next-index';
import { updateCellWithLetter } from './utils/update-cell-with-letter';

export default function GridPopulator({
  gridSize,
  initialValues,
  colorScheme,
}: {
  gridSize: number;
  initialValues?: Cell[];
  colorScheme?: ColorScheme;
}) {
  const defaultGrid: Cell[] = Array.from(
    { length: gridSize * gridSize },
    () => ({
      letter: '',
      color: 'black',
    })
  );
  const dispatch = useAppDispatch();
  const refs = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const [grid, setGrid] = useState<Cell[]>(
    initialValues?.length ? initialValues : defaultGrid
  );

  // Initialize refs array
  useEffect(() => {
    if (refs.current.length !== gridSize * gridSize) {
      refs.current = Array.from({ length: gridSize * gridSize }, () =>
        React.createRef<HTMLDivElement>()
      );
    }
  }, [gridSize]);

  // Update grid when initialValues change
  useEffect(() => {
    if (initialValues?.length) {
      setGrid(initialValues);
    }
  }, [initialValues]);

  // Reset grid when gridSize changes
  useEffect(() => {
    setGrid(defaultGrid);
  }, [gridSize]);

  const handleKey = (index: number, e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Tab') return;
    e.preventDefault();
    const key = e.key.toUpperCase();
    dispatch(setStep(1));

    if (/^[A-Z]$/.test(key)) {
      setGrid(updateCellWithLetter(index, key));
      return;
    }

    if (e.key === 'Backspace' || e.key === 'Delete') {
      setGrid(clearCell(index));
      return;
    }

    const nextIndex = getNextIndex(index, e.key, gridSize);
    if (nextIndex !== index) {
      refs.current[nextIndex]?.current?.focus();
    }
  };

  return (
    <>
      <h2 className='my-4 text-2xl font-bold'>Crossword Grid</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 60px)`,
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
        onClick={() => {
          dispatch(setGridValues(grid));
          dispatch(setStep(2));
        }}
      >
        Submit
      </button>
    </>
  );
}
