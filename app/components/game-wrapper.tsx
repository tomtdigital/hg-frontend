'use client';
/* eslint-disable react-hooks/exhaustive-deps */

import { useParams } from 'next/navigation';
import { FC, ReactNode, useEffect, useRef } from 'react';
import { useAppDispatch, useAppStore } from '../redux/hooks';
import { setGameSession } from '../redux/slices/game-session-slice';
import { getDefaultGameSession } from '../utils/get-default-game-session';
import { getStorageKey } from '../utils/get-storage-key';

type GameWrapperProps = {
  children: ReactNode;
};

// TODO: setup monorepo
export const GameWrapper: FC<GameWrapperProps> = ({ children }) => {
  // Prevent repeated initialisations
  const { id } = useParams();
  const gameId = id as string;
  const storageInitialised = useRef(false);
  const reduxInitialised = useRef(false);
  const defaultSession = getDefaultGameSession(gameId);

  // Used as localStorage identifier
  const storageKey = getStorageKey(gameId);
  // Initialise the store with the default session
  const store = useAppStore();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (reduxInitialised.current) return;
    reduxInitialised.current = true;
    store.dispatch(setGameSession(defaultSession));
    // TODO: set game basics e.g. active word etc.
  }, []);

  // Initialise the local, database and redux storage sync for a game sesison
  useEffect(() => {
    if (storageInitialised.current) return;
    storageInitialised.current = true;

    async function initialiseStorage() {
      // First check for a session in local storage
      let localSession;
      const maskedError = 'something went wrong';
      const localSessionString = localStorage.getItem(storageKey);
      if (localSessionString) localSession = JSON.parse(localSessionString);
      // Next get or create a session in the DB;
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
          localStorage.setItem(storageKey, JSON.stringify(data));
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
