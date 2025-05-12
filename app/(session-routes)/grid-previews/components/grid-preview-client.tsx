'use client';

import Image from 'next/image';
import { useFieldArray, useForm } from 'react-hook-form';

interface FormWord extends RequireOnly<Word, 'clue'> {
  letters: string[];
}

interface FormItem {
  path: string;
  words: FormWord[];
}

interface FormValues {
  items: FormItem[];
}

const getOverlappingNumbersWithPositions = (
  gridConfig: number[][] | undefined
): { number: number; positions: [number, number][] }[] => {
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

  return Array.from(positionsMap.entries())
    .filter(([, positions]) => positions.length > 1)
    .map(([num, positions]) => ({ number: num, positions }));
};

export default function GridPreviewClient({
  imagePaths,
  config,
}: {
  imagePaths: GridType[];
  config: Record<GridType, number[][]>;
}) {
  const { control, register, setValue, watch, getValues, handleSubmit } =
    useForm<FormValues>({
      defaultValues: {
        items: [
          {
            path: imagePaths[0] || '',
            words: [] as FormWord[],
          },
        ],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit = (data: unknown) => {
    console.log({ data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mx-auto grid max-w-screen-lg grid-cols-1 gap-4 text-black sm:grid-cols-2 lg:grid-cols-3'>
        {fields.map((field, index) => {
          const gridName = watch(`items.${index}.path`, field.path);
          const gridConfig = config[gridName as keyof typeof config];

          return (
            <div key={field.id} className='mb-1'>
              <select
                {...register(`items.${index}.path` as const)}
                defaultValue={field.path}
                className='mr-4'
              >
                {imagePaths.map((path) => (
                  <option key={path} value={path}>
                    {path}
                  </option>
                ))}
              </select>
              <button
                type='button'
                onClick={() => remove(index)}
                className='text-white'
              >
                Remove
              </button>
              <div className='mt-1'>
                <Image
                  src={`/grid-previews/${watch(`items.${index}.path`, field.path)}.png`}
                  alt='Selected'
                  width={100}
                  height={100}
                />
              </div>
              <div className='mt-2'>
                {gridConfig?.map((_: number[], wordIndex: number) => {
                  const wordConfig = gridConfig[wordIndex];
                  return (
                    <div key={wordIndex} className='mb-1'>
                      <legend>Word {wordIndex + 1}</legend>
                      <label
                        htmlFor={`items.${index}.words.${wordIndex}.letters`}
                      >
                        Letters
                      </label>
                      <div className='grid grid-cols-10 gap-1'>
                        {Array.from({ length: wordConfig.length }).map(
                          (_, letterIndex) => {
                            const cell = wordConfig[letterIndex];
                            const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(
                              ''
                            );

                            return (
                              <select
                                key={letterIndex}
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
                                className='w-full'
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
                    </div>
                  );
                })}
              </div>
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
      <pre>{JSON.stringify(getValues(), null, 2)}</pre>
      <button type='submit' className='mt-4 text-white'>
        Submit
      </button>
    </form>
  );
}
