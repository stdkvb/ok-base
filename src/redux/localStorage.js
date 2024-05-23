const APP_VERSION = "1.0.27"; // update version on each release!!

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    const state = JSON.parse(serializedState);

    if (state.appVersion !== APP_VERSION) {
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
