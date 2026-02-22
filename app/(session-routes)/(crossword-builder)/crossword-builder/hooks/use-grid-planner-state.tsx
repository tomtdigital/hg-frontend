import { useAppSelector } from '@/app/redux/hooks';
import { createRef, useEffect, useRef, useState } from 'react';
import { clearCell } from '../utils/clear-cell';
import { generateEmptyGrid } from '../utils/generate-empty-grid';
import { getNextIndex } from '../utils/get-next-index';
import { updateCellWithLetter } from '../utils/update-cell-with-letter';
import { resetGridRefs } from '../utils/reset-grid-refs';

export function useGridPlannerState(gridSize: number) {
  const gridArea = gridSize * gridSize;
  const emptyGrid = generateEmptyGrid(gridArea);
  const storeGridValues = useAppSelector(
    (state) => state.createCrossword.gridValues
  );
  const initialValues =
    storeGridValues && storeGridValues.length ? storeGridValues : emptyGrid;
  const [gridValues, setGridValues] = useState<string[]>(initialValues);

  const gridRefs = useRef<React.RefObject<HTMLDivElement>[]>(
    resetGridRefs(gridArea)
  );

  const handleCellKeyPress = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number,
    unlockClues: (unlocked: boolean) => void
  ) => {
    if (e.key === 'Tab') return;
    e.preventDefault();
    const key = e.key.toUpperCase();

    if (/^[A-Z]$/.test(key)) {
      setGridValues(updateCellWithLetter(index, key));
      unlockClues(false);
      return;
    }

    if (e.key === 'Backspace' || e.key === 'Delete') {
      setGridValues(clearCell(index));
      return;
    }

    const nextIndex = getNextIndex(index, e.key, gridSize);
    if (nextIndex !== index) {
      gridRefs?.current[nextIndex]?.current?.focus();
    }
  };

  return {
    gridValues,
    setGridValues,
    resetGridRefs,
    gridRefs,
    handleCellKeyPress,
  };
}
