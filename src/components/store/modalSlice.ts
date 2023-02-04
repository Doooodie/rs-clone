import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Cart = {
  headerModal: boolean;
  asideModal: boolean;
};

const initialState: Cart = {
  headerModal: false,
  asideModal: false,
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
  },
});

export default modalSlice.reducer;
export const { changeHeaderModal, changeAsideModal } = modalSlice.actions;
