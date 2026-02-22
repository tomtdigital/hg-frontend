/**
 * Extracts all down words from a crossword grid.
 * @param grid - Array of string representing the crossword grid (letters or empty strings for blank cells)
 * @param size - The width/height of the square grid
 * @returns Array of objects containing word indices and the word string
 */
export function getDownWordsFromGrid(grid: string[], size: number): GridWord[] {
  const words = [];

  // Iterate through each cell in the grid
  for (let i = 0; i < grid.length; i++) {
    const row = Math.floor(i / size);
    const col = i % size;
    const cellValue = grid[i];

    // Skip empty cells
    if (!cellValue) continue;

    // Check if this cell starts a down word (no letter above, has letter below)
    const aboveHasNoLetter = row === 0 || !grid[i - size];
    const belowHasLetter = row < size - 1 && !!grid[i + size];

    if (aboveHasNoLetter && belowHasLetter) {
      // Collect all indices for this word
      const indices = [i];
      let j = i + size;
      while (j < grid.length && grid[j]) {
        indices.push(j);
        j += size;
      }

      // Extract letters and build the word string
      const word = indices.map((idx) => grid[idx] ?? '').join('');
      if (word.length > 1) words.push({ indices, word });
    }
  }
  return words;
}
