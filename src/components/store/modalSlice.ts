import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Cart = {
  headerModal: boolean;
  asideModal: boolean;
  settingModal: boolean;
};

const initialState: Cart = {
  headerModal: false,
  asideModal: false,
  settingModal: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    changeHeaderModal(state, action: PayloadAction<boolean>) {
      const currentState = state;
      const value = action.payload;
      currentState.headerModal = value;
    },
    changeAsideModal(state, action: PayloadAction<boolean>) {
      const currentState = state;
      const value = action.payload;
      currentState.asideModal = value;
    },
    changeSettingModal(state, action: PayloadAction<boolean>) {
      const currentState = state;
      const value = action.payload;
      currentState.settingModal = value;
    },
  },
});

export default modalSlice.reducer;
export const { changeHeaderModal, changeAsideModal, changeSettingModal } = modalSlice.actions;
