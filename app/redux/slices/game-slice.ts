import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Key = {
  letter: string;
};

export type GameState = {
  id: string;
  tabIndex: number;
  toggledWordIndex?: number;
  totalStages: number;
  keyPressed: Key;
  advanceModalVisible: boolean;
  victoryModalVisible: boolean;
  activeWord: Word;
  readDescription?: boolean;
};

const initialState: GameState = {
  id: '',
  tabIndex: 0,
  totalStages: 0,
  toggledWordIndex: 0,
  keyPressed: {} as Key,
  advanceModalVisible: false,
  victoryModalVisible: false,
  activeWord: {} as Word,
  readDescription: false,
};

export const getLocalGameKey = (userId: string): string => `hg-game-${userId}`;

function gameStateToLocalStorage(
  state: GameState,
  updatedState: Partial<GameState>,
  userId: string
) {
  if (updatedState)
    localStorage.setItem(
      getLocalGameKey(userId),
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
    setTabIndex(
      state,
      action: PayloadAction<{ tabIndex: number; userId: string }>
    ) {
      if (state.id)
        gameStateToLocalStorage(
          state,
          { tabIndex: action.payload.tabIndex },
          action.payload.userId
        );
      state.tabIndex = action.payload.tabIndex;
    },
    setReadDescription(
      state,
      action: PayloadAction<{ readDescription: boolean; userId: string }>
    ) {
      if (state.id)
        gameStateToLocalStorage(
          state,
          { readDescription: action.payload.readDescription },
          action.payload.userId
        );
      state.readDescription = action.payload.readDescription;
    },
    setToggledWordIndex(
      state,
      action: PayloadAction<{ toggledWordIndex: number; userId: string }>
    ) {
      if (state.id)
        gameStateToLocalStorage(
          state,
          { toggledWordIndex: action.payload.toggledWordIndex },
          action.payload.userId
        );
      state.toggledWordIndex = action.payload.toggledWordIndex;
    },
    setTotalStages(
      state,
      action: PayloadAction<{ totalStages: number; userId: string }>
    ) {
      if (state.id)
        gameStateToLocalStorage(
          state,
          { totalStages: action.payload.totalStages },
          action.payload.userId
        );
      state.totalStages = action.payload.totalStages;
    },
    setKeyPressed(
      state,
      action: PayloadAction<{ keyPressed: Key; userId: string }>
    ) {
      if (state.id)
        gameStateToLocalStorage(
          state,
          { keyPressed: action.payload.keyPressed },
          action.payload.userId
        );
      state.keyPressed = action.payload.keyPressed;
    },
    setAdvanceModalVisible(
      state,
      action: PayloadAction<{ advanceModalVisible: boolean; userId: string }>
    ) {
      if (state.id)
        gameStateToLocalStorage(
          state,
          { advanceModalVisible: action.payload.advanceModalVisible },
          action.payload.userId
        );
      state.advanceModalVisible = action.payload.advanceModalVisible;
    },
    setVictoryModalVisible(
      state,
      action: PayloadAction<{ victoryModalVisible: boolean; userId: string }>
    ) {
      if (state.id)
        gameStateToLocalStorage(
          state,
          { victoryModalVisible: action.payload.victoryModalVisible },
          action.payload.userId
        );
      state.victoryModalVisible = action.payload.victoryModalVisible;
    },
    setActiveWord(
      state,
      action: PayloadAction<{ activeWord: Word; userId: string }>
    ) {
      if (state.id)
        gameStateToLocalStorage(
          state,
          { activeWord: action.payload.activeWord },
          action.payload.userId
        );
      state.activeWord = action.payload.activeWord;
    },
    resetGameState(
      state,
      action: PayloadAction<{ state: Partial<GameState>; userId: string }>
    ) {
      if (state.id)
        gameStateToLocalStorage(
          state,
          action.payload.state,
          action.payload.userId
        );
      Object.assign(state, action.payload.state);
    },
  },
});

export const {
  setTabIndex,
  setTotalStages,
  setToggledWordIndex,
  setKeyPressed,
  setAdvanceModalVisible,
  setVictoryModalVisible,
  setActiveWord,
  resetGameState,
  setReadDescription,
} = gameSlice.actions;
export default gameSlice.reducer;
