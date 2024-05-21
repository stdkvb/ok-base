const APP_VERSION = "1.0.1";

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
    console.error("Could not load state from localStorage:", err);
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
    console.error("Could not save state to localStorage:", err);
  }
};
