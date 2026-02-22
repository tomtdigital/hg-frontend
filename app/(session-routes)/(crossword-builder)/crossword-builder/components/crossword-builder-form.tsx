'use client';

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { setCrosswordFormData } from '@/app/redux/slices/create-crossword-slice';
import { useForm } from 'react-hook-form';
import { useGridPlannerState } from '../hooks/use-grid-planner-state';
import { useGridValidation } from '../hooks/use-grid-validation';
import { getAcrossWordsFromGrid } from '../utils/get-across-words-from-grid';
import { getDownWordsFromGrid } from '../utils/get-down-words-from-grid';
import GridPlanner from './grid-planner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type FormData = {
  gridSize: number;
  colorScheme: ColorScheme;
  across: GridWord[];
  down: GridWord[];
};

export default function CreateCrosswordForm() {
  const { crosswordFormData } = useAppSelector(
    (state) => state.createCrossword
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  // Form values derived from the Redux store
  const savedGridSize = crosswordFormData?.gridSize;
  const savedColorScheme = crosswordFormData?.colorScheme;
  const savedGridData = crosswordFormData?.gridData;

  // Initialise the form with default values from the store
  const { register, handleSubmit, watch, getValues, setValue } =
    useForm<FormData>({
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
  const { gridValues, gridRefs, handleCellKeyPress } =
    useGridPlannerState(currentGridSize);

  // Grid planner validation management
  const { gridErrorMessage, validateGrid } = useGridValidation(currentGridSize);

  const [cluesUnlocked, setCluesUnlocked] = useState(false);

  // Grid planner processor - used to validate the grid and unlock clue inputs on success
  const processGrid = () => {
    const acrossWords = getAcrossWordsFromGrid(gridValues, currentGridSize);
    const downWords = getDownWordsFromGrid(gridValues, currentGridSize);
    const isValid = validateGrid(acrossWords, downWords);
    if (isValid) {
      setValue('across', acrossWords);
      setValue('down', downWords);
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

    dispatch(setCrosswordFormData(crosswordData));
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
            handleChange={handleCellKeyPress}
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
