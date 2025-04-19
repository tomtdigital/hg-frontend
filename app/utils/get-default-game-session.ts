export function getDefaultGameSession(id: string) {
  return {
    game: id,
    gameData: {
      stage: 0,
      cluesRevealed: [],
      score: 0,
      lastCompletedGrid: [],
      finishedGrids: [],
      solutionGuess: '',
      correctSolution: false,
      gameComplete: false,
    },
  };
}
