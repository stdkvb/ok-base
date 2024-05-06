import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "",
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
