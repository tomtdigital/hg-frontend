import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type GameState = {
  tabIndex: number;
  totalStages: number;
  keyPressed: string;
  advanceModalVisible: boolean;
  victoryModalVisible: boolean;
  activeWord: Word;
};

const initialState: GameState = {
  tabIndex: 0,
  totalStages: 0,
  keyPressed: '',
  advanceModalVisible: false,
  victoryModalVisible: false,
  activeWord: {} as Word,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setTabIndex(state, action: PayloadAction<number>) {
      state.tabIndex = action.payload;
    },
    setTotalStages(state, action: PayloadAction<number>) {
      state.totalStages = action.payload;
    },
    setKeyPressed(state, action: PayloadAction<string>) {
      state.keyPressed = action.payload;
    },
    setAdvanceModalVisible(state, action: PayloadAction<boolean>) {
      state.advanceModalVisible = action.payload;
    },
    setVictoryModalVisible(state, action: PayloadAction<boolean>) {
      state.victoryModalVisible = action.payload;
    },
    setActiveWord(state, action: PayloadAction<Word>) {
      state.activeWord = action.payload;
    },
    resetGameState(
      state,
      action: PayloadAction<Partial<GameState> | undefined>
    ) {
      Object.assign(state, action.payload ?? initialState);
    },
  },
});

export const {
  setTabIndex,
  setTotalStages,
  setKeyPressed,
  setAdvanceModalVisible,
  setVictoryModalVisible,
  setActiveWord,
  resetGameState,
} = gameSlice.actions;
export default gameSlice.reducer;
