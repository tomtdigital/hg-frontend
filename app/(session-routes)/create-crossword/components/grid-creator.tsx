'use client';

import { useAppSelector } from '@/app/redux/hooks';
import GridPopulator from './grid-populator';
import GridDesign from './grid-design';
import GridClues from './grid-clues';

export default function GridCreator() {
  const { step, gridSize, gridValues, colorScheme } = useAppSelector(
    (state) => state.createCrossword
  );

  return (
    <>
      {step >= 0 && <GridDesign />}
      {step >= 1 && (
        <div style={{ marginTop: '20px' }}>
          <GridPopulator
            gridSize={gridSize}
            initialValues={gridValues}
            colorScheme={colorScheme}
          />
        </div>
      )}
      {step >= 2 && (
        <div style={{ marginTop: '20px' }}>
          <GridClues gridValues={gridValues} gridSize={gridSize} />
        </div>
      )}
    </>
  );
}
