import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import Layout from "./components/Layout";
import Catalog from "./components/Catalog";
import MaterialDetail from "./pages/MaterialDetail";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<Catalog />} />
        <Route path="/material/:detailPageId" element={<MaterialDetail />} />
      </Route>
    </Routes>
  );
}
