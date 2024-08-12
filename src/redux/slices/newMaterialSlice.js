import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newMaterial: {
    link: "",
    name: "",
    description: "",
    category: "",
    grade: "",
    theme: [],
    company: [],
    people: [],
    event: [],
    myTags: [],
    forEveryone: false,
    note: "",
  },
};

export const newMaterialSlice = createSlice({
  name: "newMaterial",
  initialState,
  reducers: {
    setNewMaterial(state, action) {
      state.newMaterial = action.payload;
    },
    resetNewMaterial(state) {
      state.newMaterial = initialState.newMaterial;
    },
  },
});

export const { setNewMaterial, resetNewMaterial } = newMaterialSlice.actions;

export default newMaterialSlice.reducer;
