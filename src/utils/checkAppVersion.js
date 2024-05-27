import { useEffect } from "react";

const APP_VERSION = "1.0.33"; //update version on each release!!

const useCheckAppVersion = () => {
  useEffect(() => {
    try {
      const storedVersion = localStorage.getItem("appVersion");
      if (storedVersion !== APP_VERSION) {
        localStorage.clear();
        localStorage.setItem("appVersion", APP_VERSION);
      }
    } catch (error) {
      console.error("Error checking app version:", error);
    }
  }, []);
};

export default useCheckAppVersion;
