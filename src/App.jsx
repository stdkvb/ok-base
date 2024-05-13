import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import Layout from "./components/Layout";
import Catalog from "./components/Catalog";
import MaterialDetail from "./pages/MaterialDetail";
import LogIn from "./pages/LogIn";
import RegFinish from "./pages/RegFinish";
import RegStart from "./pages/RegStart";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/sign-up" element={<RegStart />} />
        <Route path="/confirm-registration" element={<RegFinish />} />
        <Route path="/log-in" element={<LogIn />} />
      </Route>
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<Catalog />} />
        <Route
          path="/material/:materialDetailId"
          element={<MaterialDetail />}
        />
      </Route>
    </Routes>
  );
}
