import { configureStore } from "@reduxjs/toolkit";
import { okBaseApi } from "./okBaseApi";

import categories from "./slices/categoriesSlice";

export const store = configureStore({
  reducer: {
    [okBaseApi.reducerPath]: okBaseApi.reducer,
    categories,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(okBaseApi.middleware),
});
