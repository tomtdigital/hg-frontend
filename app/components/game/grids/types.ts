type BaseGridProps = {
  activeCells: number[];
  toggledWord: number[];
  toggledCell: number;
  grid: FullGrid;
  handleClick: (index: number) => void;
};
