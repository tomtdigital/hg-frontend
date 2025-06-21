'use client';

import Image from 'next/image';
import { useActionState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { createGame } from '@/app/api/actions/create-game';

interface FormWord extends RequireOnly<Word, 'clue'> {
  letters: string[];
}

interface FormItem {
  name: string;
  gridType: GridType;
  words: FormWord[];
}

export interface CreateGameFormData {
  solution: string;
  publishDate: string;
  access: Access;
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

export default function CreateGameForm({
  imagePaths,
  config,
}: {
  imagePaths: GridType[];
  config: Partial<Record<GridType, number[][]>>;
}) {
  const { control, register, setValue, watch, getValues, handleSubmit } =
    useForm<CreateGameFormData>({
      // defaultValues: {
      //   ...(ExampleGame as CreateGameFormData),
      //   publishDate: new Date().toISOString().split('T')[0], // Default to today
      // },
      defaultValues: {
        solution: '',
        access: 'free',
        publishDate: new Date().toISOString().split('T')[0], // Default to today
        items: [
          {
            gridType: imagePaths[0] || '',
            words: [] as FormWord[],
          },
        ],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const initialState = {} as ActionState;
  const [state, formAction] = useActionState(
    async (_: ActionState, payload: CreateGameFormData) => {
      return await createGame(payload);
    },
    initialState
  );

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: CreateGameFormData) => {
    startTransition(() => {
      formAction(data);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mx-auto text-black'>
        {fields.map((field, index) => {
          const gridName = watch(`items.${index}.gridType`, field.gridType);
          const gridConfig = config[gridName as keyof typeof config];

          return (
            <div key={field.id} className='mb-1'>
              <div className='flex flex-col items-center'>
                <div className='mb-2'>
                  <label
                    htmlFor={`items.${index}.gridType`}
                    className='mb-1 block font-semibold'
                  >
                    Grid Type
                  </label>
                  <select
                    {...register(`items.${index}.gridType` as const)}
                    defaultValue={field.gridType}
                    className='mb-4'
                    onChange={(e) => {
                      const newPath = e.target.value;
                      setValue(`items.${index}.gridType`, newPath as GridType);
                      const newGridConfig =
                        config[newPath as keyof typeof config];
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
                <div>
                  <Image
                    src={`/grid-previews/${watch(`items.${index}.gridType`, field.gridType)}.png`}
                    alt='Selected'
                    width={200}
                    height={200}
                    className='mx-auto'
                  />
                </div>
                <div className='mb-4'>
                  <label
                    htmlFor={`items.${index}.name`}
                    className='mb-1 block font-semibold'
                  >
                    Name
                  </label>
                  <input
                    type='text'
                    {...register(`items.${index}.name`)}
                    className='border border-gray-300 p-1'
                    placeholder='Enter grid name'
                  />
                </div>
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
                        <label>Additional Info (e.g. word count)</label>
                        <input
                          type='text'
                          {...register(
                            `items.${index}.words.${wordIndex}.details.additionalInfo`
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
              <div className='mt-4 flex justify-center gap-4'>
                <button
                  type='button'
                  onClick={() => remove(index)}
                  className='rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
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
                  className='rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2'
                >
                  Reset Grid
                </button>
              </div>
              <hr className='mx-auto my-8 w-[80%] border-t border-gray-300' />
            </div>
          );
        })}
        <div className='mb-4 mt-4 flex flex-col items-center justify-center'>
          <div>
            <button
              type='button'
              className='rounded bg-green px-4 py-2 text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2'
              onClick={() =>
                append({
                  gridType: imagePaths[0] || '',
                  name: '',
                  words: [],
                })
              }
            >
              Add Grid
            </button>
          </div>
          <hr className='mx-auto my-8 w-[80%] border-t border-gray-300' />

          <div className='mb-4 mt-4'>
            <label htmlFor='solution' className='mb-1 block font-semibold'>
              Solution
            </label>
            <input
              type='text'
              id='solution'
              {...register('solution')}
              className='border border-gray-300 p-1'
              placeholder='Enter solution'
            />
          </div>
          <div className='mb-4 mt-4 block'>
            <label className='mb-1 block font-semibold'>Access</label>
            <div className='flex gap-4'>
              <label>
                <input
                  type='radio'
                  {...register('access')}
                  value='free'
                  className='mr-2'
                  defaultChecked
                />
                Free
              </label>
              <label>
                <input
                  type='radio'
                  {...register('access')}
                  value='premium'
                  className='mr-2'
                />
                Premium
              </label>
              <label>
                <input
                  type='radio'
                  {...register('access')}
                  value='owner'
                  className='mr-2'
                />
                Tom and Hannah
              </label>
            </div>
          </div>
          <div className='mb-4 mt-4'>
            <label htmlFor='publishDate' className='mb-1 block font-semibold'>
              Publish Date
            </label>
            <input
              type='date'
              id='publishDate'
              {...register('publishDate')}
              className='border border-gray-300 p-1'
            />
          </div>
          {state.status === 'rejected' && state?.error?.message && (
            <div className='my-2 rounded p-2 text-center text-red-500'>
              {state.error.message}
            </div>
          )}
          <div className='mx-auto'>
            <button
              type='submit'
              className='mt-4 rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50'
              disabled={isPending}
            >
              {isPending ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
