'use client';

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { updateSessionStorage } from '@/app/redux/slices/game-session-slice';
import { getStorageKey } from '@/app/utils/get-storage-key';
import { useParams } from 'next/navigation';

type GameProps = {
  grids: GameGrid;
  solution: string;
};

export default function Game({ grids, solution }: GameProps) {
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
    <div className='rounded border border-gray-300 p-4'>
      <p>Game Component</p>
      <p>Completion status: {`${gameData?.gameComplete}`}</p>
      <button
        className='bg-yellow-400 text-black hover:bg-yellow-600'
        onClick={handleUpdateCompletion}
      >
        Update Completion
      </button>
      <div
        className='mt-4 rounded bg-gray-100 p-4 shadow'
        style={{ maxHeight: '500px', overflowY: 'auto' }}
      >
        <h3 className='mb-2 text-lg font-semibold text-black'>Game Details</h3>
        <pre className='text-sm text-gray-700'>
          {JSON.stringify(
            {
              grids,
              solution,
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}
