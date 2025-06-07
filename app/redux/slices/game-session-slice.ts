import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getStorageKey } from '@/app/utils/get-storage-key';

type GameStorageData = {
  updateDb: boolean;
  gameData: StoredSessionData;
};

export const updateSessionDataStorage = createAsyncThunk(
  'gameSession/updateSessionDataStorage',
  // Update the Database Session
  async (payload: GameStorageData, thunkAPI) => {
    const store = thunkAPI.getState() as RootState;
    const session = store.gameSession.session as StoredGameSession;
    const body = {
      game: session.game,
      gameData: {
        ...session.gameData,
        ...payload.gameData,
      },
    };
    // Update the database if required
    if (payload.updateDb) {
      try {
        await fetch(`/api/user-session`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
      } catch (error: unknown) {
        console.error("Couldn't update user session");
      }
    }
    // Update localstorage
    localStorage.setItem(
      getStorageKey(session.game, store.user.credentials.id),
      JSON.stringify(body)
    );
    // Pass session to reducer
    return body;
  }
);

const initialState: { session: StoredGameSession } = {
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
    builder.addCase(updateSessionDataStorage.fulfilled, (state, action) => {
      state.session = action.payload;
    });
  },
});

export const { setGameSession, clearGameSession } = gameSessionSlice.actions;
export default gameSessionSlice.reducer;
