import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MyFile, RenameFileType } from '../../pages/Drive/types/types';

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
    renameFile(state, action: PayloadAction<RenameFileType>) {
      const currentState = state;
      const id = action.payload.contextId;
      const name = action.payload.fileName;
      currentState.files.forEach((file) => {
        const currentFile = file;
        if (currentFile.id === id) currentFile.name = name;
      });
    },
  },
});

export default driveSlice.reducer;
export const { addFile, removeFile, renameFile } = driveSlice.actions;
