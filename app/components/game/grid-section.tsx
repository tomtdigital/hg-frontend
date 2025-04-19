import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { updateSessionDataStorage } from '@/app/redux/slices/game-session-slice';
import {
  GameState,
  Key,
  setAdvanceModalVisible,
  setKeyPressed,
  setTabIndex,
  setVictoryModalVisible,
} from '@/app/redux/slices/game-slice';
import AdvanceModal from './advance-modal';
import Grid from './grid';
import VictoryModal from './victory-modal';

interface GridSectionProps {
  type: string;
  round: number;
  active: boolean;
  data: GridData;
  praise: string[];
  maxScore: number;
}

export function GridSection({
  type,
  round,
  active,
  data,
  praise,
  maxScore,
}: GridSectionProps) {
  const dispatch = useAppDispatch();
  const storeGame: GameState = useAppSelector((state) => state.game);
  const storeSession: StoredGameSession = useAppSelector(
    (state) => state.gameSession?.session
  );
  const { tabIndex, totalStages, advanceModalVisible, victoryModalVisible } =
    storeGame;
  const {
    stage,
    cluesRevealed,
    score,
    lastCompletedGrid,
    finishedGrids,
    correctSolution,
  } = storeSession.gameData;

  const allGridsComplete = stage + 1 === totalStages;

  const advance = () => {
    // Calculate/set score
    const wordsAvailable = data.map((item) => item.word);
    let toAdd = 0;

    for (let x = 0; x < wordsAvailable.length; x++) {
      const word = wordsAvailable[x];
      if (cluesRevealed.includes(wordsAvailable[x])) {
        toAdd += word.length;
      } else {
        toAdd += word.length * 3;
      }
    }

    // Reset values
    dispatch(setKeyPressed({} as Key));
    dispatch(setAdvanceModalVisible(false));

    const total = score + toAdd;
    const gameComplete = allGridsComplete && correctSolution;
    // Update session data
    dispatch(
      updateSessionDataStorage({
        updateDb: true,
        gameData: {
          score: total,
          finishedGrids: [...finishedGrids, lastCompletedGrid],
          lastCompletedGrid,
          gameComplete,
          stage: gameComplete ? stage + 1 : stage,
        },
      })
    );

    if (gameComplete) {
      dispatch(setVictoryModalVisible(true));
    } else {
      // Advance game
      dispatch(setTabIndex(tabIndex + 1));
    }
  };

  return (
    <>
      <Grid type={type} active={active} round={round} data={data} />
      <AdvanceModal
        visible={advanceModalVisible}
        stage={stage}
        data={data}
        praise={praise}
        handleAdvance={() => advance()}
      />
      <VictoryModal
        visible={victoryModalVisible}
        maxScore={maxScore}
        allGridsComplete={allGridsComplete}
      />
    </>
  );
}
