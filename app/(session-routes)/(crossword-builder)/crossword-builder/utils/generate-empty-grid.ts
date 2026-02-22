/**
 * Utility to generate initial (empty) grid values for a crossword puzzle.
 * Number of values are determined based on the (square) grid size
 *
 * @param gridSize
 * @returns
 */
export const generateEmptyGrid = (gridArea: number): string[] => {
  const newGrid: string[] = Array.from({ length: gridArea }, () => '');
  return newGrid;
};
