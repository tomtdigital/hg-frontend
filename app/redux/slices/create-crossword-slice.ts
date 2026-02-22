import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Key = {
  letter: string;
};

export type CreateCrosswordState = {
  step: number;
  gridValues?: string[]; // used in the GridPlanner component to store individual letters. It's later processed to create the gridData for the crossword.
  crosswordFormData: CrosswordData; // used to store the final crossword data structure, which includes colorScheme, gridSize and gridData. The latter includes word, indices and clue.
};

const initialState: CreateCrosswordState = {
  step: 0,
  gridValues: undefined,
  crosswordFormData: {
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
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },
    setGridValues(state, action: PayloadAction<string[]>) {
      state.gridValues = action.payload;
    },
    setCrosswordFormData(state, action: PayloadAction<CrosswordData>) {
      console.log('Setting crossword form data:', action.payload);
      state.crosswordFormData = action.payload;
    },
  },
});

export const { setStep, setGridValues, setCrosswordFormData } =
  createCrossWordSlice.actions;
export default createCrossWordSlice.reducer;
