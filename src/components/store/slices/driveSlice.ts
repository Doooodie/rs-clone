import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MyFile } from '../../pages/Drive/types/types';

type DriveInitialState = {
  files: MyFile[];
};

const initialState: DriveInitialState = {
  files: [],
};

const driveSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    addFile(state, action: PayloadAction<MyFile>) {
      const currentState = state;
      currentState.files.push(action.payload);
    },
    removeFile(state, action: PayloadAction<number>) {
      const currentState = state;
      currentState.files = currentState.files.filter((file) => file.id !== action.payload);
    },
  },
});

export default driveSlice.reducer;
export const { addFile, removeFile } = driveSlice.actions;
