import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import Layout from "./components/Layout";
import Catalog from "./components/Catalog";
import MaterialDetail from "./pages/MaterialDetail";
import SignUpStart from "./pages/SignUpStart";
import LogIn from "./pages/LogIn";
import SignUpFinish from "./pages/SignUpFinish";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/sign-up" element={<SignUpStart />} />
        <Route path="/confirm-registration" element={<SignUpFinish />} />
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
