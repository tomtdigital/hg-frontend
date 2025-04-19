import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type GameStorageData = {
  updateDb: boolean;
  session: StoredGameSession;
  localStorageKey: string;
};

export const updateSessionStorage = createAsyncThunk(
  'gameSession/updateStorage',
  // Update the Database Session
  async (payload: GameStorageData, _) => {
    if (payload.updateDb) {
      try {
        await fetch(`/api/user-session`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload.session),
        });
      } catch (error: unknown) {
        console.error("Couldn't update user session");
      }
    }
    // Update localstorage
    localStorage.setItem(
      payload.localStorageKey,
      JSON.stringify(payload.session)
    );
    // Pass session to reducer
    console.log('Session updated', payload.session);
    return payload.session;
  }
);

const initialState: RequireOnly<GameStorageData, 'session'> = {
  session: {
    game: '',
    gameData: {
      stage: 0,
      cluesRevealed: [],
      score: 0,
      lastCompletedGrid: [],
      finishedGrids: [],
      solutionGuess: '',
      correctSolution: false,
      gameComplete: false,
    },
  },
};

const gameSessionSlice = createSlice({
  name: 'gameSession',
  initialState,
  reducers: {
    setGameSession(state, action: PayloadAction<StoredGameSession>) {
      state.session = action.payload;
    },
    clearGameSession(state) {
      state.session = initialState.session;
    },
  },
  extraReducers(builder) {
    builder.addCase(updateSessionStorage.fulfilled, (state, action) => {
      state.session = action.payload;
    });
  },
});

export const { setGameSession, clearGameSession } = gameSessionSlice.actions;
export default gameSessionSlice.reducer;
