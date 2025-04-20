'use client';

import { useParams } from 'next/navigation';
import { FC, ReactNode, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector, useAppStore } from '../redux/hooks';
import { setGameSession } from '../redux/slices/game-session-slice';
import { getDefaultGameSession } from '../utils/get-default-game-session';
import { getStorageKey } from '../utils/get-storage-key';
import {
  GameState,
  localGameKey,
  resetGameState,
} from '../redux/slices/game-slice';

type GameWrapperProps = {
  totalStages: number;
  children: ReactNode;
};

// TODO: setup monorepo
export const GameWrapper: FC<GameWrapperProps> = ({
  children,
  totalStages,
}) => {
  // Prevent repeated initialisations
  const { id } = useParams();
  const gameId = id as string;
  const storageInitialised = useRef(false);
  const reduxInitialised = useRef(false);
  const defaultSession = getDefaultGameSession(gameId);
  // Used as localStorage identifier
  const gameSessionKey = getStorageKey(gameId);
  // Initialise the store with the default session
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (reduxInitialised.current) return;
    reduxInitialised.current = true;
  }, []);

  // Initialise the local, database and redux storage sync for a game sesison
  useEffect(() => {
    if (storageInitialised.current) return;
    storageInitialised.current = true;

    async function initialiseStorage() {
      // First check for sessions in local storage
      let localSession;
      const maskedError = 'something went wrong';
      // Deal with the game state
      const rawStoreGame = localStorage.getItem(localGameKey);
      let localGame = {} as GameState;
      if (rawStoreGame) localGame = JSON.parse(rawStoreGame);
      if (localGame && localGame?.id === gameId) {
        dispatch(resetGameState(localGame));
      } else {
        dispatch(resetGameState({ totalStages, id: gameId }));
      }
      // Deal with the game session state
      const localSessionString = localStorage.getItem(gameSessionKey);
      if (localSessionString) localSession = JSON.parse(localSessionString);
      // Next get or create a game session in the DB;
      try {
        const getRes = await fetch(`/api/user-session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // ...using localStorage or the default
          body: localSessionString ?? JSON.stringify(defaultSession),
        });

        if (!getRes.ok) {
          throw new Error(maskedError);
        }

        const dbSession: Fetched<GameSession> = await getRes.json();
        // if local storage, save useState session as localStorage...
        if (localSession) {
          // then update the DB session with this in case of offline activity
          try {
            dispatch(setGameSession(localSession));
            const updateRes = await fetch(`/api/user-session`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
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
            ...defaultSession,
            gameData: dbSession?.gameData ?? defaultSession.gameData,
          };
          // ...save it to localStorage and...
          localStorage.setItem(gameSessionKey, JSON.stringify(data));
          // ...save it to the redux store
          dispatch(setGameSession(data));
        }
      } catch (error: unknown) {
        throw new Error(maskedError);
      }
    }
    initialiseStorage();
  }, []);

  return <>{children}</>;
};
