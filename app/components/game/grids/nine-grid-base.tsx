import { formatCell } from '@/app/utils/format-cell';

const NineGridBase = ({
  activeCells,
  toggledWord,
  toggledCell,
  grid,
  handleClick,
}: BaseGridProps) => {
  return (
    <div className='flex h-[calc(60vh-104px)] justify-center'>
      <div className='grid w-[calc(60vh-104px-12%)] grid-cols-7 grid-rows-9'>
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
                  ? 'border-darkGrey border-[0.5px] border-solid'
                  : ''
              }`}
              onClick={() => handleClick(index)}
            >
              <div className={`${textColor}`}>{value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NineGridBase;
