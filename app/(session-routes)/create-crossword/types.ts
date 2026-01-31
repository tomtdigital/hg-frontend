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
  filledText: string;
  selected: string;
  selectedText: string;
};

type CrosswordData = {
  gridSize: number;
  colorScheme: ColorScheme;
  gridData: CrossWordGridData;
};
