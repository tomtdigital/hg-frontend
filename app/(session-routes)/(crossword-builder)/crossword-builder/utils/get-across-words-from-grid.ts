/**
 * Extracts all across words from a given grid of cells.
 * Also builds a map of across word starting cells for use in clue numbering.
 *
 * Logic flow:
 * 1. Iterate through each cell in the grid
 * 2. Skip empty cells
 * 3. Check if cell is the start of an across word (left is empty/edge AND right has letter)
 * 4. If yes, collect all consecutive filled cells to the right
 * 5. Extract the word and store it with its clue number
 * 6. Increment clue number for next across word
 * 7. Return both words array and map of starting cells
 *
 * @param grid - An array of strings representing the grid, where each string is a letter or an empty string for blank cells.
 * @param size - The number of columns in the grid, used to determine the row of each cell based on its index.
 * @returns An object containing:
 *   - words: Array of GridWord objects with indices, word string, and clue number
 *   - acrossStartingCells: Map of cell indices to their clue numbers for across words (used for down word numbering)
 */
export function getAcrossWordsFromGrid(grid: string[], size: number) {
  const acrossWords: GridWord[] = [];
  const acrossStartingCells: Record<number, number> = {};
  let clueNumber = 1;

  // STEP 1: Iterate through each cell in the grid
  for (let i = 0; i < grid.length; i++) {
    const row = Math.floor(i / size);
    const col = i % size;
    const cellValue = grid[i];

    // STEP 2: Skip empty cells - they can't start words
    if (!cellValue) continue;

    // STEP 3: Check if this cell starts an across word
    // Left must be empty (at edge or no letter) AND right must have a letter
    const leftIsEmpty = col === 0 || !grid[i - 1];
    const rightIsFilled = col < size - 1 && grid[i + 1];

    if (leftIsEmpty && rightIsFilled) {
      // STEP 4: Collect all consecutive filled cells for this word (moving right)
      const indices = [i];
      let j = i + 1;
      while (j < grid.length && Math.floor(j / size) === row && grid[j]) {
        indices.push(j);
        j++;
      }

      // STEP 5: Extract the word string from grid cells
      const word = indices.map((idx) => grid[idx] ?? '').join('');

      // Only include words with length > 1 (single letters aren't valid clue words)
      if (word.length > 1) {
        acrossWords.push({ indices, word, clueNumber });
        // Store the starting cell index mapped to this clue number
        // This will be used by getDownWordsFromGrid to share clue numbers
        acrossStartingCells[i] = clueNumber;
      }

      // STEP 6: Increment clue number for the next across word
      clueNumber++;
    }
  }

  // STEP 7: Return both the words and the map of starting cells
  return { acrossWords, acrossStartingCells };
}
