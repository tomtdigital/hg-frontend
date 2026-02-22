type GridValidation = {
  isValid: boolean;
  message?: string;
};

/**
 * Validates that a crossword grid contains both across and down words.
 *
 * @param acrossValues - Array of across words in the grid
 * @param downValues - Array of down words in the grid
 * @returns GridValidation object containing isValid flag and optional error message
 * @example
 * const result = handleGridValidation(acrossWords, downWords);
 * if (!result.isValid) {
 *   console.error(result.message);
 * }
 */
export const handleGridValidation = (
  acrossValues: GridWord[],
  downValues: GridWord[]
): GridValidation => {
  if (!acrossValues.length && !downValues.length) {
    return { isValid: false, message: 'No across or down words found.' };
  } else if (!acrossValues.length) {
    return { isValid: false, message: 'No across words found.' };
  } else if (!downValues.length) {
    return { isValid: false, message: 'No down words found.' };
  }
  return { isValid: true };
};
