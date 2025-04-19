'use client';

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { updateSessionStorage } from '@/app/redux/slices/game-session-slice';
import { getStorageKey } from '@/app/utils/get-storage-key';
import { useParams } from 'next/navigation';

export default function Game() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { game, gameData } = useAppSelector(
    (state) => state.gameSession?.session || {}
  );
  function handleUpdateCompletion(): void {
    if (!game || !gameData) return;

    dispatch(
      updateSessionStorage({
        localStorageKey: getStorageKey(id as string),
        session: {
          game,
          gameData: { ...gameData, gameComplete: !gameData.gameComplete },
        },
        updateDb: true,
      })
    );
  }

  return (
    <div>
      <p>Game Component</p>
      <p>Completion status: {`${gameData?.gameComplete}`}</p>
      <button
        className='bg-yellow-400 text-black hover:bg-yellow-600'
        onClick={handleUpdateCompletion}
      >
        Update Completion
      </button>
    </div>
  );
}
