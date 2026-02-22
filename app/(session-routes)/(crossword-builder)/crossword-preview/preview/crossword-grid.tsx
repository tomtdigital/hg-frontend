'use client';

import { useState, useRef, useEffect, useMemo } from 'react';

interface CrosswordGridProps {
  gridSize: number;
  gridData: CrossWordGridData;
  colorScheme: ColorScheme;
  onComplete?: () => void;
}

export default function CrosswordGrid({
  gridSize,
  gridData,
  colorScheme,
  onComplete,
}: CrosswordGridProps) {
  const [toggledWord, setToggledWord] = useState<GridWord | null>(null);
  const [toggledCell, setToggledCell] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [currentDirection, setCurrentDirection] = useState<'across' | 'down'>(
    'across'
  );
  const lastClickedCellRef = useRef<number | null>(null);
  const gridCellsRef = useRef<Map<number, HTMLDivElement>>(new Map());
  const completedRef = useRef(false);

  // Initialize with first word on mount
  useEffect(() => {
    if (gridData.across.length > 0 && !toggledWord) {
      const firstWord = gridData.across[0];
      setToggledWord(firstWord);
      setToggledCell(firstWord.indices[0]);
      setCurrentDirection('across');
    }
  }, [gridData]);

  // Focus the current cell when it changes
  useEffect(() => {
    if (toggledCell !== null) {
      const cell = gridCellsRef.current.get(toggledCell);
      if (cell) {
        cell.focus();
      }
    }
  }, [toggledCell]);

  // Build a map of cell index to clue number for quick lookup
  const cellToClueNumber = new Map<number, number>();
  gridData.across.forEach((word) => {
    cellToClueNumber.set(word.indices[0], word.clueNumber);
  });
  gridData.down.forEach((word) => {
    if (!cellToClueNumber.has(word.indices[0])) {
      cellToClueNumber.set(word.indices[0], word.clueNumber);
    }
  });

  // Build a map of all cells involved in the crossword
  const allActiveCells = new Set<number>();
  [...gridData.across, ...gridData.down].forEach((word) => {
    word.indices.forEach((idx) => allActiveCells.add(idx));
  });

  // Build a map of cell index to word answer
  const cellAnswers = useMemo(() => {
    const map = new Map<number, string>();
    [...gridData.across, ...gridData.down].forEach((word) => {
      word.indices.forEach((idx, i) => {
        map.set(idx, word.word[i]);
      });
    });
    return map;
  }, [gridData]);

  // Build ordered list: all acrosses then all downs
  const orderedWords = useMemo(
    () => [...gridData.across, ...gridData.down],
    [gridData]
  );

  const getWordsForCell = (cell: number) => {
    return orderedWords.filter((word) => word.indices.includes(cell));
  };

  const toggleWords = (cell: number) => {
    // Only toggle if it's an active cell
    if (!allActiveCells.has(cell)) return;

    setToggledCell(cell);

    // Find all words that include this cell
    const possibleWords = getWordsForCell(cell);

    // If only one word, set it
    if (possibleWords.length === 1) {
      setToggledWord(possibleWords[0]);
      const isAcross = gridData.across.some(
        (word) => word.clueNumber === possibleWords[0].clueNumber
      );
      setCurrentDirection(isAcross ? 'across' : 'down');
      lastClickedCellRef.current = cell;
      return;
    }

    // If multiple words, toggle between them
    if (lastClickedCellRef.current === cell && toggledWord) {
      const currentWordIndex = possibleWords.findIndex(
        (word) => word.clueNumber === toggledWord.clueNumber
      );

      if (
        currentWordIndex === -1 ||
        currentWordIndex === possibleWords.length - 1
      ) {
        setToggledWord(possibleWords[0]);
        const isAcross = gridData.across.some(
          (word) => word.clueNumber === possibleWords[0].clueNumber
        );
        setCurrentDirection(isAcross ? 'across' : 'down');
      } else {
        setToggledWord(possibleWords[currentWordIndex + 1]);
        const isAcross = gridData.across.some(
          (word) =>
            word.clueNumber === possibleWords[currentWordIndex + 1].clueNumber
        );
        setCurrentDirection(isAcross ? 'across' : 'down');
      }
    } else {
      // New cell clicked
      if (
        !possibleWords.some(
          (word) => word.clueNumber === toggledWord?.clueNumber
        )
      ) {
        setToggledWord(possibleWords[0]);
        const isAcross = gridData.across.some(
          (word) => word.clueNumber === possibleWords[0].clueNumber
        );
        setCurrentDirection(isAcross ? 'across' : 'down');
      }
    }

    lastClickedCellRef.current = cell;
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (toggledCell === null || toggledCell === undefined || !toggledWord)
      return;

    const key = e.key.toUpperCase();

    // Handle letter input
    if (/^[A-Z]$/.test(key)) {
      e.preventDefault();
      if (completedRef.current) return;
      setUserAnswers((prev) => ({
        ...prev,
        [toggledCell]: key,
      }));

      // Move to next cell in word
      const cellPosition = toggledWord.indices.indexOf(toggledCell);
      if (cellPosition < toggledWord.indices.length - 1) {
        setToggledCell(toggledWord.indices[cellPosition + 1]);
      }
      return;
    }

    // Handle backspace
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      if (completedRef.current) return;
      const cellPosition = toggledWord.indices.indexOf(toggledCell);

      if (userAnswers[toggledCell]) {
        // Clear current cell
        setUserAnswers((prev) => ({
          ...prev,
          [toggledCell]: '',
        }));
      } else if (cellPosition > 0) {
        // Move to previous cell if current is empty
        const prevCell = toggledWord.indices[cellPosition - 1];
        setToggledCell(prevCell);
        setUserAnswers((prev) => ({
          ...prev,
          [prevCell]: '',
        }));
      }
      return;
    }

    // Handle left/right arrow keys to cycle through ordered words
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();

      const relevantWords =
        currentDirection === 'across' ? gridData.across : gridData.down;

      // Find current word in relevant list
      const currentWordIndex = relevantWords.findIndex(
        (word) => word.clueNumber === toggledWord?.clueNumber
      );

      let nextWord;
      if (e.key === 'ArrowLeft') {
        if (currentWordIndex === 0) {
          // Switch to other direction at end
          const otherDirection =
            currentDirection === 'across' ? gridData.down : gridData.across;
          if (otherDirection.length === 0) return;
          nextWord = otherDirection[otherDirection.length - 1];
          setCurrentDirection(
            currentDirection === 'across' ? 'down' : 'across'
          );
        } else {
          nextWord = relevantWords[currentWordIndex - 1];
        }
      } else {
        if (currentWordIndex === relevantWords.length - 1) {
          // Switch to other direction at end
          const otherDirection =
            currentDirection === 'across' ? gridData.down : gridData.across;
          if (otherDirection.length === 0) return;
          nextWord = otherDirection[0];
          setCurrentDirection(
            currentDirection === 'across' ? 'down' : 'across'
          );
        } else {
          nextWord = relevantWords[currentWordIndex + 1];
        }
      }

      setToggledWord(nextWord);
      setToggledCell(nextWord.indices[0]);
      lastClickedCellRef.current = nextWord.indices[0];
      return;
    }

    // Handle up/down arrow keys to navigate within word
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const cellPosition = toggledWord.indices.indexOf(toggledCell);

      if (e.key === 'ArrowUp' && cellPosition > 0) {
        setToggledCell(toggledWord.indices[cellPosition - 1]);
      } else if (
        e.key === 'ArrowDown' &&
        cellPosition < toggledWord.indices.length - 1
      ) {
        setToggledCell(toggledWord.indices[cellPosition + 1]);
      }
    }
  };

  // Check if all clues are filled correctly
  useEffect(() => {
    const allCorrect = orderedWords.every((word) => {
      return word.indices.every(
        (idx) => userAnswers[idx] === cellAnswers.get(idx)
      );
    });

    if (
      allCorrect &&
      Object.keys(userAnswers).length > 0 &&
      !completedRef.current
    ) {
      completedRef.current = true;
      onComplete?.();
    }
  }, [userAnswers, orderedWords, cellAnswers, onComplete]);

  // Auto-cycle to next word when current word is completed
  useEffect(() => {
    if (!toggledWord || completedRef.current) return;

    // Check if current word is complete
    const isWordComplete = toggledWord.indices.every(
      (idx) => userAnswers[idx] === cellAnswers.get(idx)
    );

    if (!isWordComplete) return;

    const relevantWords =
      currentDirection === 'across' ? gridData.across : gridData.down;

    // Find current word index in relevant direction
    const currentWordIndex = relevantWords.findIndex(
      (word) => word.clueNumber === toggledWord.clueNumber
    );

    if (currentWordIndex === -1) return;

    let nextWord;
    let nextDirection: 'across' | 'down' = currentDirection;

    if (currentWordIndex === relevantWords.length - 1) {
      // Switch to other direction
      const otherDirection =
        currentDirection === 'across' ? gridData.down : gridData.across;
      if (otherDirection.length === 0) return;
      nextWord = otherDirection[0];
      nextDirection = currentDirection === 'across' ? 'down' : 'across';
    } else {
      // Move to next word in same direction
      nextWord = relevantWords[currentWordIndex + 1];
    }

    setCurrentDirection(nextDirection);
    setToggledWord(nextWord);
    setToggledCell(nextWord.indices[0]);
    lastClickedCellRef.current = nextWord.indices[0];
  }, [userAnswers, currentDirection, gridData, cellAnswers, toggledWord]);

  // ...existing code...

  // Calculate grid layout
  const totalCells = gridSize * gridSize;
  const gridArray = Array.from({ length: totalCells }, (_, i) => i);

  return (
    <div className='space-y-8 text-white'>
      <h2 className='text-2xl font-bold'>Crossword Preview</h2>

      {/* Grid Display */}
      <div
        className='inline-block'
        style={{
          display: 'inline-grid',
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          gap: '0px',
          width: 'fit-content',
        }}
      >
        {gridArray.map((cellIndex) => {
          const isActive = allActiveCells.has(cellIndex);
          const isSelected = toggledWord?.indices.includes(cellIndex);
          const isCurrentCell = toggledCell === cellIndex;
          const clueNumber = cellToClueNumber.get(cellIndex);
          const userAnswer = userAnswers[cellIndex] || '';

          const bgColor = isActive ? colorScheme.filled : colorScheme.empty;
          const textColor = isActive
            ? colorScheme.filledText
            : colorScheme.empty;
          const selectedBgColor = isSelected ? colorScheme.selected : bgColor;
          const selectedTextColor = isSelected
            ? colorScheme.selectedText
            : textColor;

          return (
            <div
              key={cellIndex}
              ref={(el) => {
                if (el) {
                  gridCellsRef.current.set(cellIndex, el);
                } else {
                  gridCellsRef.current.delete(cellIndex);
                }
              }}
              onKeyDown={handleKeyPress}
              onClick={() => toggleWords(cellIndex)}
              tabIndex={isActive ? 0 : -1}
              className='relative flex h-12 w-12 items-center justify-center text-xl font-bold outline-none'
              style={{
                backgroundColor: selectedBgColor,
                color: selectedTextColor,
                cursor: isActive ? 'pointer' : 'default',
                border: isCurrentCell
                  ? `4px solid ${selectedTextColor}`
                  : '1px solid rgb(75, 85, 99)',
              }}
            >
              {userAnswer && <span>{userAnswer}</span>}
              {clueNumber !== undefined && (
                <span className='absolute left-0.5 top-0.5 text-xs font-bold'>
                  {clueNumber}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Clues Section */}
      <div className='grid grid-cols-2 gap-8'>
        {/* Across Clues */}
        <div>
          <h3 className='mb-4 text-lg font-bold'>Across</h3>
          <div className='space-y-3'>
            {gridData.across.map((word) => {
              const isSelected =
                toggledWord?.clueNumber === word.clueNumber &&
                currentDirection === 'across';
              return (
                <div
                  key={word.clueNumber}
                  style={{
                    backgroundColor: isSelected
                      ? colorScheme.selected
                      : undefined,
                    color: isSelected ? colorScheme.selectedText : undefined,
                    borderRadius: isSelected ? '0.375rem' : undefined,
                  }}
                >
                  <p className='text-sm'>
                    <span className='font-bold'>{word.clueNumber}.</span>{' '}
                    {word.clue}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Down Clues */}
        <div>
          <h3 className='mb-4 text-lg font-bold'>Down</h3>
          <div className='space-y-3'>
            {gridData.down.map((word) => (
              <div
                key={word.clueNumber}
                style={{
                  backgroundColor:
                    toggledWord?.clueNumber === word.clueNumber &&
                    currentDirection === 'down'
                      ? colorScheme.selected
                      : undefined,
                  color:
                    toggledWord?.clueNumber === word.clueNumber &&
                    currentDirection === 'down'
                      ? colorScheme.selectedText
                      : undefined,
                  borderRadius:
                    toggledWord?.clueNumber === word.clueNumber &&
                    currentDirection === 'down'
                      ? '0.375rem'
                      : undefined,
                }}
              >
                <p className='text-sm'>
                  <span className='font-bold'>{word.clueNumber}.</span>{' '}
                  {word.clue}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
