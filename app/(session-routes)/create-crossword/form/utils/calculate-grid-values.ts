/**
 * Utility to calculate initial grid values for a crossword puzzle.
 * Each cell is initialized with an empty letter (represented as an empty string).
 * Values are determined based on the (square) grid size
 *
 * @param gridSize
 * @returns
 */
export const calculateGridValues = (gridSize: number): string[] => {
  const gridArea = gridSize * gridSize;
  const newGrid: string[] = Array.from({ length: gridArea }, () => '');
  return newGrid;
};
