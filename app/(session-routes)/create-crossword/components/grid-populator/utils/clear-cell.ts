/**
 * Creates a function that clears a cell at the specified index in a crossword grid.
 *
 * @param {number} index - The index of the cell to clear in the grid array
 * @returns {(prev: Cell[]) => Cell[]} A function that takes the current cell array and returns a new array with the specified cell cleared
 *
 * @example
 * const cells = [{ letter: 'A', color: 'black' }];
 * const clearFirstCell = clearCell(0);
 * const updatedCells = clearFirstCell(cells);
 * // Result: [{ letter: '', color: 'black' }]
 */
export const clearCell = (index: number) => (prev: Cell[]) => {
  const updated = [...prev];
  updated[index] = { letter: '', color: 'black' };
  return updated;
};
