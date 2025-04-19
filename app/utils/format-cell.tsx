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
    backgroundColor = 'bg-yellow';
    textColor = 'text-black';
  }
  if (toggledWord.includes(cellIndex)) {
    backgroundColor = 'bg-purple';
    textColor = 'text-white';
  }
  if (toggledCell === cellIndex) backgroundColor = 'bg-darkPurple';
  const value = grid
    .flatMap((word) => word.find((letter) => letter.cell === cellIndex)?.guess)
    .find((letter) => typeof letter === 'string');

  return { backgroundColor, textColor, value };
};
