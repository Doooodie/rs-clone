import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Cart = {
  settingModal: boolean;
  fileInfo: boolean;
};

const initialState: Cart = {
  settingModal: false,
  fileInfo: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    changeSettingModal(state, action: PayloadAction<boolean>) {
      const currentState = state;
      const value = action.payload;
      currentState.settingModal = value;
    },
    changeFileInfoModal(state, action: PayloadAction<boolean>) {
      const currentState = state;
      const value = action.payload;
      currentState.fileInfo = value;
    },
  },
});

export default modalSlice.reducer;
export const { changeSettingModal, changeFileInfoModal } =
  modalSlice.actions;
