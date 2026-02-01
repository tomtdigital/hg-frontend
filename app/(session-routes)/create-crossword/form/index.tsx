'use client';

import { createRef, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import GridPlanner from './grid-planner';
import { calculateGridValues } from './utils/calculate-grid-values';
import { clearCell } from './utils/clear-cell';
import { getAcrossWordsFromGrid } from './utils/get-across-words-from-grid';
import { getDownWordsFromGrid } from './utils/get-down-words-from-grid';
import { getNextIndex } from './utils/get-next-index';
import { updateCellWithLetter } from './utils/update-cell-with-letter';

type FormData = {
  gridSize: number;
  colorScheme: ColorScheme;
  across: string[];
  down: string[];
};

type GridValidation = {
  isValid: boolean;
  message?: string;
};

const handleGridValidation = (
  acrossValues: GridWord[],
  downValues: GridWord[]
): GridValidation => {
  if (!acrossValues.length && !downValues.length) {
    return { isValid: false, message: 'No across or down words found.' };
  } else if (!acrossValues.length) {
    return { isValid: false, message: 'No across words found.' };
  } else if (!downValues.length) {
    return { isValid: false, message: 'No down words found.' };
  }
  return { isValid: true };
};

export default function CreateCrosswordForm() {
  const defaultGridSize = 3;
  const defaultColorScheme = {
    empty: '#000',
    filled: '#72e1f2',
    filledText: '#000000',
    selected: '#bfff00',
    selectedText: '#f800c2',
  };
  const [gridValues, setGridValues] = useState<Cell[]>(
    calculateGridValues(defaultGridSize, defaultColorScheme.empty)
  );
  const [cluesUnlocked, setCluesUnlocked] = useState(false);
  const [unlockCluesHelperText, setUnlockCluesHelperText] = useState('');
  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      gridSize: 3,
      colorScheme: {
        empty: '#000',
        filled: '#72e1f2',
        filledText: '#000000',
        selected: '#bfff00',
        selectedText: '#f800c2',
      },
      across: [],
      down: [],
    },
  });

  const workingGridSize = watch('gridSize');
  const workingGridArea = workingGridSize * workingGridSize;
  const workingColorScheme = watch('colorScheme');
  const workingAcross = watch('across');
  const workingDown = watch('down');
  const gridRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);

  // If the grid size or color scheme changes, we need to recalculate the grid values and refs
  useEffect(() => {
    if (
      workingGridArea !== gridValues.length ||
      workingGridArea !== gridRefs.current.length
    ) {
      setGridValues(
        calculateGridValues(workingGridSize, workingColorScheme.empty)
      );
      gridRefs.current = Array.from({ length: workingGridArea }, () =>
        createRef<HTMLDivElement>()
      );
    }
  }, [workingGridSize, workingGridArea]);

  // If the gridValues or gridSize change, hide clues
  useEffect(() => {
    if (!unlockCluesHelperText) setUnlockCluesHelperText('');
    if (!cluesUnlocked) return;
    setCluesUnlocked(false);
  }, [gridValues, workingGridSize]);

  const handleCellKeyPress = (
    index: number,
    e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (e.key === 'Tab') return;
    e.preventDefault();
    const key = e.key.toUpperCase();

    if (/^[A-Z]$/.test(key)) {
      setGridValues(updateCellWithLetter(index, key));
      return;
    }

    if (e.key === 'Backspace' || e.key === 'Delete') {
      setGridValues(clearCell(index));
      return;
    }

    const nextIndex = getNextIndex(index, e.key, workingGridSize);
    if (nextIndex !== index) {
      gridRefs?.current[nextIndex]?.current?.focus();
    }
  };

  const handleGridCheck = () => {
    const acrossValues = getAcrossWordsFromGrid(gridValues, workingGridSize);
    const downValues = getDownWordsFromGrid(gridValues, workingGridSize);
    const { isValid, message } = handleGridValidation(acrossValues, downValues);
    if (!isValid) {
      setUnlockCluesHelperText(message || 'Invalid grid.');
      return;
    }
    setValue(
      'across',
      acrossValues.map((word) => word.word)
    );
    setValue(
      'down',
      downValues.map((word) => word.word)
    );
    setCluesUnlocked(true);
  };

  const onSubmit = (data: FormData) => {
    const acrossValues = getAcrossWordsFromGrid(gridValues, data.gridSize);
    const downValues = getDownWordsFromGrid(gridValues, data.gridSize);
    const finalValues: CrosswordData = {
      gridSize: data.gridSize,
      colorScheme: data.colorScheme,
      gridData: {
        across: acrossValues.map((wordObj, index) => ({
          ...wordObj,
          clue: data.across[index],
        })),
        down: downValues.map((wordObj, index) => ({
          ...wordObj,
          clue: data.down[index],
        })),
      },
    };

    console.log(finalValues);
  };

  return (
    <>
      <h2 className='my-4 text-2xl font-bold'>Crossword Design</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 text-black'>
        <div>
          <label
            htmlFor='gridSize'
            className='block text-sm font-medium text-white'
          >
            Grid Size
          </label>
          <input
            type='number'
            id='gridSize'
            defaultValue={defaultGridSize}
            {...register('gridSize', {
              valueAsNumber: true,
              min: 3,
              max: 15,
            })}
            className='mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm'
          />
        </div>
        <div className='space-y-2'>
          <legend className='text-md block font-medium text-white'>
            Colors
          </legend>
          <div>
            <label htmlFor='emptyColor' className='text-sm text-white'>
              Empty
            </label>
            <input
              type='color'
              id='emptyColor'
              placeholder='#000'
              defaultValue={workingColorScheme?.empty}
              {...register('colorScheme.empty')}
              className='mt-1 block rounded-md'
            />
          </div>
          <div className='flex'>
            <div>
              <label htmlFor='selectedColor' className='text-sm text-white'>
                Selected
              </label>
              <input
                type='color'
                id='selectedColor'
                placeholder='#a1e646'
                defaultValue={workingColorScheme?.selected}
                {...register('colorScheme.selected')}
                className='mr-5 mt-1 block rounded-md'
              />
            </div>
            <div>
              <div>
                <label htmlFor='selectedColor' className='text-sm text-white'>
                  Selected text
                </label>
                <input
                  type='color'
                  id='selectedColor'
                  placeholder='#E0E0E0'
                  defaultValue={workingColorScheme?.selectedText}
                  {...register('colorScheme.selectedText')}
                  className='mt-1 block rounded-md'
                />
              </div>
            </div>
          </div>
          <div className='flex'>
            <div>
              <label htmlFor='filledColor' className='text-sm text-white'>
                Filled
              </label>
              <input
                type='color'
                id='filledColor'
                placeholder='#8b1f8b'
                defaultValue={workingColorScheme?.filled}
                {...register('colorScheme.filled')}
                className='mr-5 mt-1 block rounded-md'
              />
            </div>
            <div>
              <label htmlFor='filledTextColor' className='text-sm text-white'>
                Filled text
              </label>
              <input
                type='color'
                id='filledTextColor'
                placeholder='#a8e9fb'
                defaultValue={workingColorScheme?.filledText}
                {...register('colorScheme.filledText')}
                className='mt-1 block rounded-md'
              />
            </div>
          </div>
        </div>
        <div className='mt-4'>
          <GridPlanner
            gridSize={workingGridSize}
            gridRefs={gridRefs}
            gridValues={gridValues}
            colorScheme={workingColorScheme}
            handleChange={handleCellKeyPress}
          />
        </div>
        <div className='mt-4'>
          {cluesUnlocked ? (
            <>
              <h2 className='my-4 text-2xl font-bold text-white'>
                Crossword Clues
              </h2>
              <div>
                <h2 className='mb-4 text-lg font-medium'>Across</h2>
                <div className='space-y-4'>
                  {workingAcross.map((word, index) => (
                    <div key={index} className='flex items-center space-x-4'>
                      <label className='w-12 text-right'>{word}</label>
                      <input
                        type='text'
                        {...register(`across.${index}`)}
                        className='flex-1 rounded-md border border-gray-300 p-2 shadow-sm'
                        placeholder={`clue for ${word}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className='mb-4 text-lg font-medium'>Down</h2>
                <div className='space-y-4'>
                  {workingDown.map((word, index) => (
                    <div key={index} className='flex items-center space-x-4'>
                      <label className='w-12 text-right'>{word}</label>
                      <input
                        type='text'
                        {...register(`down.${index}`)}
                        className='flex-1 rounded-md border border-gray-300 p-2 shadow-sm'
                        placeholder={`clue for ${word}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <button
                type='submit'
                className='mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
              >
                Submit Crossword
              </button>
            </>
          ) : (
            <>
              <button
                type='button'
                className='rounded-md bg-blue-600 px-4 py-2 text-white'
                onClick={handleGridCheck}
              >
                Calculate Clues
              </button>
              <p className='mt-2 text-sm text-red-500'>
                {unlockCluesHelperText}
              </p>
            </>
          )}
        </div>
      </form>
    </>
  );
}
