"use client";
/* eslint-disable react-hooks/exhaustive-deps */

import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppStore } from "../redux/hooks";
import {
  setGameSession,
  updateSessionStorage,
} from "../redux/slices/game-session-slice";

type GameWrapperProps = {
  gameId: string;
  children: ReactNode;
};

// TODO: setup monorepo
export const GameWrapper: FC<GameWrapperProps> = ({ gameId, children }) => {
  // Prevent repeated initialisations
  const storageInitialised = useRef(false);
  const reduxInitialised = useRef(false);

  // Store default session in component state
  const [session, setSession] = useState<StoredGameSession>({
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
  // Used as localStorage identifier
  const storageKey = `hg-${session.game ? session.game + "-" : "-"}session`;
  // Initialise the store with the default session
  const store = useAppStore();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (reduxInitialised.current) return;
    reduxInitialised.current = true;
    store.dispatch(setGameSession(session));
    // TODO: set game basics e.g. active word etc.
  }, []);

  // Initialise the local, database and redux storage sync for a game sesison
  useEffect(() => {
    if (storageInitialised.current) return;
    storageInitialised.current = true;

    async function initialiseStorage() {
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
    initialiseStorage();
  }, []);

  useEffect(() => {
    dispatch(setGameSession(session));
  }, [dispatch, session]);

  function handleUpdateCompletion(): void {
    const { game, gameData } = store.getState().gameSession?.session;
    const newState = {
      game,
      gameData: { ...gameData, gameComplete: !gameData.gameComplete },
    };
    dispatch(
      updateSessionStorage({
        localStorageKey: storageKey,
        session: newState,
        updateDb: true,
      })
    );
  }

  return (
    <>
      <button
        className="bg-yellow-400 text-black"
        onClick={handleUpdateCompletion}
      >
        Update Completion
      </button>
      {children}
    </>
  );
};
