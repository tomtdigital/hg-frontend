/**
 * Creates a function that clears a cell at the specified index in a crossword grid.
 *
 * @param index - The index of the cell to clear in the grid array.
 * @param emptyCellColor - The color to assign to the cleared cell.
 * @returns A function that takes the current cell array and returns a new array with the specified cell cleared.
 *
 * @example
 * const cells = [{ letter: 'A', color: 'black' }];
 * const clearFirstCell = clearCell(0, 'black');
 * const updatedCells = clearFirstCell(cells);
 * // Result: [{ letter: '', color: 'black' }]
 */

export const clearCell = (index: number) => (prev: string[]) => {
  const updated = [...prev];
  updated[index] = '';
  return updated;
};
