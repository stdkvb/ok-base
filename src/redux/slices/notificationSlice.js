import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  processing: false,
  deleteMatarial: false,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state) => {
      state.notifications.shift();
    },
    setProcessing: (state, action) => {
      state.processing = action.payload;
    },
    showNotificationDeleteMaterial(state, action) {
      state.deleteMatarial = action.payload;
    },
  },
});

export const {
  addNotification,
  removeNotification,
  setProcessing,
  showNotificationDeleteMaterial,
} = notificationSlice.actions;

export default notificationSlice.reducer;
