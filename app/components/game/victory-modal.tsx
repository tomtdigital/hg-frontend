import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import {
  GameState,
  setVictoryModalVisible,
} from '@/app/redux/slices/game-slice';
import Modal from '../modal';

type VictoryModalProps = {
  visible: boolean;
  maxScore: number;
  allGridsComplete: boolean;
};

const VictoryModal = ({
  visible,
  maxScore,
  allGridsComplete,
}: VictoryModalProps) => {
  const dispatch = useAppDispatch();
  const storeGame: GameState = useAppSelector((state) => state.game);
  const storeSession: StoredGameSession = useAppSelector(
    (state) => state.gameSession?.session
  );
  const { totalStages } = storeGame;

  const { stage, cluesRevealed, score } = storeSession.gameData;

  const content = allGridsComplete ? (
    <>
      <p>Hannagrams Complete!</p>
      <p>Yessss!!! You did it!!! The Hannah's go fucking mental!!!</p>
      <p>
        Your final score was {score}/{maxScore}
      </p>
      {cluesRevealed.length > 0 && (
        <p>
          You needed {cluesRevealed.length} clue
          {cluesRevealed.length === 1 ? '' : 's'}
        </p>
      )}
      <button
        className='bg-yellow'
        onClick={() => {
          dispatch(setVictoryModalVisible(false));
        }}
      >
        Close
      </button>
    </>
  ) : (
    <>
      <p>Theme Solved!</p>
      <p>
        Yessss!!! You got the theme with only {stage + 1} of {totalStages}{' '}
        letters.
      </p>
      <p>
        See how close you can get to the maximum score of {maxScore} with the
        remaining grids!
      </p>
      <button
        className='bg-yellow'
        onClick={() => {
          dispatch(setVictoryModalVisible(false));
        }}
      >
        Close
      </button>
    </>
  );

  return <Modal visible={visible}>{content}</Modal>;
};

export default VictoryModal;
