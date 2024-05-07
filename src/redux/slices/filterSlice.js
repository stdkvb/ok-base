import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    category: "",
    company: "",
    theme: "",
    people: "",
    event: "",
    grade: "",
  },
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.filters.category = action.payload;
    },
    setCompany(state, action) {
      state.filters.company = action.payload;
    },
    setTheme(state, action) {
      state.filters.theme = action.payload;
    },
    setPeople(state, action) {
      state.filters.people = action.payload;
    },
    setEvent(state, action) {
      state.filters.event = action.payload;
    },
    setGrade(state, action) {
      state.filters.grade = action.payload;
    },
    resetFilters(state) {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setCategory,
  setCompany,
  setTheme,
  setPeople,
  setEvent,
  setGrade,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
