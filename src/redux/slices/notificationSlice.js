import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    deleteMatarial: false,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotificationDeleteMaterial(state, action) {
        state.deleteMatarial = action.payload;
    }
  },
});

export const { showNotificationDeleteMaterial } = notificationSlice.actions;

export default notificationSlice.reducer;
