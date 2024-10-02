"use server";

import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { getCachedUser } from "./user";

// Create Game component (client) for game page
// Initialising game session - only done on Game component in isolated useEffect

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

export async function fetchSessionPreviews(): Promise<
  Fetched<GameSessionPreview[]>
> {
  const message = "Unable to retrieve sessions";
  const user: Fetched<Session["user"]> = await getCachedUser();
  if (!user) redirect("/login");

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/game-sessions/`, {
      headers: { authorization: `Bearer ${user?.token}` },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message ?? message);
    }

    return await res.json();
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : message);
  }
}
