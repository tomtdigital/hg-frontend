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
    plural?: boolean;
    wordCount?: string;
    letterSplit?: string;
  };
};

type GridData = Word[];

type GameGrid = {
  grid: GridType;
  name: string;
  data: GridData;
}[];

type Access = 'free' | 'premium' | 'owner';

type Game = {
  main: GameGrid;
  solution: string;
  publishDate: Date;
  createdAt: Date;
  updatedAt: Date;
  access: Access;
};

type NewGame = RequireOnly<Game, 'main' | 'solution' | 'publishDate'>;

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

type ActionState<T = undefined> =
  | { status: 'rejected'; error?: { message?: string } }
  | { status: 'fulfilled'; data?: T };
