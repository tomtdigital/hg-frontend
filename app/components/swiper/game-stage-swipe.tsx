import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { GameState, setTabIndex } from '@/app/redux/slices/game-slice';
import { ReactNode } from 'react';
import Swiper from '.';

interface GameStageSwipeProps {
  children: ReactNode;
}

export default function GameStageSwipe({ children }: GameStageSwipeProps) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.credentials.id);
  const storeGame: GameState = useAppSelector((state) => state.game);
  const storeSession: StoredGameSession = useAppSelector(
    (state) => state.gameSession?.session
  );
  const { tabIndex, totalStages } = storeGame;
  const { stage } = storeSession.gameData;
  const nextStageUnlocked = stage >= tabIndex + 1 && stage <= totalStages;

  return (
    <Swiper
      onSwipeLeft={() => {
        if (nextStageUnlocked) {
          dispatch(setTabIndex({ tabIndex: tabIndex + 1, userId }));
        }
      }}
      onSwipeRight={() => {
        if (tabIndex > 0) {
          dispatch(setTabIndex({ tabIndex: tabIndex - 1, userId }));
        }
      }}
    >
      {children}
    </Swiper>
  );
}
