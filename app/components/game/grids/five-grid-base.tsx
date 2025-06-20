import { formatCell } from '@/app/utils/format-cell';

const FiveGridBase = ({
  activeCells,
  toggledWord,
  toggledCell,
  grid,
  handleClick,
}: BaseGridProps) => {
  return (
    <div className='flex h-[calc(51vh-104px)] justify-center'>
      <div className='grid w-[calc(51vh-104px-12%)] grid-cols-4 grid-rows-5'>
        {[...Array(20)].map((_, index) => {
          const { backgroundColor, textColor, value } = formatCell(
            index,
            activeCells,
            toggledWord,
            toggledCell,
            grid
          );

          return (
            <div
              key={`cell ${index}`}
              className={`flex items-center justify-center ${backgroundColor} ${
                activeCells.includes(index)
                  ? 'cursor-pointer border-[0.5px] border-solid border-darkGrey'
                  : ''
              }`}
              onClick={() => handleClick(index)}
            >
              <div className={`${textColor} text-[1.5em] device:text-[2.5em]`}>
                {value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FiveGridBase;
