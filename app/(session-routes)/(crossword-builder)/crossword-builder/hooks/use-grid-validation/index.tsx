import { useEffect, useState } from 'react';
import { handleGridValidation } from './handle-grid-validation';

export function useGridValidation(currentGridSize: number) {
  const [gridErrorMessage, setGridErrorMessage] = useState('');

  useEffect(() => {
    // Clear any existing error message when the grid size changes
    setGridErrorMessage('');
  }, [currentGridSize]);

  const validateGrid = (acrossWords: GridWord[], downWords: GridWord[]) => {
    const { isValid, message } = handleGridValidation(acrossWords, downWords);

    if (!isValid) {
      setGridErrorMessage(message || 'Invalid grid.');
      return false;
    }
    return true;
  };

  return {
    gridErrorMessage,
    validateGrid,
  };
}
