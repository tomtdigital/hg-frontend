import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { GameState, Key, setActiveWord } from '@/app/redux/slices/game-slice';
import { useEffect, useState } from 'react';
import { GridProps } from '../grid';
import SevenGridBase from './seven-grid-base';

const UGridSeven = ({ data, round, active, onComplete }: GridProps) => {
  // All downs then acrosses
  const baseGrid: FullGrid = [
    [
      { cell: 0, guess: '', answer: data[0].word[0].toUpperCase() },
      { cell: 5, guess: '', answer: data[0].word[1].toUpperCase() },
      { cell: 10, guess: '', answer: data[0].word[2].toUpperCase() },
      { cell: 15, guess: '', answer: data[0].word[3].toUpperCase() },
      { cell: 20, guess: '', answer: data[0].word[4].toUpperCase() },
      { cell: 25, guess: '', answer: data[0].word[5].toUpperCase() },
      { cell: 30, guess: '', answer: data[0].word[6].toUpperCase() },
    ],
    [
      { cell: 4, guess: '', answer: data[1].word[0].toUpperCase() },
      { cell: 9, guess: '', answer: data[1].word[1].toUpperCase() },
      { cell: 14, guess: '', answer: data[1].word[2].toUpperCase() },
      { cell: 19, guess: '', answer: data[1].word[3].toUpperCase() },
      { cell: 24, guess: '', answer: data[1].word[4].toUpperCase() },
      { cell: 29, guess: '', answer: data[1].word[5].toUpperCase() },
      { cell: 34, guess: '', answer: data[1].word[6].toUpperCase() },
    ],
    [
      { cell: 30, guess: '', answer: data[2].word[0].toUpperCase() },
      { cell: 31, guess: '', answer: data[2].word[1].toUpperCase() },
      { cell: 32, guess: '', answer: data[2].word[2].toUpperCase() },
      { cell: 33, guess: '', answer: data[2].word[3].toUpperCase() },
      { cell: 34, guess: '', answer: data[2].word[4].toUpperCase() },
    ],
  ];

  const dispatch = useAppDispatch();
  const storeGame: GameState = useAppSelector((state) => state.game);
  const storeSession: StoredGameSession = useAppSelector(
    (state) => state.gameSession?.session
  );
  const { keyPressed } = storeGame;
  const { finishedGrids } = storeSession.gameData;

  const [grid, setGrid] = useState<FullGrid>(baseGrid);
  const wordCells: number[][] = baseGrid.map((word: GridCells) =>
    word.map((letter: GridCell) => letter.cell)
  );
  const activeCells: number[] = wordCells.flatMap((cell) => cell);
  const [toggledWord, setToggledWord] = useState<number[]>(wordCells[0]);
  const [toggledCell, setToggledCell] = useState<number>(toggledWord[0]);

  const toggleWords = (cell: number) => {
    // Only do something if its a cell in the game
    if (activeCells.includes(cell)) {
      setToggledCell(cell);
      const possibleToggles = wordCells.filter((word) => word.includes(cell));
      // Just toggle the word if there is only one word to choose from
      if (possibleToggles.length === 1) {
        setToggledWord(possibleToggles[0]);
      } else {
        // If there is more than one word to toggle...
        const possibleTogglesString = possibleToggles.map((word) =>
          JSON.stringify(word)
        );
        const toggledWordString = JSON.stringify(toggledWord);
        const startingIndex = possibleTogglesString.indexOf(toggledWordString);
        // ...and the currently toggled word isnt a possiblility for toggling, toggle the first available word.
        //  Do the same if the word is included but the loop needs to start over
        if (
          startingIndex === -1 ||
          startingIndex === possibleToggles.length - 1
        ) {
          setToggledWord(possibleToggles[0]);
        } else {
          setToggledWord(possibleToggles[startingIndex + 1]);
        }
      }
    }
  };

  const handleClick = (cell: number) => {
    toggleWords(cell);
  };

  const getWordLocation = () => {
    const toggledWordString = JSON.stringify(toggledWord);
    const wordCellStrings = wordCells.map((cellSet) => JSON.stringify(cellSet));
    return wordCellStrings.indexOf(toggledWordString);
  };

  useEffect(() => {
    if (finishedGrids[round]?.length > 0) setGrid(finishedGrids[round]);
  }, [finishedGrids]);

  useEffect(() => {
    dispatch(setActiveWord(data[0]));
  }, []);

  useEffect(() => {
    const wordLocation = getWordLocation();
    dispatch(setActiveWord(data[wordLocation]));
  }, [toggledWord]);

  useEffect(() => {
    const handleKeyPress = ({ letter: guess }: Key) => {
      if (!guess) return;
      const newGrid = grid.map((word) =>
        word.map((letter) =>
          letter.cell === toggledCell
            ? { ...letter, guess: guess === 'DEL' ? '' : guess }
            : letter
        )
      );
      setGrid(newGrid);
      const cellPosition = toggledWord.indexOf(toggledCell);
      const wordLocation = getWordLocation();

      if (guess === 'DEL') {
        if (cellPosition === 0) {
          if (wordLocation === 0) {
            const lastWord = wordCells[wordCells.length - 1];
            setToggledWord(lastWord);
            setToggledCell(lastWord[lastWord.length - 1]);
          } else {
            const newWord = wordCells[wordLocation - 1];
            setToggledWord(newWord);
            if (newWord[newWord.length - 1] === toggledCell) {
              setToggledCell(newWord[newWord.length - 2]);
            } else {
              setToggledCell(newWord[newWord.length - 1]);
            }
          }
        } else {
          setToggledCell(toggledWord[cellPosition - 1]);
        }
      } else {
        if (cellPosition === toggledWord.length - 1) {
          if (wordLocation === wordCells.length - 1) {
            setToggledWord(wordCells[0]);
            setToggledCell(wordCells[0][0]);
          } else {
            const newWord = wordCells[wordLocation + 1];
            setToggledWord(newWord);
            if (newWord[0] === toggledCell) {
              setToggledCell(newWord[1]);
            } else {
              setToggledCell(newWord[0]);
            }
          }
        } else {
          setToggledCell(toggledWord[cellPosition + 1]);
        }
      }
    };

    if (keyPressed && active) handleKeyPress(keyPressed);
  }, [keyPressed]);

  useEffect(() => {
    if (
      active &&
      grid.every((word) =>
        word.every((letter) => letter.guess === letter.answer)
      )
    )
      if (onComplete) onComplete(grid);
  }, [active, grid, onComplete]);

  return (
    <SevenGridBase
      activeCells={activeCells}
      toggledWord={toggledWord}
      toggledCell={toggledCell}
      grid={grid}
      handleClick={handleClick}
    />
  );
};

export default UGridSeven;
