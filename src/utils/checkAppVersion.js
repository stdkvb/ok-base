import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { okBaseApi } from "../redux/okBaseApi";

const useCheckAppVersion = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkVersion = async () => {
      try {
        const response = await fetch("/index.html");
        const text = await response.text();
        const doc = new DOMParser().parseFromString(text, "text/html");
        const meta = doc.querySelector('meta[name="application-version"]');
        const latestVersion = meta ? meta.getAttribute("content") : null;

        const currentVersion = localStorage.getItem("appVersion");

        if (currentVersion !== latestVersion) {
          localStorage.setItem("appVersion", latestVersion);
          localStorage.removeItem("state"); // Очистка сохраненного состояния
          dispatch(okBaseApi.util.resetApiState());
          window.location.reload();
        }
      } catch (error) {
        console.error("Failed to check app version", error);
      }
    };

    checkVersion();
  }, [dispatch]);
};

export default useCheckAppVersion;
