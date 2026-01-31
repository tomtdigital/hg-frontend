import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Key = {
  letter: string;
};

export type CreateCrosswordState = {
  step: number;
  gridSize: number;
  colorScheme?: ColorScheme;
  gridValues?: Cell[];
};

const initialState: CreateCrosswordState = {
  step: 0,
  gridSize: 5,
  colorScheme: {
    empty: '#FFFFFF',
    filled: '#000000',
    selected: '#bfff00',
  },
  gridValues: undefined,
};

const createCrossWordSlice = createSlice({
  name: 'create-crossword',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },
    setGridSize(state, action: PayloadAction<number>) {
      state.gridSize = action.payload;
    },
    setColorScheme(state, action: PayloadAction<ColorScheme>) {
      state.colorScheme = action.payload;
    },
    setGridValues(state, action: PayloadAction<Cell[]>) {
      state.gridValues = action.payload;
    },
  },
});

export const { setGridSize, setColorScheme, setStep, setGridValues } =
  createCrossWordSlice.actions;
export default createCrossWordSlice.reducer;
