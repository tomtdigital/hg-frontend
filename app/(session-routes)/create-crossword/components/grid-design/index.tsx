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
            className='block text-sm font-medium text-gray-700'
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
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Colors
          </label>
          <div className='space-y-2'>
            <div>
              <label htmlFor='emptyColor' className='text-sm text-gray-600'>
                Empty
              </label>
              <input
                type='text'
                id='emptyColor'
                placeholder='#000'
                defaultValue={colorScheme?.empty || '#000'}
                {...register('colorScheme.empty')}
                pattern='#[0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?'
                className='mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm'
              />
            </div>
            <div>
              <label htmlFor='selectedColor' className='text-sm text-gray-600'>
                Selected
              </label>
              <input
                type='text'
                id='selectedColor'
                placeholder='#a1e646'
                defaultValue={colorScheme?.selected || '#a1e646'}
                {...register('colorScheme.selected')}
                pattern='#[0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?'
                className='mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm'
              />
            </div>
            <div>
              <label htmlFor='selectedColor' className='text-sm text-gray-600'>
                Selected text
              </label>
              <input
                type='text'
                id='selectedColor'
                placeholder='#E0E0E0'
                defaultValue={colorScheme?.selectedText || '#000'}
                {...register('colorScheme.selectedText')}
                pattern='#[0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?'
                className='mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm'
              />
            </div>
            <div>
              <label htmlFor='filledColor' className='text-sm text-gray-600'>
                Filled
              </label>
              <input
                type='text'
                id='filledColor'
                placeholder='#8b1f8b'
                defaultValue={colorScheme?.filled || '#8b1f8b'}
                {...register('colorScheme.filled')}
                pattern='#[0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?'
                className='mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm'
              />
            </div>
            <div>
              <label
                htmlFor='filledTextColor'
                className='text-sm text-gray-600'
              >
                Filled text
              </label>
              <input
                type='text'
                id='filledTextColor'
                placeholder='#a8e9fb'
                defaultValue={colorScheme?.filledText || '#a8e9fb'}
                {...register('colorScheme.filledText')}
                pattern='#[0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?'
                className='mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm'
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
