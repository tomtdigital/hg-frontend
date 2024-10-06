"use client";

import { FC, ReactNode, useEffect, useState } from "react";

type GameWrapperProps = {
  gameId: string;
  children: ReactNode;
};

export const GameWrapper: FC<GameWrapperProps> = ({ gameId, children }) => {
  const [storageInitialised, setStorageInitialised] = useState(false);
  const [session, setSession] = useState<
    RequireOnly<GameSession, "game" | "gameData">
  >({
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

  // Initialize the store with the product information
  // const store = useAppStore()
  // const initialized = useRef(false)
  // if (!initialized.current) {
  //   store.dispatch(initialiseSession(product))
  //   initialized.current = true
  // }
  // const name = useAppSelector(state => state.product.name)
  // const dispatch = useAppDispatch()

  useEffect(() => {
    async function initialiseStorage() {
      // First check for a session in local storage
      let localSession;
      const maskedError = "something went wrong";
      const storageKey = `hg-${session.game ? session.game + "-" : "-"}session`;
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

        const dbSession: Fetched<GameSession> = await getRes.json();
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
            gameData: dbSession?.gameData ?? session.gameData,
          };
          // ...save it to localStorage and...
          localStorage.setItem(storageKey, JSON.stringify(data));
          // ...update useState session with this
          setSession(data);
        }
      } catch (error: unknown) {
        throw new Error(maskedError);
      }
    }
    if (!storageInitialised) initialiseStorage();
    setStorageInitialised(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};
