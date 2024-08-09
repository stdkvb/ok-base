import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  processing: false,
};

const notificationSlice = createSlice({
  name: "notifications",
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
  },
});

export const { addNotification, removeNotification, setProcessing } =
  notificationSlice.actions;
export default notificationSlice.reducer;
