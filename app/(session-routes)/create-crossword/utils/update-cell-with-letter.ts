/**
 * Creates a function that updates a cell at a specific index with a new letter.
 * @param index - The index of the cell to update
 * @param letter - The letter to set in the cell
 * @returns A function that takes the previous cell array and returns an updated array
 */
export const updateCellWithLetter =
  (index: number, letter: string) => (prev: Cell[]) => {
    // Create a shallow copy to avoid mutating the original array
    const updated = [...prev];
    // Update the cell at the specified index with the new letter and reset color to white
    updated[index] = { letter, color: 'white' };
    return updated;
  };
