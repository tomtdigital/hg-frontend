import wordCellConfig from '../api/data/client/word-cell-config.json';

export function getBaseGrid(type: GridType, data: GridData): FullGrid {
  const words = data.map((item) => item.word);

  const createRow = (cells: number[], word: string): GridCell[] => {
    return cells.map((cell, index) => ({
      cell,
      guess: '',
      answer: word[index].toUpperCase(),
    }));
  };

  const createGrid = (rows: number[][]): FullGrid => {
    return rows.map((row, index) => createRow(row, words[index]));
  };

  const wordCells: Record<GridType, number[][]> = wordCellConfig;

  // Validate the grid type and return the corresponding grid
  if (!wordCells[type]) {
    throw new Error(`Invalid grid type: ${type}`);
  }

  return createGrid(wordCells[type]);
}
