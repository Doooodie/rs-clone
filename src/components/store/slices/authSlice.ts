import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthSliceState = {
  name: string;
  token: string;
  id: number;
};

const initialState: AuthSliceState = {
  name: '',
  token: '',
  id: -1,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<AuthSliceState>) {
      const currentState = state;
      currentState.name = action.payload.name;
      currentState.token = action.payload.token;
      currentState.id = action.payload.id;
    },
    updateToken(state, action: PayloadAction<string>) {
      const currentState = state;
      currentState.token = action.payload;
    },
  },
});

export const { setCredentials, updateToken } = authSlice.actions;
export default authSlice.reducer;
