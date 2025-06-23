import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { GameState, Key, setActiveWord } from '@/app/redux/slices/game-slice';
import { useEffect, useRef, useState } from 'react';
import ErrorMessage from '../../error/error-message';
import { BaseGridProps } from '../grid-wrapper';
import FiveGridBase from './five-grid-base';
import NineGridBase from './nine-grid-base';
import SevenGridBase from './seven-grid-base';

interface GridProps extends BaseGridProps {
  gridSize: number;
  baseGrid: FullGrid;
}

export default function Grid({
  gridSize,
  baseGrid,
  active,
  round,
  data,
  onComplete,
}: GridProps) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.credentials.id);
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

  const lastClickedCellRef = useRef<number | null>(null);

  const toggleWords = (cell: number) => {
    // Only do something if it's a cell in the game
    if (!activeCells.includes(cell)) return;

    // Set the toggled cell to the clicked cell
    setToggledCell(cell);

    // Find all words that include this cell (could be more than one in overlapping grids)
    const possibleToggles = wordCells.filter((word) => word.includes(cell));

    // If only one word contains this cell, set it as the toggled word
    if (possibleToggles.length === 1) {
      setToggledWord(possibleToggles[0]);
      lastClickedCellRef.current = cell;
      return;
    }

    // If the same cell is clicked consecutively, toggle to the next word containing this cell
    if (lastClickedCellRef.current === cell) {
      // Convert possible toggles and current toggled word to strings for comparison
      const possibleTogglesString = possibleToggles.map((word) =>
        JSON.stringify(word)
      );
      const toggledWordString = JSON.stringify(toggledWord);
      const startingIndex = possibleTogglesString.indexOf(toggledWordString);

      // Cycle to the next word, or loop back to the first if at the end
      if (
        startingIndex === -1 ||
        startingIndex === possibleToggles.length - 1
      ) {
        setToggledWord(possibleToggles[0]);
      } else {
        setToggledWord(possibleToggles[startingIndex + 1]);
      }
    } else {
      // If a new cell is clicked, stay on the current word if it's valid, otherwise set to the first possible word
      if (
        !possibleToggles.some(
          (word) => JSON.stringify(word) === JSON.stringify(toggledWord)
        )
      ) {
        setToggledWord(possibleToggles[0]);
      }
    }

    // Update the last clicked cell reference
    lastClickedCellRef.current = cell;
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
    dispatch(setActiveWord({ activeWord: data[0], userId }));
  }, []);

  useEffect(() => {
    const wordLocation = getWordLocation();
    dispatch(setActiveWord({ activeWord: data[wordLocation], userId }));
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

  const gridProps = {
    activeCells,
    toggledWord,
    toggledCell,
    grid,
    handleClick,
  };

  switch (gridSize) {
    case 5:
      return <FiveGridBase {...gridProps} />;
    case 7:
      return <SevenGridBase {...gridProps} />;
    case 9:
      return <NineGridBase {...gridProps} />;
    default:
      return <ErrorMessage />;
  }
}
