'use client';

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import {
  setGridSize,
  setStep,
  setColorScheme,
  setGridValues,
} from '@/app/redux/slices/create-crossword-slice';
import { useForm } from 'react-hook-form';

type FormData = {
  gridSize: number;
  colorScheme: ColorScheme;
};

export default function GridDesign() {
  const { register, handleSubmit } = useForm<FormData>();
  const dispatch = useAppDispatch();
  const { gridSize, colorScheme } = useAppSelector(
    (state) => state.createCrossword
  );

  const resetGrid = () => {
    dispatch(setStep(0));
    dispatch(setGridValues([]));
  };

  const onSubmit = (data: FormData) => {
    resetGrid();
    dispatch(setGridSize(data.gridSize));
    dispatch(setColorScheme(data.colorScheme));
    dispatch(setStep(1));
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
            defaultValue={gridSize}
            {...register('gridSize', {
              valueAsNumber: true,
              onChange: resetGrid,
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
              defaultValue={colorScheme?.empty}
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
                defaultValue={colorScheme?.selected}
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
                  defaultValue={colorScheme?.selectedText}
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
                defaultValue={colorScheme?.filled}
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
                defaultValue={colorScheme?.filledText}
                {...register('colorScheme.filledText')}
                className='mt-1 block rounded-md'
              />
            </div>
          </div>
        </div>
        <button
          type='submit'
          className='rounded-md bg-blue-600 px-4 py-2 text-white'
        >
          Apply
        </button>
      </form>
    </>
  );
}
