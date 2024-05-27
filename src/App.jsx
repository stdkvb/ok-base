import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import { darkTheme, lightTheme } from "./theme";
import { useSelector } from "react-redux";

import useCheckAppVersion from "./utils/checkAppVersion";
import ScrollToTop from "./utils/scrollToTop";
import Layout from "./components/Layout";
import Catalog from "./components/Catalog";
import MaterialDetail from "./pages/MaterialDetail";
import LogIn from "./pages/LogIn";
import RegFinish from "./pages/RegFinish";
import RegStart from "./pages/RegStart";
import RecoveryPassStart from "./pages/RecoveryPassStart";
import RecoveryPassFinish from "./pages/RecoveryPassFinish";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import CreateMaterial from "./pages/CreateMaterial";
import EditMaterial from "./pages/EditMaterial";
import ErrorPage from "./pages/ErrorPage";

export default function App() {
  useCheckAppVersion();
  const darkMode = useSelector((state) => state.themeSlice.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/sign-up" element={<RegStart />} />
          <Route path="/confirm-registration" element={<RegFinish />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/recovery-pass" element={<RecoveryPassStart />} />
          <Route path="/change-password" element={<RecoveryPassFinish />} />
          <Route path="/" element={<Catalog />} />
          <Route path="/my-materials" element={<Catalog />} />
          <Route path="/favorites" element={<Catalog />} />
          <Route
            path="/material/:materialDetailId"
            element={<MaterialDetail />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
          <Route path="/create-material" element={<CreateMaterial />} />
          <Route
            path="/edit-material/:materialDetailId"
            element={<EditMaterial />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
