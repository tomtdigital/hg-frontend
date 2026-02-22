'use client';

import { useAppSelector } from '@/app/redux/hooks';

export default function Preview() {
  const { crosswordData } = useAppSelector((state) => state.createCrossword);
  if (!crosswordData) {
    return <div className='text-red-500'>No crossword data found.</div>;
  }

  const { gridSize, colorScheme, gridData } = crosswordData;

  return (
    <div className='space-y-4 text-black'>
      <h2 className='my-4 text-2xl font-bold'>Crossword Preview</h2>
      <div>
        <span className='font-medium'>Grid Size:</span> {gridSize}
      </div>
      <div>
        <span className='font-medium'>Color Scheme:</span>
        <pre className='mt-1 rounded bg-gray-100 p-2'>
          {JSON.stringify(colorScheme, null, 2)}
        </pre>
      </div>
      <div>
        <h3 className='mt-4 text-lg font-medium'>Across Words</h3>
        <ul className='ml-6 list-disc'>
          {gridData?.across?.map((word, idx) => (
            <li key={idx}>
              <span className='font-bold'>{word.word}</span>: {word.clue}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className='mt-4 text-lg font-medium'>Down Words</h3>
        <ul className='ml-6 list-disc'>
          {gridData?.down?.map((word, idx) => (
            <li key={idx}>
              <span className='font-bold'>{word.word}</span>: {word.clue}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  return <div>Crossword Preview</div>;
}
