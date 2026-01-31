/**
 * Extracts all down words from a crossword grid.
 * @param grid - Array of cells representing the crossword grid
 * @param size - The width/height of the square grid
 * @returns Array of objects containing word indices and the word string
 */
export function getDownWordsFromGrid(grid: Cell[], size: number) {
  const words = [];

  // Iterate through each cell in the grid
  for (let i = 0; i < grid.length; i++) {
    const row = Math.floor(i / size);
    const col = i % size;
    const cell = grid[i];

    // Skip black cells
    if (cell.color === 'black') continue;

    // Check if this cell starts a down word (black above, white below)
    const aboveIsBlack = row === 0 || grid[i - size].color === 'black';
    const belowIsWhite = row < size - 1 && grid[i + size].color === 'white';

    if (aboveIsBlack && belowIsWhite) {
      // Collect all indices for this word
      const indices = [i];
      let j = i + size;
      while (j < grid.length && grid[j].color === 'white') {
        indices.push(j);
        j += size;
      }

      // Extract letters and build the word string
      const word = indices.map((idx) => grid[idx].letter ?? '').join('');
      words.push({ indices, word });
    }
  }

  return words;
}
