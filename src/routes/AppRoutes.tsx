import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "../components/layout/Layout";

// Dashboard
import Dashboard from "../pages/Dashboard";

// Tenants Management
import Tenants from "../pages/Tenants";
import CreateTenant from "../pages/CreateTenants";
import EditTenant from "../pages/EditTenant";
import TenantDetails from "../pages/TenantDetails";

// Organizations Management
import Organizations from "../pages/organizations/Organizations";
import CreateOrganization from "../pages/organizations/CreateOrganization";
import EditOrganization from "../pages/organizations/EditOrganization";
import OrganizationDetails from "../pages/organizations/OrganizationDetails";

// Users Management
import Users from "../pages/users/Users";
import CreateUser from "../pages/users/CreateUser";
import EditUser from "../pages/users/EditUser";
import UserDetails from "../pages/users/UserDetails";

// Roles Management
import Roles from "../pages/roles/Roles";
import CreateRole from "../pages/roles/CreateRole";
import EditRole from "../pages/roles/EditRole";
import RoleDetails from "../pages/roles/RoleDetails";

// Permissions Management

import Permissions from "../pages/permissions/Permissions";
import CreatePermission from "../pages/permissions/CreatePermission";
import EditPermission from "../pages/permissions/EditPermission";
import PermissionDetails from "../pages/permissions/PermissionDetails";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Dashboard */}

          <Route path="/" element={<Dashboard />} />

          <Route path="/dashboard" element={<Dashboard />} />

          {/* Tenants */}

          <Route path="/tenants" element={<Tenants />} />

          <Route path="/tenants/create" element={<CreateTenant />} />

          <Route path="/tenants/:id" element={<TenantDetails />} />

          <Route path="/tenants/:id/edit" element={<EditTenant />} />

          {/* Organizations */}

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

          {/* Users */}

          <Route path="/users" element={<Users />} />

          <Route path="/users/create" element={<CreateUser />} />

          <Route path="/users/:id" element={<UserDetails />} />

          <Route path="/users/:id/edit" element={<EditUser />} />

          {/* Roles */}

          <Route path="/roles" element={<Roles />} />

          <Route path="/roles/create" element={<CreateRole />} />

          <Route path="/roles/:id" element={<RoleDetails />} />

          <Route path="/roles/:id/edit" element={<EditRole />} />

          {/* Permissions */}

          <Route path="/permissions" element={<Permissions />} />

          <Route path="/permissions/create" element={<CreatePermission />} />

          <Route path="/permissions/:id" element={<PermissionDetails />} />

          <Route path="/permissions/:id/edit" element={<EditPermission />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
