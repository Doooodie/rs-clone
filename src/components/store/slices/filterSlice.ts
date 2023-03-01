import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FilterInitialState = {
  query: string;
};

const initialState: FilterInitialState = {
  query: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      const currentState = state;
      currentState.query = action.payload;
    },
  },
});

export const { setQuery } = filterSlice.actions;
export default filterSlice.reducer;
