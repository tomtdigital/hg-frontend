import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setToggledWordIndex } from '../redux/slices/game-slice';

export const useToggledWordIndex = (
  limit: number,
  startIndex: number = 0
): {
  increaseIndex: () => void;
  decreaseIndex: () => void;
  index: number;
  setIndex: (index: number) => void;
} => {
  const [index, setIndex] = useState(startIndex);
  const userId = useAppSelector((state) => state.user.credentials.id);
  const toggledWordIndex = useAppSelector(
    (state) => state.game.toggledWordIndex
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Whenever index changes, update toggledWordIndex in the store
    dispatch(setToggledWordIndex({ toggledWordIndex: index, userId }));
  }, [dispatch, userId, index, startIndex]);

  const increaseIndex = () => {
    console.log('Increasing index:', index, 'Limit:', limit);
    if (index < limit - 1) {
      console.log('within limit, increasing index');
      setIndex(index + 1);
    } else {
      console.log('reached limit, resetting index to 0');
      setIndex(0);
    }
  };
  const decreaseIndex = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(limit - 1);
    }
  };

  return {
    increaseIndex,
    decreaseIndex,
    index: toggledWordIndex || 0, // Expose the current index if needed
    setIndex, // Expose the setter for external control
  };
};
