export const formatCell = (
  cellIndex: number,
  activeCells: number[],
  toggledWord: number[],
  toggledCell: number,
  grid: FullGrid
) => {
  let backgroundColor;
  let textColor;
  if (activeCells.includes(cellIndex)) {
    backgroundColor = 'bg-white';
    textColor = 'text-black';
  }
  if (toggledWord.includes(cellIndex)) {
    backgroundColor = 'bg-lightGrey';
    textColor = toggledCell === cellIndex ? 'text-white' : 'text-black';
  }
  if (toggledCell === cellIndex) backgroundColor = 'bg-darkGrey';
  const value = grid
    .flatMap((word) => word.find((letter) => letter.cell === cellIndex)?.guess)
    .find((letter) => typeof letter === 'string');

  return { backgroundColor, textColor, value };
};
