'use client';

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import {
  resetCrosswordGridData,
  updateCrosswordData,
  updateGridValues,
} from '@/app/redux/slices/create-crossword-slice';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGridPlannerState } from '../hooks/use-grid-planner-state';
import { useGridValidation } from '../hooks/use-grid-validation';
import { generateEmptyGrid } from '../utils/generate-empty-grid';
import { getAcrossWordsFromGrid } from '../utils/get-across-words-from-grid';
import { getDownWordsFromGrid } from '../utils/get-down-words-from-grid';
import GridPlanner from './grid-planner';
import { resetGridRefs } from '../utils/reset-grid-refs';

type FormData = {
  gridSize: number;
  colorScheme: ColorScheme;
  across: GridWord[];
  down: GridWord[];
};

export default function CreateCrosswordForm() {
  const { crosswordData } = useAppSelector((state) => state.createCrossword);
  const dispatch = useAppDispatch();
  const router = useRouter();
  // Form values derived from the Redux store
  const savedGridSize = crosswordData?.gridSize;
  const savedColorScheme = crosswordData?.colorScheme;
  const savedGridData = crosswordData?.gridData;
  const isPopulatedGrid = !!(
    savedGridData?.across?.length && savedGridData?.down?.length
  );

  // Initialise the form with default values from the store
  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      gridSize: savedGridSize,
      colorScheme: savedColorScheme,
      across: savedGridData?.across || [],
      down: savedGridData?.down || [],
    },
  });

  // Active form values, watched for changes
  const currentGridSize = watch('gridSize');
  const currentColorScheme = watch('colorScheme');
  const currentAcrossWords = watch('across');
  const currentDownWords = watch('down');

  // Grid planner state management
  const { gridValues, setGridValues, gridRefs, handleCellKeyPress } =
    useGridPlannerState(currentGridSize);

  // Grid planner validation management
  const { gridErrorMessage, validateGrid } = useGridValidation(currentGridSize);

  // Show/hide clue inputs based on whether the grid has valid words
  const [cluesUnlocked, setCluesUnlocked] = useState<boolean>(isPopulatedGrid);

  // Handle changes to the grid size input - this will reset the grid values and lock clues until the new grid is validated
  const handleGridSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCluesUnlocked(false); // Lock clues until grid is revalidated
    const newSize = +e.target.value;
    setValue('gridSize', newSize); // Update form state with new grid size
    const workingGridArea = newSize * newSize;
    if (
      workingGridArea !== gridValues.length ||
      workingGridArea !== gridRefs.current.length
    ) {
      setGridValues(generateEmptyGrid(workingGridArea));
      gridRefs.current = resetGridRefs(newSize);
    }
  };

  // Handle cell changes in the grid planner
  const handleGridChange = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    handleCellKeyPress(e, index, setCluesUnlocked);
  };

  // Grid planner processor - used to validate the grid and unlock clue inputs on success
  const processGrid = () => {
    const acrossWords = getAcrossWordsFromGrid(gridValues, currentGridSize);
    const downWords = getDownWordsFromGrid(gridValues, currentGridSize);
    const isValid = validateGrid(acrossWords, downWords);
    if (isValid) {
      setValue(
        'across',
        acrossWords.map((word) => ({ ...word, clue: '' }))
      );
      setValue(
        'down',
        downWords.map((word) => ({ ...word, clue: '' }))
      );
      dispatch(resetCrosswordGridData()); // Only reset store values if valid
      setCluesUnlocked(true);
    }
  };

  const onSubmit = (data: FormData) => {
    const crosswordData: CrosswordData = {
      gridSize: data.gridSize,
      colorScheme: data.colorScheme,
      gridData: {
        across: data.across,
        down: data.down,
      },
    };
    dispatch(updateGridValues(gridValues));
    dispatch(updateCrosswordData(crosswordData));
    router.push('/crossword-preview');
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
            defaultValue={savedGridSize}
            {...register('gridSize', {
              valueAsNumber: true,
              min: 3,
              max: 15,
            })}
            onChange={handleGridSizeChange}
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
              defaultValue={currentColorScheme?.empty}
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
                defaultValue={currentColorScheme?.selected}
                {...register('colorScheme.selected')}
                className='mr-5 mt-1 block rounded-md'
              />
            </div>
            <div>
              <label htmlFor='selectedTextColor' className='text-sm text-white'>
                Selected text
              </label>
              <input
                type='color'
                id='selectedTextColor'
                placeholder='#E0E0E0'
                defaultValue={currentColorScheme?.selectedText}
                {...register('colorScheme.selectedText')}
                className='mt-1 block rounded-md'
              />
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
                defaultValue={currentColorScheme?.filled}
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
                defaultValue={currentColorScheme?.filledText}
                {...register('colorScheme.filledText')}
                className='mt-1 block rounded-md'
              />
            </div>
          </div>
        </div>
        <div className='mt-4'>
          <GridPlanner
            gridSize={currentGridSize}
            gridRefs={gridRefs}
            gridValues={gridValues}
            colorScheme={currentColorScheme}
            handleChange={handleGridChange}
          />
        </div>
        <div className='mt-4'>
          {cluesUnlocked ? (
            <>
              <h2 className='my-4 text-2xl font-bold text-white'>
                Crossword Clues
              </h2>
              <div className='mb-6'>
                <div>
                  <h2 className='mb-4 text-lg font-medium'>Across</h2>
                  <div className='mb-4 space-y-4'>
                    {currentAcrossWords.map((word, index) => (
                      <div key={index} className='flex items-center space-x-4'>
                        <label className='w-12 text-right'>{word.word}</label>
                        <input
                          type='text'
                          {...register(`across.${index}.clue`)}
                          className='flex-1 rounded-md border border-gray-300 p-2 shadow-sm'
                          placeholder={`clue for ${word.word}`}
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className='mb-4 text-lg font-medium'>Down</h2>
                  <div className='mb-4 space-y-4'>
                    {currentDownWords.map((word, index) => (
                      <div key={index} className='flex items-center space-x-4'>
                        <label className='w-12 text-right'>{word.word}</label>
                        <input
                          type='text'
                          {...register(`down.${index}.clue`)}
                          className='flex-1 rounded-md border border-gray-300 p-2 shadow-sm'
                          placeholder={`clue for ${word.word}`}
                          required
                        />
                      </div>
                    ))}
                  </div>
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
                onClick={processGrid}
              >
                Calculate Clues
              </button>
              <p className='mt-2 text-sm text-red-500'>{gridErrorMessage}</p>
            </>
          )}
        </div>
      </form>
    </>
  );
}
