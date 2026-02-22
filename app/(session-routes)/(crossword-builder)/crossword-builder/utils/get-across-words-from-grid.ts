/**
 * Extracts all across words from a given grid of cells.
 *
 * @param grid - An array of strings representing the grid, where each string is a letter or an empty string for blank cells.
 * @param size - The number of columns in the grid, used to determine the
 *               row of each cell based on its index.
 * @returns An array of GridWord objects, each containing the indices of the
 *          cells that form the word and the word itself as a string. Words
 *          with a length of 1 or less are not included in the result.
 */
export function getAcrossWordsFromGrid(
  grid: string[],
  size: number
): GridWord[] {
  const words = [];

  // Iterate through each cell in the grid
  for (let i = 0; i < grid.length; i++) {
    const row = Math.floor(i / size);
    const col = i % size;
    const cellValue = grid[i];

    // Skip empty cells
    if (!cellValue) continue;

    // Check if this is the start of a word
    // (left side is empty/edge AND right side has a letter)
    const leftIsEmpty = col === 0 || !grid[i - 1];
    const rightIsFilled = col < size - 1 && grid[i + 1];

    if (leftIsEmpty && rightIsFilled) {
      // Collect all consecutive filled cells for this word
      const indices = [i];
      let j = i + 1;
      while (j < grid.length && Math.floor(j / size) === row && grid[j]) {
        indices.push(j);
        j++;
      }

      // Extract letters and create word entry
      const word = indices.map((idx) => grid[idx] ?? '').join('');
      if (word.length > 1) words.push({ indices, word });
    }
  }

  return words;
}
