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
    setFilter(state, action) {
      const { name, value } = action.payload;
      state.filters[name] = value;
    },
    resetFilters(state) {
      state.filters = initialState.filters;
    },
  },
});

export const { setFilter, resetFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
