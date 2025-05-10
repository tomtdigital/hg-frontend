import { useAppDispatch } from '@/app/redux/hooks';
import { updateSessionDataStorage } from '@/app/redux/slices/game-session-slice';
import { setAdvanceModalVisible } from '@/app/redux/slices/game-slice';
import { getBaseGrid } from '@/app/utils/get-base-grid';
import Grid from './grids/grid';

export interface BaseGridProps {
  active: boolean;
  round: number;
  data: GridData;
  onComplete?: (grid: FullGrid) => void;
}

interface GridWrapperProps extends BaseGridProps {
  type: GridType;
}

export default function GridWrapper({
  type,
  active,
  round,
  data,
}: GridWrapperProps) {
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
    dispatch(setAdvanceModalVisible(true));
  };

  const gridSize = +type!.split('-')[1];
  const baseGrid = getBaseGrid(type, data);

  return (
    <Grid
      gridSize={gridSize}
      baseGrid={baseGrid}
      active={active}
      round={round}
      data={data}
      onComplete={handleComplete}
    />
  );
}
