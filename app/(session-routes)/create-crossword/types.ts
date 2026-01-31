type Cell = {
  letter: string;
  color: string;
};

type GridWord = { indices: number[]; word: string; clue?: string };

type CrossWordGridData = {
  across: GridWord[];
  down: GridWord[];
};

type ColorScheme = {
  empty: string;
  filled: string;
  selected: string;
};

type CrosswordData = {
  gridSize: number;
  colorScheme: ColorScheme;
  gridData: CrossWordGridData;
};
