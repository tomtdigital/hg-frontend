'use client';

import { useAppSelector } from '@/app/redux/hooks';
import { useCallback } from 'react';
import CrosswordGrid from './crossword-grid';

export default function Preview() {
  const { crosswordData } = useAppSelector((state) => state.createCrossword);

  const handleComplete = useCallback(() => {
    console.log('All clues completed!');
    // Add your callback logic here
  }, []);

  if (!crosswordData) {
    return <div className='text-red-500'>No crossword data found.</div>;
  }

  const { gridSize, colorScheme, gridData } = crosswordData;

  return (
    <div className='space-y-4 text-white'>
      <CrosswordGrid
        gridSize={gridSize}
        gridData={gridData}
        colorScheme={colorScheme}
        onComplete={handleComplete}
      />
    </div>
  );
}
