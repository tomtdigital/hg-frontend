import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { updateSessionDataStorage } from '@/app/redux/slices/game-session-slice';
import { GameState } from '@/app/redux/slices/game-slice';

type ClueProps = {
  active: boolean;
};

const Clue = ({ active }: ClueProps) => {
  const dispatch = useAppDispatch();
  const storeGame: GameState = useAppSelector((state) => state.game);
  const storeSession: StoredGameSession = useAppSelector(
    (state) => state.gameSession?.session
  );
  const { activeWord } = storeGame;

  const { cluesRevealed } = storeSession.gameData;

  const handleClueReveal = (word: string) => {
    dispatch(
      updateSessionDataStorage({
        gameData: { cluesRevealed: [...cluesRevealed, word] },
        updateDb: false,
      })
    );
  };

  return (
    <div className='text-center'>
      <p className='text-[1.5em]'>{`${activeWord.anagram} ${
        activeWord.details?.pronoun ? '(p)' : ''
      } ${
        activeWord.details?.wordCount
          ? `(${activeWord.details?.wordCount})`
          : ''
      }`}</p>
      {cluesRevealed?.includes(activeWord.word) || !active ? (
        <p className='text-[1em]'>{activeWord.clue}</p>
      ) : (
        <button
          className='bg-green'
          onClick={() => handleClueReveal(activeWord.word)}
        >
          Reveal Description
        </button>
      )}
    </div>
  );
};

export default Clue;
