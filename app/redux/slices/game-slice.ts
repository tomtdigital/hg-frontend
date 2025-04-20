import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Key = {
  letter: string;
};

export type GameState = {
  id: string;
  tabIndex: number;
  totalStages: number;
  keyPressed: Key;
  advanceModalVisible: boolean;
  victoryModalVisible: boolean;
  activeWord: Word;
};

const initialState: GameState = {
  id: '',
  tabIndex: 0,
  totalStages: 0,
  keyPressed: {} as Key,
  advanceModalVisible: false,
  victoryModalVisible: false,
  activeWord: {} as Word,
};

function gameStateToLocalStorage(
  state: GameState,
  updatedState: Partial<GameState>
) {
  if (updatedState)
    localStorage.setItem(
      'hg-game',
      JSON.stringify({
        ...state,
        ...updatedState,
      })
    );
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setTabIndex(state, action: PayloadAction<number>) {
      if (state.id)
        gameStateToLocalStorage(state, { tabIndex: action.payload });
      state.tabIndex = action.payload;
    },
    setTotalStages(state, action: PayloadAction<number>) {
      if (state.id)
        gameStateToLocalStorage(state, { totalStages: action.payload });
      state.totalStages = action.payload;
    },
    setKeyPressed(state, action: PayloadAction<Key>) {
      if (state.id)
        gameStateToLocalStorage(state, { keyPressed: action.payload });
      state.keyPressed = action.payload;
    },
    setAdvanceModalVisible(state, action: PayloadAction<boolean>) {
      if (state.id)
        gameStateToLocalStorage(state, { advanceModalVisible: action.payload });
      state.advanceModalVisible = action.payload;
    },
    setVictoryModalVisible(state, action: PayloadAction<boolean>) {
      if (state.id)
        gameStateToLocalStorage(state, { victoryModalVisible: action.payload });
      state.victoryModalVisible = action.payload;
    },
    setActiveWord(state, action: PayloadAction<Word>) {
      if (state.id)
        gameStateToLocalStorage(state, { activeWord: action.payload });
      state.activeWord = action.payload;
    },
    resetGameState(
      state,
      action: PayloadAction<Partial<GameState> | undefined>
    ) {
      if (state.id) gameStateToLocalStorage(state, action.payload!);
      Object.assign(state, action.payload);
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
