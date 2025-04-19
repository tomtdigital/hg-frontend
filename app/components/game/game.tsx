'use client';

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { updateSessionDataStorage } from '@/app/redux/slices/game-session-slice';

type GameProps = {
  grids: GameGrid;
  solution: string;
};

export default function Game({ grids, solution }: GameProps) {
  const dispatch = useAppDispatch();
  const storeSession = useAppSelector((state) => state.gameSession?.session);
  const storeGame = useAppSelector((state) => state.game);
  console.log('grids', grids);
  console.log('solution', solution);

  function handleUpdateCompletion(): void {
    if (!storeSession) return;

    dispatch(
      updateSessionDataStorage({
        gameData: {
          gameComplete: !storeSession.gameData.gameComplete,
          score: storeSession.gameData.score + 1,
        },
        updateDb: true,
      })
    );
  }

  return (
    <div className='rounded border border-gray-300 p-4'>
      <p>Game Component</p>
      <p>Completion status: {`${storeSession.gameData?.gameComplete}`}</p>
      <p>Total stages: {storeGame.totalStages}</p>
      <p>Score: {storeSession.gameData.score}</p>
      <button
        className='bg-yellow-400 text-black hover:bg-yellow-600'
        onClick={handleUpdateCompletion}
      >
        Update Completion
      </button>
    </div>
  );
}
