import { formatCell } from '@/app/utils/format-cell';

const NineGridBase = ({
  activeCells,
  toggledWord,
  toggledCell,
  grid,
  handleClick,
}: BaseGridProps) => {
  return (
    <div className='flex h-[calc(51vh-104px)] justify-center'>
      <div className='grid w-[calc(51vh-104px-12%)] grid-cols-7 grid-rows-9'>
        {[...Array(63)].map((_, index) => {
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
              <div className={`${textColor} device:text-[1.5em] text-[1em]`}>
                {value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NineGridBase;
