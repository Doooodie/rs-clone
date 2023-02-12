import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FilterInitialState = {
  query: string;
  sort: 'name' | `lastChange` | 'size' | null;
  isReverse: boolean;
};

const initialState: FilterInitialState = {
  query: '',
  sort: null,
  isReverse: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      const currentState = state;
      currentState.query = action.payload;
    },
    setSort(state, action: PayloadAction<'name' | 'lastChange' | 'size' | null>) {
      const currentState = state;
      currentState.sort = action.payload;
    },
    changeReverse(state, action: PayloadAction<boolean>) {
      const currentState = state;
      currentState.isReverse = action.payload;
    },
  },
});

export const { setQuery, setSort, changeReverse } = filterSlice.actions;
export default filterSlice.reducer;
