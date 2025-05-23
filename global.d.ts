type Fetched<T> = T | undefined;

type RequireOnly<T, P extends keyof T> = Pick<T, P> & Partial<Omit<T, P>>;

type GamePreview = {
  _id: string;
  publishDate: string;
};

type Word = {
  anagram: string;
  word: string;
  clue: string;
  details?: {
    pronoun?: boolean;
    wordCount?: string;
  };
};

type GridData = Word[];

type GameGrid = {
  grid: GridType;
  data: GridData;
}[];

type Game = {
  _id: string;
  _v: number;
  main: GameGrid;
  solution: string;
  publishDate: string;
  createdAt: string;
  updatedAt: string;
  premium: boolean;
};

type GridCell = {
  cell: number;
  guess: string;
  answer: string;
};

type GridCells = GridCell[];

type FullGrid = GridCells[];

type GameSession = {
  _id: string; // id
  game: string; // id
  gameData: {
    stage: number;
    cluesRevealed: string[];
    score: number;
    lastCompletedGrid: FullGrid;
    finishedGrids: FullGrid[];
    solutionGuess: string;
    correctSolution: boolean;
    gameComplete: boolean;
  };
};

type GameSessionPreview = {
  _id: string; // id
  game: string; // id
  gameData: {
    gameComplete: boolean;
  };
};

type StoredGameSession = RequireOnly<GameSession, 'game' | 'gameData'>;

type StoredSessionData = Partial<GameSession['gameData']>;
