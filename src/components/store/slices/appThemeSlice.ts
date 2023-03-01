import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeInitialState = {
  theme: 'light' | 'dark' | '';
};

const initialState: ThemeInitialState = {
  theme: '',
};

const appThemeSlice = createSlice({
  name: 'appTheme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeInitialState['theme']>) {
      const currentState = state;
      currentState.theme = action.payload;
    },
  },
});

export const { setTheme } = appThemeSlice.actions;
export default appThemeSlice.reducer;
