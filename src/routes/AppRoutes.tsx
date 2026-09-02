import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "../components/layout/Layout";

// Dashboard
import Dashboard from "../pages/Dashboard";

// Tenant Management
import Tenants from "../pages/Tenants";
import CreateTenant from "../pages/CreateTenants";
import EditTenant from "../pages/EditTenant";
import TenantDetails from "../pages/TenantDetails";

// Organization Management
import Organizations from "../pages/organizations/Organizations";
import CreateOrganization from "../pages/organizations/CreateOrganization";
import EditOrganization from "../pages/organizations/EditOrganization";
import OrganizationDetails from "../pages/organizations/OrganizationDetails";

// User Management
import Users from "../pages/users/Users";
import CreateUser from "../pages/users/CreateUser";
import EditUser from "../pages/users/EditUser";
import UserDetails from "../pages/users/UserDetails";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* ==================== Dashboard ==================== */}
          <Route path="/" element={<Dashboard />} />

          <Route path="/dashboard" element={<Dashboard />} />

          {/* ==================== Tenant Management ==================== */}
          <Route path="/tenants" element={<Tenants />} />

          <Route path="/tenants/create" element={<CreateTenant />} />

          <Route path="/tenants/:id" element={<TenantDetails />} />

          <Route path="/tenants/:id/edit" element={<EditTenant />} />

          {/* ==================== Organization Management ==================== */}
          <Route path="/organizations" element={<Organizations />} />

          <Route
            path="/organizations/create"
            element={<CreateOrganization />}
          />

          <Route path="/organizations/:id" element={<OrganizationDetails />} />

          <Route
            path="/organizations/:id/edit"
            element={<EditOrganization />}
          />

          {/* ==================== User Management ==================== */}
          <Route path="/users" element={<Users />} />

          <Route path="/users/create" element={<CreateUser />} />

          <Route path="/users/:id" element={<UserDetails />} />

          <Route path="/users/:id/edit" element={<EditUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
