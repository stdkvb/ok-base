import { configureStore } from "@reduxjs/toolkit";
import { okBaseApi } from "./okBaseApi";

import filtersSlice from "./slices/filterSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    [okBaseApi.reducerPath]: okBaseApi.reducer,
    filtersSlice,
    authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(okBaseApi.middleware),
});
