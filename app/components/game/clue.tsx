import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { updateSessionDataStorage } from '@/app/redux/slices/game-session-slice';
import { GameState } from '@/app/redux/slices/game-slice';
import { useMemo, useState } from 'react';
import Modal from '../modal';
import { useToggledWordIndex } from '@/app/hooks/use-toggled-word-index';
import Swiper from '../swiper';

type ClueProps = {
  active: boolean;
  gridSize: number;
};

const Clue = ({ active, gridSize }: ClueProps) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const storeGame: GameState = useAppSelector((state) => state.game);
  const storeSession: StoredGameSession = useAppSelector(
    (state) => state.gameSession?.session
  );
  const { activeWord } = storeGame;
  const { cluesRevealed } = storeSession.gameData;
  const { increaseIndex, decreaseIndex } = useToggledWordIndex(gridSize);

  const revealClue = cluesRevealed?.includes(activeWord.word) || !active;
  const anagram = activeWord.anagram?.toUpperCase();
  const minWordScore = activeWord.word?.length || 0;
  const maxWordScore = minWordScore * 3;
  const clueFontSize =
    minWordScore > 35
      ? 'text-[1.2em] h-lg:text-[1.5em]'
      : 'text-[1em] h-lg:text-[1.2em]';
  const wordDetails = activeWord.details || {};
  // results in e.g. "A B C D", "A B C D (p) (pl) (additional info)" etc.
  const wordDetailsString = useMemo(
    () =>
      [
        activeWord.details?.letterSplit || anagram,
        wordDetails?.pronoun ? '(p)' : '',
        wordDetails?.plural ? '(pl)' : '',
        wordDetails?.additionalInfo
          ? wordDetails.additionalInfo.match(/^\(.*\)$/)
            ? wordDetails.additionalInfo
            : `(${wordDetails.additionalInfo})`
          : '',
      ]
        .filter(Boolean)
        .join(' '),
    [activeWord]
  );

  const handleClueReveal = (word: string) => {
    dispatch(
      updateSessionDataStorage({
        gameData: { cluesRevealed: [...cluesRevealed, word] },
        updateDb: false,
      })
    );
  };

  return (
    <div className='flex-column flex h-full w-full items-center justify-center bg-darkGrey px-1 text-white'>
      <Swiper
        onLeft={decreaseIndex}
        onRight={increaseIndex}
        enableSwipe={false}
      >
        <div className='items-center justify-center bg-darkGrey text-center'>
          <div className='flex items-center justify-center bg-darkGrey px-2 py-1'>
            <div className=''>
              <p className='block text-[1.2em] h-lg:text-[1.5em]'>
                {wordDetailsString}
              </p>
            </div>
            {!revealClue && (
              <div>
                <button
                  className='ml-4 block px-4 py-2 text-[1em] h-lg:text-[1.2em]'
                  onClick={() => setShowModal(true)}
                >
                  🔍
                </button>
              </div>
            )}
          </div>
          <div>
            {revealClue && (
              <p className={clueFontSize}>
                <em>{activeWord.clue}</em>
              </p>
            )}
          </div>
        </div>
      </Swiper>
      <Modal visible={showModal}>
        <div className='w-full p-6 text-center'>
          <p className='mb-2 text-[1.2em] text-black'>
            Are you sure you want to reveal the clue for <em>'{anagram}'</em> ?
          </p>
          <p className='mb-4 text-[1.2em] text-black'>
            With a clue, you will only receive {minWordScore} of {maxWordScore}{' '}
            available points for this word
          </p>
          <div className='w-full'>
            <button
              className='mx-auto mb-4 block bg-purple px-6 py-3 text-[1.2em] text-white'
              onClick={() => {
                handleClueReveal(activeWord.word);
                setShowModal(false);
              }}
            >
              Yes, reveal clue
            </button>
            <button
              className='mx-auto block bg-black px-6 py-3 text-[1.2em] text-white'
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Clue;
