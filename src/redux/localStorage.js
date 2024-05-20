const APP_VERSION_KEY = "appVersion"; // Ключ для хранения версии приложения

export const getAppVersion = () => {
  return localStorage.getItem(APP_VERSION_KEY);
};

export const setAppVersion = (version) => {
  localStorage.setItem(APP_VERSION_KEY, version);
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    const state = JSON.parse(serializedState);

    // Проверяем версию приложения
    if (getAppVersion() !== APP_VERSION) {
      return undefined; // Возвращаем undefined, если версии не совпадают
    }

    return state;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
    setAppVersion(APP_VERSION); // Сохраняем версию приложения отдельно
  } catch (err) {
    // Игнорируем ошибки
  }
};
