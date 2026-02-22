import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Key = {
  letter: string;
};

export type CreateCrosswordState = {
  step: number;
  gridValues?: string[];
  crosswordData: CrosswordData;
};

const initialState: CreateCrosswordState = {
  step: 0,
  gridValues: undefined,
  crosswordData: {
    gridSize: 3,
    colorScheme: {
      empty: '#000',
      filled: '#72e1f2',
      filledText: '#000000',
      selected: '#bfff00',
      selectedText: '#f800c2',
    },
    gridData: {
      across: [],
      down: [],
    },
  },
};

const createCrossWordSlice = createSlice({
  name: 'create-crossword',
  initialState,
  reducers: {
    updateStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },
    updateGridValues(state, action: PayloadAction<string[]>) {
      state.gridValues = action.payload;
    },
    updateCrosswordData(state, action: PayloadAction<CrosswordData>) {
      state.crosswordData = action.payload;
    },
    resetCrosswordGridData(state) {
      state.crosswordData.gridData.across = [];
      state.crosswordData.gridData.down = [];
    },
  },
});

export const {
  updateStep,
  updateGridValues,
  updateCrosswordData,
  resetCrosswordGridData,
} = createCrossWordSlice.actions;
export default createCrossWordSlice.reducer;
