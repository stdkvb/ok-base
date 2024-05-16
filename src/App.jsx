import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
// import theme from "./theme";
import { darkTheme, lightTheme } from "./theme";
import { useSelector } from "react-redux";

import AuthLayout from "./components/AuthLayout";
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

export default function App() {
  const darkMode = useSelector((state) => state.themeSlice.darkMode);

  const theme = darkMode ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/sign-up" element={<RegStart />} />
          <Route path="/confirm-registration" element={<RegFinish />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/recovery-pass" element={<RecoveryPassStart />} />
          <Route path="/change-password" element={<RecoveryPassFinish />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Catalog />} />
          <Route index path="/my-materials" element={<Catalog />} />
          <Route
            path="/material/:materialDetailId"
            element={<MaterialDetail />}
          />
          <Route index path="/profile" element={<Profile />} />
          <Route index path="/favorites" element={<Favorites />} />
          <Route index path="/about" element={<About />} />
          <Route index path="/create-material" element={<CreateMaterial />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
