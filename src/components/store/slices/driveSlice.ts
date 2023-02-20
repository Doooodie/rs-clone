import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AllDrive, MyFile, MyFolder, RenameFileType } from '../../pages/Explorer/types/types';

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
      folders: [],
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
    addFolder(state, action: PayloadAction<MyFolder>) {
      const currentState = state;
      currentState.allDrive.drive.folders.push(action.payload);
    },
    renameFolder(state, action: PayloadAction<RenameFileType>) {
      const currentState = state;
      const id = action.payload.contextId;
      const name = action.payload.folderNewName;
      currentState.allDrive.drive.folders.forEach((folder) => {
        const currentFolder = folder;
        if (currentFolder.id === id) currentFolder.name = name;
      });
    },
    removeFile(state, action: PayloadAction<number>) {
      const currentState = state;
      currentState.allDrive.drive.files = currentState.allDrive.drive.files.filter(
        (file) => file.id !== action.payload,
      );
    },
    addFileToTrash(state, action: PayloadAction<number>) {
      const currentState = state;
      const index = currentState.allDrive.drive.files.findIndex(
        (file) => file.id === action.payload,
      );
      currentState.allDrive.trash.files.push(currentState.allDrive.drive.files[index]);
    },
    removeFileFromTrash(state, action: PayloadAction<number>) {
      const currentState = state;
      currentState.allDrive.trash.files = currentState.allDrive.trash.files.filter(
        (file) => file.id !== action.payload,
      );
    },
    removeFolderFromTrash(state, action: PayloadAction<number>) {
      const currentState = state;
      currentState.allDrive.trash.folders = currentState.allDrive.trash.folders.filter(
        (folder) => folder.id !== action.payload,
      );
    },
    addFolderToTrash(state, action: PayloadAction<number>) {
      const currentState = state;
      const index = currentState.allDrive.drive.folders.findIndex(
        (folder) => folder.id === action.payload,
      );
      currentState.allDrive.trash.folders.push(currentState.allDrive.drive.folders[index]);
    },
    removeFolder(state, action: PayloadAction<number>) {
      const currentState = state;
      currentState.allDrive.drive.folders = currentState.allDrive.drive.folders.filter(
        (folder) => folder.id !== action.payload,
      );
    },
    changeCurrentDrive(state, action: PayloadAction<keyof AllDrive>) {
      const currentState = state;
      currentState.currentDrive = action.payload;
    },
  },
});

export default driveSlice.reducer;
export const {
  addFile,
  removeFile,
  addFileToTrash,
  addFolder,
  addFolderToTrash,
  removeFolder,
  changeCurrentDrive,
  removeFileFromTrash,
  removeFolderFromTrash,
  renameFolder,
} = driveSlice.actions;
