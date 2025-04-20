import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { updateSessionDataStorage } from '@/app/redux/slices/game-session-slice';
import {
  GameState,
  Key,
  setVictoryModalVisible,
} from '@/app/redux/slices/game-slice';
import { useEffect, useState } from 'react';
import VictoryModal from './victory-modal';

type SolutionProps = {
  text: string;
  active: boolean;
  maxScore: number;
};

const Solution = ({ text, active, maxScore }: SolutionProps) => {
  const dispatch = useAppDispatch();
  const storeGame: GameState = useAppSelector((state) => state.game);
  const storeSession: StoredGameSession = useAppSelector(
    (state) => state.gameSession?.session
  );
  const { totalStages, keyPressed, victoryModalVisible } = storeGame;

  const { stage, solutionGuess, correctSolution } = storeSession.gameData;

  const word = text.replace(/ /g, '');
  const multipleWords = text.includes(' ');
  const [toggledCell, setToggledCell] = useState(0);
  const allGridsComplete = stage === totalStages;

  useEffect(() => {
    const handleKeyPress = ({ letter }: Key) => {
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
      dispatch(setVictoryModalVisible(true));
    }
  }, [solutionGuess, word]);

  return (
    <>
      <div className='h-[calc(60vh-104px)]'>
        <h1 className='text-center text-header1'>{`${
          correctSolution ? '' : 'Enter '
        } Solution`}</h1>
        {!correctSolution && (
          <>
            <p className='my-2'>
              Can you guess the theme that ties everything together?
            </p>
            <p className='my-2'>Use all of the grid shapes</p>
          </>
        )}
        <div className='flex justify-center p-4'>
          <div className={`grid w-[100%] grid-cols-${word.length}`}>
            {[...Array(word.length)].map((_, index) => {
              const background = index === toggledCell ? 'purple' : 'yellow';
              const color = index === toggledCell ? 'white' : 'black';
              return (
                <div
                  key={`cell ${index}`}
                  onClick={() => {
                    setToggledCell(index);
                  }}
                  className={`cursor-pointer border-solid border-black bg-${background} flex min-h-[2em] items-center justify-center border-[1px]`}
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
      </div>
      <VictoryModal
        visible={victoryModalVisible}
        allGridsComplete={allGridsComplete}
        maxScore={maxScore}
      />
    </>
  );
};

export default Solution;
