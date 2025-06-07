type BaseGridProps = {
  activeCells: number[];
  toggledWord: number[];
  toggledCell: number;
  grid: FullGrid;
  handleClick: (index: number) => void;
};

type LowercaseLetter =
  `${'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'}`;
type GridSuffix = '-5' | '-7' | '-9';
type GridType = `${Lowercase<`${LowercaseLetter}`>}${GridSuffix}`;
