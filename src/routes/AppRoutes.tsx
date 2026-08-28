import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";

import Dashboard from "../pages/Dashboard";
import Tenants from "../pages/Tenants";
import CreateTenant from "../pages/CreateTenants";
import EditTenant from "../pages/EditTenant";
import TenantDetails from "../pages/TenantDetails";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />

          <Route path="/tenants" element={<Tenants />} />

          <Route path="/tenants/create" element={<CreateTenant />} />

          <Route path="/tenants/:id" element={<TenantDetails />} />

          <Route path="/tenants/:id/edit" element={<EditTenant />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
