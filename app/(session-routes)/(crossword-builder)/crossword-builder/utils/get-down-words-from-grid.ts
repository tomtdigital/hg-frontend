/**
 * Extracts all down words from a crossword grid and assigns clue numbers.
 *
 * Logic flow:
 * 1. Calculate the next available clue number (after all across words)
 * 2. Iterate through each cell in the grid
 * 3. Skip empty cells
 * 4. Check if cell is the start of a down word (above is empty/edge AND below has letter)
 * 5. If yes, collect all consecutive filled cells downward
 * 6. Extract the word string
 * 7. Assign clue number: reuse across clue number if cell starts across word, otherwise use next available
 * 8. Store the word with its clue number
 *
 * @param grid - Array of strings representing the crossword grid (letters or empty strings for blank cells)
 * @param size - The width/height of the square grid
 * @param acrossStartingCells - Map of cell indices to clue numbers from getAcrossWordsFromGrid
 * @returns Array of GridWord objects with indices, word string, and clue number
 */
export function getDownWordsFromGrid(
  grid: string[],
  size: number,
  acrossStartingCells: Record<number, number>
): GridWord[] {
  const words: GridWord[] = [];

  // STEP 1: Calculate the next available clue number
  // This is one more than the highest across clue number
  let nextAvailableClueNumber =
    Math.max(...Object.values(acrossStartingCells), 0) + 1;

  // STEP 2: Iterate through each cell in the grid
  for (let i = 0; i < grid.length; i++) {
    const row = Math.floor(i / size);
    const cellValue = grid[i];

    // STEP 3: Skip empty cells - they can't start words
    if (!cellValue) continue;

    // STEP 4: Check if this cell starts a down word
    // Above must be empty (at edge or no letter) AND below must have a letter
    const aboveHasNoLetter = row === 0 || !grid[i - size];
    const belowHasLetter = row < size - 1 && !!grid[i + size];

    if (aboveHasNoLetter && belowHasLetter) {
      // STEP 5: Collect all consecutive filled cells for this word (moving down)
      const indices = [i];
      let j = i + size;
      while (j < grid.length && grid[j]) {
        indices.push(j);
        j += size;
      }

      // STEP 6: Extract the word string from grid cells
      const word = indices.map((idx) => grid[idx] ?? '').join('');

      // Only include words with length > 1 (single letters aren't valid clue words)
      if (word.length > 1) {
        // STEP 7: Assign clue number
        // If this cell also starts an across word, reuse its clue number
        // Otherwise, assign the next available clue number and increment it
        const clueNumber = acrossStartingCells[i] ?? nextAvailableClueNumber++;

        // STEP 8: Store the word with its clue number
        words.push({ indices, word, clueNumber });
      }
    }
  }

  return words.sort((a, b) => a.clueNumber - b.clueNumber);
}
