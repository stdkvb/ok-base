import { configureStore } from "@reduxjs/toolkit";
import { okBaseApi } from "./okBaseApi";
import { saveState, loadState } from "./localStorage";
import isTokenExpired from "../utils/checkToken";

import filtersSlice from "./slices/filterSlice";
import authSlice from "./slices/authSlice";
import themeSlice from "./slices/themeSlice";
import notificationSlice from "./slices/notificationSlice";
import newMaterialSlice from "./slices/newMaterialSlice";

const preloadedState = loadState() || {};
//check token
if (
  preloadedState.authSlice &&
  isTokenExpired(preloadedState.authSlice.token)
) {
  preloadedState.authSlice = { loggedIn: false, token: null };
}

const store = configureStore({
  reducer: {
    [okBaseApi.reducerPath]: okBaseApi.reducer,
    filtersSlice,
    authSlice,
    themeSlice,
    notificationSlice,
    newMaterialSlice,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(okBaseApi.middleware),
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
