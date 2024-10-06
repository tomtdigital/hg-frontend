import { useEffect, useState } from "react";

export const useSessionStart = (gameId: string) => {
  const [session, setSession] = useState({
    game: gameId,
    gameData: {
      stage: 0,
      cluesRevealed: [],
      score: 0,
      lastCompletedGrid: [],
      finishedGrids: [],
      solutionGuess: "",
      correctSolution: false,
      gameComplete: false,
    },
  });
  const storageKey = `hg-${session.game ? session.game + "-" : "-"}session`;

  useEffect(() => {
    async function retrieveSession() {
      // First check for a session in local storage
      let localSession;
      const maskedError = "something went wrong";
      const localSessionString = localStorage.getItem(storageKey);
      if (localSessionString) localSession = JSON.parse(localSessionString);
      // Next get or create a session in the DB;
      try {
        const getRes = await fetch(`/api/user-session`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // ...using localStorage or the default
          body: localSessionString ?? JSON.stringify(session),
        });

        if (!getRes.ok) {
          throw new Error(maskedError);
        }

        const dbSession = await getRes.json();
        // if local storage, save useState session as localStorage...
        if (localSession) {
          setSession(localSession);
          // then update the DB session with this in case of offline activity
          try {
            const updateRes = await fetch(`/api/user-session`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              // ...using localStorage
              body: localSessionString,
            });
            // Mask backend error
            if (!updateRes.ok) {
              throw new Error(maskedError);
            }
          } catch (error: unknown) {
            throw new Error(maskedError);
          }
        } else {
          // If no local session, transform the DB session...
          const data = {
            ...session,
            gameData: dbSession.gameData ?? session.gameData,
          };
          // ...save it to localStorage and...
          localStorage.setItem(storageKey, JSON.stringify(data));
          // ...update useState session with this
          setSession(data);
        }
      } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : maskedError);
      }
    }

    retrieveSession();
  }, []);
  return session;
};
