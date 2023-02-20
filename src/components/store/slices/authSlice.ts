import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthSliceState = {
  name: string;
  token: string;
};

const initialState: AuthSliceState = {
  name: '',
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<AuthSliceState>) {
      const currentState = state;
      currentState.name = action.payload.name;
      currentState.token = action.payload.token;
    },
    clearCredentials(state) {
      const currentState = state;
      currentState.name = '';
      currentState.token = '';
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
