import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.loggedIn = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const { setAuth, setToken } = authSlice.actions;

export default authSlice.reducer;
