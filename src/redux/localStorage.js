const APP_VERSION = "1.0.6";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      console.log("No state found in localStorage.");
      return undefined;
    }
    const state = JSON.parse(serializedState);

    if (state.appVersion !== APP_VERSION) {
      console.log(
        `Version mismatch: localStorage (${state.appVersion}), expected (${APP_VERSION})`
      );
      return undefined;
    }

    const { appVersion, ...restState } = state;
    return restState;
  } catch (err) {
    console.error("Error loading state from localStorage:", err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const stateToSave = {
      ...state,
      appVersion: APP_VERSION,
    };
    const serializedState = JSON.stringify(stateToSave);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
};
