import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    category: "",
    company: "",
    theme: "",
    people: "",
    event: "",
    grade: "",
    tag: "",
    limit: "10",
    page: "1",
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
    setTag(state, action) {
      state.filters.tag = action.payload;
    },
  },
});

export const { setFilter, setTag, resetFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
