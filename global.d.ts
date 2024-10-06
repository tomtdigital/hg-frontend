type Fetched<T> = T | undefined;

type RequireOnly<T, P extends keyof T> = Pick<T, P> & Partial<Omit<T, P>>;

type GamePreview = {
  _id: string;
  publishDate: string;
};

type GridData = [
  {
    anagram: string;
    word: string;
    clue: string;
    details?: {
      pronoun?: boolean;
      wordCount?: string;
    };
  }
];

type GameGrid = [
  {
    grid: string;
    data: GridData;
  }
];

type Game = {
  _id: string;
  _v: number;
  main: GameGrid;
  solution: string;
  publishDate: string;
  createdAt: string;
  updatedAt: string;
  premium: true;
};

type CompletedGrid = {
  cell: number;
  guess: string;
  answer: string;
};

type GameSession = {
  _id: string; // id
  game: string; // id
  gameData: {
    stage: number;
    cluesRevealed: string[];
    score: number;
    lastCompletedGrid: CompletedGrid[];
    finishedGrids: CompletedGrid[];
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

type StoredGameSession = RequireOnly<GameSession, "game" | "gameData">;
