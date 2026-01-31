/**
 * Calculates the next index in a grid based on arrow key direction.
 * @param index - Current position in the grid (0-indexed)
 * @param direction - Arrow key direction ('ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp')
 * @param size - Dimensions of the grid (assumes square grid)
 * @returns The next index, or the current index if at boundary
 */
export const getNextIndex = (
  index: number,
  direction: string,
  size: number
): number => {
  // Convert flat index to 2D coordinates
  const row = Math.floor(index / size);
  const col = index % size;

  switch (direction) {
    case 'ArrowRight':
      // Move right if not at rightmost column
      return col < size - 1 ? index + 1 : index;
    case 'ArrowLeft':
      // Move left if not at leftmost column
      return col > 0 ? index - 1 : index;
    case 'ArrowDown':
      // Move down if not at bottom row
      return row < size - 1 ? index + size : index;
    case 'ArrowUp':
      // Move up if not at top row
      return row > 0 ? index - size : index;
    default:
      return index;
  }
};
