import { createRef, useEffect, useRef, useState } from 'react';
import { generateEmptyGrid } from '../utils/generate-empty-grid';
import { clearCell } from '../utils/clear-cell';
import { updateCellWithLetter } from '../utils/update-cell-with-letter';
import { getNextIndex } from '../utils/get-next-index';

export function useGridPlannerState(gridSize: number) {
  const [gridValues, setGridValues] = useState<string[]>(
    generateEmptyGrid(gridSize)
  );
  const gridRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const workingGridArea = gridSize * gridSize;

  // Initialize/recalculate refs and grid when size changes
  useEffect(() => {
    if (
      workingGridArea !== gridValues.length ||
      workingGridArea !== gridRefs.current.length
    ) {
      setGridValues(generateEmptyGrid(gridSize));
      gridRefs.current = Array.from({ length: workingGridArea }, () =>
        createRef<HTMLDivElement>()
      );
    }
  }, [gridSize, workingGridArea]);

  const handleCellKeyPress = (
    index: number,
    e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (e.key === 'Tab') return;
    e.preventDefault();
    const key = e.key.toUpperCase();

    if (/^[A-Z]$/.test(key)) {
      setGridValues(updateCellWithLetter(index, key));
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
    gridRefs,
    handleCellKeyPress,
  };
}
