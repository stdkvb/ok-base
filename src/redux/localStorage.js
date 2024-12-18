import config from "../config";
import { filtersSlice } from "./slices/filterSlice";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }

    const state = JSON.parse(serializedState);

    if (state.appVersion !== config.appVersion) {
      console.log("App version mismatch. Ignoring stored state.");
      return undefined;
    }

    return {
      authSlice: state.authSlice || { loggedIn: false, token: null },
      filtersSlice: state.filtersSlice,
    };
  } catch (err) {
    console.error("Error loading state from localStorage:", err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const stateToSave = {
      appVersion: config.appVersion,
      authSlice: state.authSlice,
      filtersSlice: state.filtersSlice,
    };

    const serializedState = JSON.stringify(stateToSave);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
};
