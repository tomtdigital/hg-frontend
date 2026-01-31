/**
 * Extracts all across words from a crossword grid.
 * @param grid - Array of cells representing the crossword grid
 * @param size - Dimension of the grid (assumes square grid)
 * @returns Array of objects containing word indices and the word string
 */
export function getAcrossWordsFromGrid(grid: Cell[], size: number) {
  const words = [];

  // Iterate through each cell in the grid
  for (let i = 0; i < grid.length; i++) {
    const row = Math.floor(i / size);
    const col = i % size;
    const cell = grid[i];

    // Skip black cells
    if (cell.color === 'black') continue;

    // Check if this is the start of a word
    // (left side is black/edge AND right side is white)
    const leftIsBlack = col === 0 || grid[i - 1].color === 'black';
    const rightIsWhite = col < size - 1 && grid[i + 1].color === 'white';

    if (leftIsBlack && rightIsWhite) {
      // Collect all consecutive white cells for this word
      const indices = [i];
      let j = i + 1;
      while (
        j < grid.length &&
        Math.floor(j / size) === row &&
        grid[j].color === 'white'
      ) {
        indices.push(j);
        j++;
      }

      // Extract letters and create word entry
      const word = indices.map((idx) => grid[idx].letter ?? '').join('');
      words.push({ indices, word });
    }
  }

  return words;
}
