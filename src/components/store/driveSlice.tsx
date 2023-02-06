import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AllDrive, MyFile } from '../pages/Explorer/types/types';

enum DrivesNames {
  drive = 'drive',
  trash = 'trash',
  important = 'important',
  storage = 'storage',
}

type DriveInitialState = {
  allDrive: AllDrive;
  currentDrive: keyof AllDrive;
};

const initialState: DriveInitialState = {
  allDrive: {
    drive: {
      name: 'mydrive',
      files: [],
      folders: [],
    },
    important: {
      name: 'important',
      files: [],
      folders: [],
    },
    trash: {
      name: 'cart',
      files: [],
    },
    storage: {
      name: 'storage',
      files: [],
      folders: [],
    },
  },
  currentDrive: DrivesNames.drive,
};

const driveSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    addFile(state, action: PayloadAction<MyFile>) {
      const currentState = state;
      currentState.allDrive.drive.files.push(action.payload);
    },
    removeFile(state, action: PayloadAction<number>) {
      const currentState = state;
      currentState.allDrive.drive.files = currentState.allDrive.drive.files.filter(
        (file) => file.id !== action.payload,
      );
    },
    changeCurrentDrive(state, action: PayloadAction<keyof AllDrive>) {
      const currentState = state;
      currentState.currentDrive = action.payload;
    },
  },
});

export default driveSlice.reducer;
export const { addFile, changeCurrentDrive, removeFile } = driveSlice.actions;
