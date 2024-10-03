"use client";

import { JWT } from "next-auth";
import { FC, useEffect, useState } from "react";

type GameProps = {
  game: Fetched<Game>;
  user: Fetched<JWT["user"]>;
};

export const Game: FC<GameProps> = ({ game, user }) => {
  const [session, setSession] = useState({
    game: game?._id,
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
      const backupErrorMessages = {
        get: "Unable to get session",
        post: "Unable to create session",
        put: "Unable to update session",
      };
      const localSessionString = localStorage.getItem(storageKey);
      if (localSessionString) localSession = JSON.parse(localSessionString);

      try {
        // Next check the DB for a session
        const getRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/game-sessions/${session.game}`,
          {
            headers: { authorization: `Bearer ${user?.token}` },
          }
        );

        if (!getRes.ok) {
          const status = await getRes.status;
          // If there isn't a DB session found...
          if (status === 404) {
            // ...create one...
            try {
              const createRes = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/game-sessions`,
                {
                  method: "POST",
                  headers: {
                    authorization: `Bearer ${user?.token}`,
                    "Content-Type": "application/json",
                  },
                  // ...using localStorage or the default
                  body: localSessionString ?? JSON.stringify(session),
                }
              );
              // Handle error for the create
              if (!createRes.ok) {
                const error = await createRes.json();
                throw new Error(error.message ?? backupErrorMessages.post);
              }
            } catch (error: unknown) {
              throw new Error(
                error instanceof Error
                  ? error.message
                  : backupErrorMessages.post
              );
            }
          } else {
            // If error with GET aside from 404, throw it
            throw new Error(backupErrorMessages.get);
          }
          // If a session is found
        } else {
          const dbSession = await getRes.json();
          // if local storage, update db with that, save useState session as localStorage
          if (localSession) {
            setSession(localSession);

            try {
              const updateRes = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/game-sessions/${session.game}`,
                {
                  method: "PUT",
                  headers: {
                    authorization: `Bearer ${user?.token}`,
                    "Content-Type": "application/json",
                  },
                  // ...using localStorage or the default
                  body: localSessionString,
                }
              );
              // Mask backend error
              if (!updateRes.ok) {
                throw new Error(backupErrorMessages.put);
              }
            } catch (error: unknown) {
              throw new Error(backupErrorMessages.put);
            }
          } else {
            //Transform db response, save it to localStorage and...
            const data = {
              ...session,
              gameData: dbSession.gameData ?? session.gameData,
            };
            localStorage.setItem(storageKey, JSON.stringify(data));
            // ...update useState session with this
            setSession(data);
          }
        }
      } catch (error: unknown) {
        throw new Error(
          error instanceof Error ? error.message : "session retrieval error"
        );
      }
    }

    retrieveSession();
  }, []);

  // Initialize the store with the product information
  // const store = useAppStore()
  // const initialized = useRef(false)
  // if (!initialized.current) {
  //   store.dispatch(initialiseSession(product))
  //   initialized.current = true
  // }
  // const name = useAppSelector(state => state.product.name)
  // const dispatch = useAppDispatch()

  return (
    <>
      <div>Game Component</div>
    </>
  );
};
