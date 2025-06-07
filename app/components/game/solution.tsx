import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { updateSessionDataStorage } from '@/app/redux/slices/game-session-slice';
import {
  GameState,
  Key,
  setTabIndex,
  setVictoryModalVisible,
} from '@/app/redux/slices/game-slice';
import { useEffect, useState } from 'react';
import VictoryModal from './victory-modal';
import Link from 'next/link';
import Modal from '../modal';

type SolutionProps = {
  text: string;
  active: boolean;
  maxScore: number;
  grids: GameGrid;
};

const Solution = ({ text, active, maxScore, grids }: SolutionProps) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.credentials.id);
  const storeGame: GameState = useAppSelector((state) => state.game);
  const storeSession: StoredGameSession = useAppSelector(
    (state) => state.gameSession?.session
  );
  const { totalStages, keyPressed, victoryModalVisible } = storeGame;

  const { stage, solutionGuess, correctSolution, finishedGrids, gameComplete } =
    storeSession.gameData;

  const word = text.replace(/ /g, '');
  const multipleWords = text.includes(' ');
  const [toggledCell, setToggledCell] = useState(0);
  const allGridsComplete = stage === totalStages;
  const [reveals, setReveals] = useState<boolean[]>(() =>
    Array.from({ length: totalStages }, () => false)
  );
  const [showThemeModal, setShowThemeModal] = useState(false);

  const revealGridName = (index: number) => {
    if (index < 0 || index >= stage) return;
    const newReveals = [...reveals];
    newReveals[index] = true;
    setReveals(newReveals);
  };

  useEffect(() => {
    const handleKeyPress = ({ letter }: Key) => {
      if (!letter) return;
      let newSolutionGuess: string;
      if (letter === 'DEL') {
        if (toggledCell === 0) {
          newSolutionGuess =
            ' ' + solutionGuess.substring(1, solutionGuess.length);
          setToggledCell(word.length - 1);
        } else {
          const partOne = solutionGuess.substring(0, toggledCell);
          const partTwo = solutionGuess.substring(
            toggledCell + 1,
            solutionGuess.length
          );
          setToggledCell(toggledCell - 1);
          newSolutionGuess = partOne + ' ' + partTwo;
        }
        dispatch(
          updateSessionDataStorage({
            gameData: { solutionGuess: newSolutionGuess },
            updateDb: false,
          })
        );
      } else {
        if (toggledCell === 0) {
          newSolutionGuess =
            letter + solutionGuess.substring(1, solutionGuess.length);
          setToggledCell(toggledCell + 1);
        } else {
          const partOne = solutionGuess.substring(0, toggledCell);
          const partTwo = solutionGuess.substring(
            toggledCell + 1,
            solutionGuess.length
          );
          if (toggledCell === word.length - 1) {
            setToggledCell(0);
          } else {
            setToggledCell(toggledCell + 1);
          }
          newSolutionGuess = partOne + letter + partTwo;
        }
        dispatch(
          updateSessionDataStorage({
            gameData: { solutionGuess: newSolutionGuess },
            updateDb: false,
          })
        );
      }
    };

    if (keyPressed && active && !correctSolution) handleKeyPress(keyPressed);
  }, [keyPressed]);

  useEffect(() => {
    if (
      solutionGuess.toUpperCase() === word.toUpperCase() &&
      !correctSolution
    ) {
      if (allGridsComplete) {
        dispatch(
          updateSessionDataStorage({
            gameData: {
              gameComplete: true,
              correctSolution: true,
            },
            updateDb: true,
          })
        );
      } else {
        dispatch(
          updateSessionDataStorage({
            gameData: { correctSolution: true },
            updateDb: true,
          })
        );
      }
      dispatch(setVictoryModalVisible({ victoryModalVisible: true, userId }));
    }
  }, [solutionGuess, word]);

  return (
    <>
      <div className='h-[calc(54vh)]'>
        <h1 className='text-center text-header1'>{`${
          correctSolution ? '' : 'Enter '
        } Solution`}</h1>
        {correctSolution ? (
          <div className='w-full text-center'>
            <p className='my-5'>You guessed right!!! 🎉</p>
          </div>
        ) : (
          <div className='mb-4'>
            <p className='my-2'>
              Each individual grid has a theme that ties it's clues together.
            </p>
            <p className='my-2'>
              If you combine the letters from each grid (some can repeat), you
              will get the solution word.
            </p>
            <p>The solution word also ties all of the themes together.</p>
          </div>
        )}
        <div className='flex justify-center p-4'>
          <div className={`grid w-[100%] grid-cols-${word.length}`}>
            {[...Array(word.length)].map((_, index) => {
              const background = index === toggledCell ? 'darkGrey' : 'white';
              const color = index === toggledCell ? 'white' : 'black';
              return (
                <div
                  key={`cell ${index}`}
                  onClick={() => {
                    setToggledCell(index);
                  }}
                  className={`cursor-pointer border-solid border-black bg-${background} flex min-h-[3.5em] items-center justify-center border-[1px]`}
                >
                  <div className={`text-${color}`}>{solutionGuess[index]}</div>
                </div>
              );
            })}
          </div>
        </div>
        {multipleWords && !correctSolution && (
          <p className='my-2'>Word count: {text.split(' ').length}</p>
        )}
        <button
          className='mx-auto mb-2 mt-4 block rounded bg-purple p-2 text-center text-white'
          onClick={() => {
            setShowThemeModal(true);
          }}
        >
          View themes
        </button>
        {correctSolution && (
          <div className='w-full'>
            {!victoryModalVisible && (
              <>
                {gameComplete ? (
                  <Link
                    href='/games'
                    className='mx-auto mt-2 block w-[10em] rounded bg-purple p-2 text-center text-white'
                  >
                    Back to Games
                  </Link>
                ) : (
                  <button
                    className='mx-auto mt-2 rounded bg-purple p-2 text-white'
                    onClick={() => {
                      const tab = finishedGrids.length;
                      dispatch(setTabIndex({ tabIndex: tab, userId }));
                    }}
                  >
                    Back to Grids
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
      <Modal visible={showThemeModal}>
        <div className='scrollable h-[400px] overflow-y-auto'>
          <p className='mb-4 text-lg font-bold text-black'>Grid Themes</p>
          <div className='mb-4 flex flex-col gap-2'>
            {finishedGrids.map((finished, index) => (
              <div key={`grid-theme-${finished[0][0].answer}`} className=''>
                <ul>
                  <li className='flex items-start gap-2'>
                    {reveals[index] ? (
                      <span className='font-bold text-black'>
                        <span>
                          <u>{grids[index].name.charAt(0).toUpperCase()}</u>
                        </span>
                        {grids[index].name.slice(1).toUpperCase()}
                      </span>
                    ) : (
                      <button
                        className='mr-2 inline-block rounded bg-purple px-2 py-1 text-white'
                        onClick={() => revealGridName(index)}
                      >
                        Reveal
                      </button>
                    )}
                    <span className='text-black'>
                      {grids[index].data.map((item) => item.word).join(', ')}
                    </span>
                  </li>
                </ul>
              </div>
            ))}
          </div>
          <button
            className='mx-auto mt-4 block rounded bg-purple px-6 py-3 text-lg text-white'
            onClick={() => {
              setShowThemeModal(false);
            }}
          >
            Close
          </button>
        </div>
      </Modal>
      <VictoryModal
        visible={victoryModalVisible}
        allGridsComplete={allGridsComplete}
        maxScore={maxScore}
      />
    </>
  );
};

export default Solution;
