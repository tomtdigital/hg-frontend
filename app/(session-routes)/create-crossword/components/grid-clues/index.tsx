import { useForm } from 'react-hook-form';
import { getAcrossWordsFromGrid } from '../grid-populator/utils/get-across-words-from-grid';
import { getDownWordsFromGrid } from '../grid-populator/utils/get-down-words-from-grid';
import { useAppSelector } from '@/app/redux/hooks';

type GridClueFormValues = {
  across: string[];
  down: string[];
};

export default function GridClues({
  gridValues = [],
  gridSize = 0,
}: {
  gridValues?: Cell[];
  gridSize?: number;
}) {
  const crosswordData = useAppSelector((state) => state.createCrossword);
  const acrossValues = getAcrossWordsFromGrid(gridValues, gridSize);
  const downValues = getDownWordsFromGrid(gridValues, gridSize);
  //   const { register, handleSubmit } = useForm({
  const { register, handleSubmit } = useForm<GridClueFormValues>({
    defaultValues: {
      across: acrossValues.map(() => ''),
      down: downValues.map(() => ''),
    },
  });

  const onSubmit = (data: GridClueFormValues) => {
    const gridData = {
      across: acrossValues.map((wordObj, index) => ({
        ...wordObj,
        clue: data.across[index],
      })),
      down: downValues.map((wordObj, index) => ({
        ...wordObj,
        clue: data.down[index],
      })),
    };
    const finalValues: CrosswordData = {
      gridSize: crosswordData.gridSize,
      colorScheme: crosswordData.colorScheme!,
      gridData,
    };

    console.log(finalValues);
  };

  return (
    <>
      <h2 className='my-4 text-2xl font-bold'>Crossword Clues</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 text-black'>
        <div>
          <h2 className='mb-4 text-lg font-medium'>Across</h2>
          <div className='space-y-4'>
            {acrossValues.map((wordObj, index) => (
              <div key={index} className='flex items-center space-x-4'>
                <label className='w-12 text-right'>{wordObj.word}</label>
                <input
                  type='text'
                  {...register(`across.${index}`)}
                  className='flex-1 rounded-md border border-gray-300 p-2 shadow-sm'
                  placeholder={`clue for ${wordObj.word}`}
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className='mb-4 text-lg font-medium'>Down</h2>
          <div className='space-y-4'>
            {downValues.map((wordObj, index) => (
              <div key={index} className='flex items-center space-x-4'>
                <label className='w-12 text-right'>{wordObj.word}</label>
                <input
                  type='text'
                  {...register(`down.${index}`)}
                  className='flex-1 rounded-md border border-gray-300 p-2 shadow-sm'
                  placeholder={`clue for ${wordObj.word}`}
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
      </form>
    </>
  );
}
