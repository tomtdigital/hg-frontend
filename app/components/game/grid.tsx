import { updateSessionDataStorage } from '@/app/redux/slices/game-session-slice';
import { setAdvanceModalVisible } from '@/app/redux/slices/game-slice';
import EGridSeven from './grids/e-grid-seven';
import { useAppDispatch } from '@/app/redux/hooks';
import IGridNine from './grids/i-grid-nine';
import LGridFive from './grids/l-grid-five';
import OGridFive from './grids/o-grid-five';
import UGridSeven from './grids/u-grid-seven';
import VGridNine from './grids/v-grid-nine';

export type GridProps = {
  type?: string;
  active: boolean;
  round: number;
  data: GridData;
  onComplete?: (grid: FullGrid) => void;
};

export default function Grid({ type, active, round, data }: GridProps) {
  const dispatch = useAppDispatch();
  const handleComplete = (grid: FullGrid) => {
    dispatch(
      updateSessionDataStorage({
        updateDb: false,
        gameData: {
          lastCompletedGrid: grid,
        },
      })
    );
    setAdvanceModalVisible(true);
  };

  switch (type) {
    case 'l-5':
      return (
        <LGridFive
          active={active}
          round={round}
          data={data}
          onComplete={handleComplete}
        />
      );
    case 'o-5':
      return (
        <OGridFive
          active={active}
          round={round}
          data={data}
          onComplete={handleComplete}
        />
      );
    case 'e-7':
      return (
        <EGridSeven
          active={active}
          round={round}
          data={data}
          onComplete={handleComplete}
        />
      );
    case 'u-7':
      return (
        <UGridSeven
          active={active}
          round={round}
          data={data}
          onComplete={handleComplete}
        />
      );
    case 'i-9':
      return (
        <IGridNine
          active={active}
          round={round}
          data={data}
          onComplete={handleComplete}
        />
      );
    case 'v-9':
      return (
        <VGridNine
          active={active}
          round={round}
          data={data}
          onComplete={handleComplete}
        />
      );

    default:
      break;
  }
}
