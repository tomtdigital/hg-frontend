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
      <p className='mb-4 text-lg font-bold text-black'>Hannagrams Complete!</p>
      <p className='mb-2 text-base text-black'>
        Yessss!!! You did it!!! The Hannah's go mental!!!
      </p>
      <p className='mb-2 text-base text-black'>
        Your final score was <span className='font-semibold'>{score}</span>/
        <span className='font-semibold'>{maxScore}</span>
      </p>
      {cluesRevealed.length > 0 && (
        <p className='mb-4 text-base text-black'>
          You needed{' '}
          <span className='font-semibold'>{cluesRevealed.length}</span> clue
          {cluesRevealed.length === 1 ? '' : 's'}
        </p>
      )}
      <button
        className='mx-auto mt-4 block rounded bg-purple px-6 py-3 text-lg text-white'
        onClick={() => {
          dispatch(setVictoryModalVisible(false));
        }}
      >
        Close
      </button>
    </>
  ) : (
    <>
      <p className='mb-4 text-lg font-bold text-black'>Theme Solved!</p>
      <p className='mb-2 text-base text-black'>
        Yessss!!! You got the theme with only{' '}
        <span className='font-semibold'>{stage + 1}</span> of{' '}
        <span className='font-semibold'>{totalStages}</span> letters.
      </p>
      <p className='mb-2 text-base text-black'>
        See how close you can get to the maximum score of{' '}
        <span className='font-semibold'>{maxScore}</span> with the remaining
        grids!
      </p>
      <p className='mb-4 text-base text-black'>
        Until you complete all of the grids, the game will be marked as
        incomplete.
      </p>
      <button
        className='mx-auto mt-4 block rounded bg-purple px-6 py-3 text-lg text-white'
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
