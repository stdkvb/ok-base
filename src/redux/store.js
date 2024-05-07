import { configureStore } from "@reduxjs/toolkit";
import { okBaseApi } from "./okBaseApi";

import filtersSlice from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    [okBaseApi.reducerPath]: okBaseApi.reducer,
    filtersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(okBaseApi.middleware),
});
