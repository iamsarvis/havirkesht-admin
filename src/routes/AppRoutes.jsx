import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import ProvinceList from "../pages/province/ProvinceList";
import AdminLayout from "../components/layout/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
    <Route path="/login" element={<Login />} />

    <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/province" element={<ProvinceList />} />
        </Route>
    </Route>
    </Routes>

  );
}

export default AppRoutes;