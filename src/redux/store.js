import { configureStore } from "@reduxjs/toolkit";
import { okBaseApi } from "./okBaseApi";
import { saveState, loadState } from "./localStorage";

import filtersSlice from "./slices/filterSlice";
import authSlice from "./slices/authSlice";
import themeSlice from "./slices/themeSlice";

const preloadedState = loadState() || {};

const store = configureStore({
  reducer: {
    [okBaseApi.reducerPath]: okBaseApi.reducer,
    filtersSlice,
    authSlice,
    themeSlice,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(okBaseApi.middleware),
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
