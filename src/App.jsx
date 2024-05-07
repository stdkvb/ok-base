import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Catalog from "./components/Catalog";
import DetailPage from "./pages/DetailPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<Catalog />} />
        <Route path="/material/:detailPageId" element={<DetailPage />} />
      </Route>
    </Routes>
  );
}
