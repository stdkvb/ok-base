import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import Catalog from "./components/Catalog";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<Catalog />} />
      </Route>
    </Routes>
  );
}
