'use client';

import { createGrid } from '@/app/api/actions/create-grid';
import Image from 'next/image';
import { useActionState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import ExampleGame from '../../../api/mocks/example-game.json';

interface FormWord extends RequireOnly<Word, 'clue'> {
  letters: string[];
}

interface FormItem {
  path: string;
  words: FormWord[];
}

export interface FormValues {
  items: FormItem[];
}

const getOverlappingNumbersWithPositions = (
  gridConfig: number[][] | undefined
): { number: number; hex: string; positions: [number, number][] }[] => {
  if (!gridConfig) return [];
  const positionsMap = new Map<number, [number, number][]>();
  gridConfig.forEach((row, rowIndex) => {
    row.forEach((num, colIndex) => {
      if (!positionsMap.has(num)) {
        positionsMap.set(num, []);
      }
      positionsMap.get(num)?.push([rowIndex, colIndex]);
    });
  });

  const lightColors = [
    '#ADD8E6', // Light Blue
    '#FFFACD', // Lemon Chiffon
    '#E6E6FA', // Lavender
    '#FFDAB9', // Peach Puff
    '#F5DEB3', // Wheat
    '#D8BFD8', // Thistle
    '#FFB6C1', // Light Pink
    '#98FB98', // Pale Green
    '#B0E0E6', // Powder Blue
    '#FFE4E1', // Misty Rose
  ];

  return Array.from(positionsMap.entries())
    .filter(([, positions]) => positions.length > 1)
    .map(([num, positions], index) => ({
      number: num,
      positions,
      hex: lightColors[index % lightColors.length],
    }));
};

export default function GridPreviewClient({
  imagePaths,
  config,
}: {
  imagePaths: GridType[];
  config: Partial<Record<GridType, number[][]>>;
}) {
  const { control, register, setValue, watch, getValues, handleSubmit } =
    useForm<FormValues>({
      defaultValues:
        // {
        //   items: [
        //     {
        //       path: imagePaths[0] || '',
        //       words: [] as FormWord[],
        //     },
        //   ],
        // },
        ExampleGame,
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const initialState = {} as ActionState;
  const [state, formAction, pending] = useActionState(
    async (_: ActionState, payload: FormValues) => {
      return await createGrid(payload);
    },
    initialState
  );

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: FormValues) => {
    startTransition(() => {
      formAction(data);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mx-auto text-black'>
        {fields.map((field, index) => {
          const gridName = watch(`items.${index}.path`, field.path);
          const gridConfig = config[gridName as keyof typeof config];

          return (
            <div key={field.id} className='mb-1'>
              <div className='flex justify-center'>
                <div className=''>
                  <select
                    {...register(`items.${index}.path` as const)}
                    defaultValue={field.path}
                    className='mb-4 mr-4'
                    onChange={(e) => {
                      const newPath = e.target.value;
                      // Update the path in the form state
                      setValue(`items.${index}.path`, newPath);

                      // Get the new grid config
                      const newGridConfig =
                        config[newPath as keyof typeof config];

                      // Reset the words array for this item
                      setValue(
                        `items.${index}.words`,
                        newGridConfig
                          ? newGridConfig.map((wordConfig) => ({
                              clue: '',
                              letters: Array(wordConfig.length).fill(''),
                              details: {},
                            }))
                          : [],
                        { shouldDirty: true, shouldValidate: true }
                      );
                    }}
                  >
                    {imagePaths.map((path) => (
                      <option key={path} value={path}>
                        {path}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='mt-1'>
                <Image
                  src={`/grid-previews/${watch(`items.${index}.path`, field.path)}.png`}
                  alt='Selected'
                  width={200}
                  height={200}
                  className='mx-auto'
                />
              </div>
              <div
                className={`mx-auto mt-2 flex max-w-screen-xl flex-wrap justify-center gap-4 text-black`}
              >
                {gridConfig?.map((_: number[], wordIndex: number) => {
                  const wordConfig = gridConfig[wordIndex];
                  return (
                    <div
                      key={wordIndex}
                      className='mb-2 rounded border border-gray-200 p-2'
                    >
                      <legend>Word {wordIndex + 1}</legend>
                      <label
                        htmlFor={`items.${index}.words.${wordIndex}.letters`}
                      >
                        Letters
                      </label>
                      <div className=''>
                        {Array.from({ length: wordConfig.length }).map(
                          (_, letterIndex) => {
                            const cell = wordConfig[letterIndex];
                            const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(
                              ''
                            );

                            const overlappingNumbers =
                              getOverlappingNumbersWithPositions(gridConfig);
                            const overlappingNumber = overlappingNumbers.find(
                              ({ number }) =>
                                number === gridConfig[wordIndex][letterIndex]
                            );

                            const backgroundColor = overlappingNumber
                              ? overlappingNumber.hex
                              : 'white';

                            return (
                              <select
                                key={letterIndex}
                                style={{ backgroundColor }}
                                {...register(
                                  `items.${index}.words.${wordIndex}.letters.${letterIndex}`
                                )}
                                defaultValue=''
                                onChange={(e) => {
                                  const selectedLetter = e.target.value;

                                  const matchingPositions =
                                    getOverlappingNumbersWithPositions(
                                      gridConfig
                                    ).find(({ number }) => number === cell)
                                      ?.positions || [];

                                  matchingPositions.forEach(
                                    ([rowIdx, colIdx]) => {
                                      if (
                                        rowIdx === wordIndex &&
                                        colIdx === letterIndex
                                      )
                                        return;

                                      const currentWord =
                                        getValues(
                                          `items.${index}.words.${rowIdx}.letters`
                                        ) || [];

                                      const updatedWord = [...currentWord];
                                      updatedWord[colIdx] = selectedLetter;

                                      setValue(
                                        `items.${index}.words.${rowIdx}.letters`,
                                        updatedWord
                                      );
                                    }
                                  );

                                  const currentLetters =
                                    getValues(
                                      `items.${index}.words.${wordIndex}.letters`
                                    ) || [];

                                  const updatedLetters = [...currentLetters];
                                  updatedLetters[letterIndex] = selectedLetter;

                                  setValue(
                                    `items.${index}.words.${wordIndex}.letters`,
                                    updatedLetters
                                  );
                                }}
                              >
                                <option value=''>_</option>
                                {alphabet.map((letter) => (
                                  <option key={letter} value={letter}>
                                    {letter}
                                  </option>
                                ))}
                              </select>
                            );
                          }
                        )}
                      </div>
                      <label>Clue</label>
                      <input
                        type='text'
                        {...register(`items.${index}.words.${wordIndex}.clue`)}
                        className='w-full border border-gray-300 p-1'
                      />
                      <div className='mt-2'>
                        <label>
                          <input
                            type='checkbox'
                            {...register(
                              `items.${index}.words.${wordIndex}.details.pronoun`
                            )}
                          />{' '}
                          Pronoun
                        </label>
                      </div>
                      <div className='mt-2'>
                        <label>
                          <input
                            type='checkbox'
                            {...register(
                              `items.${index}.words.${wordIndex}.details.plural`
                            )}
                          />
                          Plural
                        </label>
                      </div>
                      <div className='mt-2'>
                        <label>Word Count</label>
                        <input
                          type='text'
                          {...register(
                            `items.${index}.words.${wordIndex}.details.wordCount`
                          )}
                          className='w-full border border-gray-300 p-1'
                        />
                      </div>
                      <div className='mt-2'>
                        <label>Letter Split</label>
                        <input
                          type='text'
                          {...register(
                            `items.${index}.words.${wordIndex}.details.letterSplit`
                          )}
                          className='w-full border border-gray-300 p-1'
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                type='button'
                onClick={() => remove(index)}
                className='bg-red-500 hover:bg-red-600 focus:ring-red-400 mt-4 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-offset-2'
              >
                Remove Grid
              </button>
              <button
                type='button'
                onClick={() => {
                  setValue(
                    `items.${index}.words`,
                    gridConfig?.map((wordConfig) => ({
                      clue: '',
                      letters: Array(wordConfig.length).fill(''),
                      details: {},
                    })) || [],
                    { shouldDirty: true, shouldValidate: true }
                  );
                }}
                className='bg-red-500 hover:bg-red-600 focus:ring-red-400 mt-4 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-offset-2'
              >
                Reset Grid
              </button>
            </div>
          );
        })}
        <button
          type='button'
          className='text-white'
          onClick={() =>
            append({
              path: imagePaths[0] || '',
              words: [],
            })
          }
        >
          Add Grid
        </button>
      </div>
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
      <button type='submit' className='mt-4 text-white' disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
