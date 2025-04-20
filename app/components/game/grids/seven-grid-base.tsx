import { formatCell } from '@/app/utils/format-cell';

const SevenGridBase = ({
  activeCells,
  toggledWord,
  toggledCell,
  grid,
  handleClick,
}: BaseGridProps) => {
  return (
    <div className='flex h-[calc(51vh-104px)] justify-center'>
      <div className='grid w-[calc(50vh-104px-12%)] grid-cols-5 grid-rows-7'>
        {[...Array(35)].map((_, index) => {
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
              className={`flex cursor-pointer items-center justify-center ${backgroundColor} ${
                activeCells.includes(index)
                  ? 'border-[0.5px] border-solid border-darkGrey'
                  : ''
              }`}
              onClick={() => handleClick(index)}
            >
              <div className={`${textColor} device:text-[2em] text-[1em]`}>
                {value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SevenGridBase;
