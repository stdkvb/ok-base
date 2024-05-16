import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      state.loggedIn = !!action.payload;
    },
    clearToken(state, action) {
      state.token = null;
      state.loggedIn = false;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
