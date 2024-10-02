// Initialising game session - only done on Game component in isolated useEffect

//  to do this, create...
// let sessionData
// Obtain user token via client component methods (getSession?)
// Check local storage for localSession
// Check DB for dbSession
// If no local storage, but DB session, sessionData = dbSession. Save sessionData to local storage and update redux
// If local storage, sessionData = localSession. PUT sessionData to DB and update redux

// If neither, sessionData  = {
//   game: id,
//   gameData: {
//     stage: 0,
//     cluesRevealed: [],
//     score: 0,
//     lastCompletedGrid: [],
//     finishedGrids: [],
//     solutionGuess: "",
//     correctSolution: false,
//     gameComplete: false,
//   },
// };

// Save sessionData to localStorage, POST to DB and update redux
