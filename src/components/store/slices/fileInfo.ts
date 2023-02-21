import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MyFile } from '../../pages/Explorer/types/types';

type FileInfoInitialState = {
  file: null | MyFile;
};

const initialState: FileInfoInitialState = {
  file: null,
};

const fileInfoSlice = createSlice({
  name: 'fileInfo',
  initialState,
  reducers: {
    setFileInfo(state, action: PayloadAction<MyFile>) {
      const currentState = state;
      currentState.file = action.payload;
    },
    removeFileInfo(state, action: PayloadAction<null>) {
      const currentState = state;
      currentState.file = action.payload;
    },
  },
});

export const { setFileInfo, removeFileInfo } = fileInfoSlice.actions;
export default fileInfoSlice.reducer;
