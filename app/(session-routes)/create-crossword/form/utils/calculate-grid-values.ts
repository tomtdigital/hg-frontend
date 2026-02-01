/**
 * Utility to calculate initial grid values for a crossword puzzle.
 * Each cell is initialized with an empty letter and the specified empty color.
 * Values are determined based on the (square) grid size
 *
 * @param gridSize
 * @param emptyColor
 * @returns
 */
export const calculateGridValues = (
  gridSize: number,
  emptyColor: ColorScheme['empty']
): Cell[] => {
  const gridArea = gridSize * gridSize;
  const newGrid: Cell[] = Array.from({ length: gridArea }, () => ({
    letter: '',
    color: emptyColor,
  }));
  return newGrid;
};
