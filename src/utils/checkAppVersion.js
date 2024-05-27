import { useEffect } from "react";
import config from "../config";

const useCheckAppVersion = () => {
  useEffect(() => {
    try {
      const storedVersion = localStorage.getItem("appVersion");
      if (storedVersion !== config.appVersion) {
        localStorage.clear();
        localStorage.setItem("appVersion", config.appVersion);
      }
    } catch (error) {
      console.error("Error checking app version:", error);
    }
  }, []);
};

export default useCheckAppVersion;
