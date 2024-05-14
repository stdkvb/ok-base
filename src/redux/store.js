import { configureStore } from "@reduxjs/toolkit";
import { okBaseApi } from "./okBaseApi";

import filtersSlice from "./slices/filterSlice";
import authSlice from "./slices/authSlice";
import themeSlice from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    [okBaseApi.reducerPath]: okBaseApi.reducer,
    filtersSlice,
    authSlice,
    themeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(okBaseApi.middleware),
});
