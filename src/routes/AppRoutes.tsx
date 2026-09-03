import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "../components/layout/Layout";

// =====================================================
// Dashboard
// =====================================================
import Dashboard from "../pages/Dashboard";

// =====================================================
// Tenant Management
// =====================================================
import Tenants from "../pages/Tenants";
import CreateTenant from "../pages/CreateTenants";
import EditTenant from "../pages/EditTenant";
import TenantDetails from "../pages/TenantDetails";

// =====================================================
// Organization Management
// =====================================================
import Organizations from "../pages/organizations/Organizations";
import CreateOrganization from "../pages/organizations/CreateOrganization";
import EditOrganization from "../pages/organizations/EditOrganization";
import OrganizationDetails from "../pages/organizations/OrganizationDetails";

// =====================================================
// User Management
// =====================================================
import Users from "../pages/users/Users";
import CreateUser from "../pages/users/CreateUser";
import EditUser from "../pages/users/EditUser";
import UserDetails from "../pages/users/UserDetails";

// =====================================================
// Role Management
// =====================================================
import Roles from "../pages/roles/Roles";
import CreateRole from "../pages/roles/CreateRole";
import EditRole from "../pages/roles/EditRole";
import RoleDetails from "../pages/roles/RoleDetails";

// =====================================================
// Permission Management
// =====================================================
import Permissions from "../pages/permissions/Permissions";
import CreatePermission from "../pages/permissions/CreatePermission";
import EditPermission from "../pages/permissions/EditPermission";
import PermissionDetails from "../pages/permissions/PermissionDetails";

// =====================================================
// Data Permission Management
// =====================================================
import DataPermissions from "../pages/dataPermissions/DataPermissions";
import CreateDataPermission from "../pages/dataPermissions/CreateDataPermission";
import EditDataPermission from "../pages/dataPermissions/EditDataPermission";
import DataPermissionDetails from "../pages/dataPermissions/DataPermissionDetails";

// =====================================================
// Platform Configuration
// =====================================================
import PlatformConfiguration from "../pages/platform/PlatformConfiguration";

// =====================================================
// Feature Management
// =====================================================
import Features from "../pages/features/Features";
import CreateFeature from "../pages/features/CreateFeature";
import EditFeature from "../pages/features/EditFeature";
import FeatureDetails from "../pages/features/FeatureDetails";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =====================================================
            MAIN APPLICATION LAYOUT
        ====================================================== */}

        <Route element={<Layout />}>
          {/* =====================================================
              DASHBOARD
          ====================================================== */}

          <Route path="/" element={<Dashboard />} />

          <Route path="/dashboard" element={<Dashboard />} />

          {/* =====================================================
              TENANT MANAGEMENT
          ====================================================== */}

          <Route path="/tenants" element={<Tenants />} />

          <Route path="/tenants/create" element={<CreateTenant />} />

          <Route path="/tenants/:id" element={<TenantDetails />} />

          <Route path="/tenants/:id/edit" element={<EditTenant />} />

          {/* =====================================================
              ORGANIZATION MANAGEMENT
          ====================================================== */}

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

          {/* =====================================================
              USER MANAGEMENT
          ====================================================== */}

          <Route path="/users" element={<Users />} />

          <Route path="/users/create" element={<CreateUser />} />

          <Route path="/users/:id" element={<UserDetails />} />

          <Route path="/users/:id/edit" element={<EditUser />} />

          {/* =====================================================
              ROLE MANAGEMENT
          ====================================================== */}

          <Route path="/roles" element={<Roles />} />

          <Route path="/roles/create" element={<CreateRole />} />

          <Route path="/roles/:id" element={<RoleDetails />} />

          <Route path="/roles/:id/edit" element={<EditRole />} />

          {/* =====================================================
              PERMISSION MANAGEMENT
          ====================================================== */}

          <Route path="/permissions" element={<Permissions />} />

          <Route path="/permissions/create" element={<CreatePermission />} />

          <Route path="/permissions/:id" element={<PermissionDetails />} />

          <Route path="/permissions/:id/edit" element={<EditPermission />} />

          {/* =====================================================
              DATA PERMISSION MANAGEMENT
          ====================================================== */}

          <Route path="/data-permissions" element={<DataPermissions />} />

          <Route
            path="/data-permissions/create"
            element={<CreateDataPermission />}
          />

          <Route
            path="/data-permissions/:id"
            element={<DataPermissionDetails />}
          />

          <Route
            path="/data-permissions/:id/edit"
            element={<EditDataPermission />}
          />

          {/* =====================================================
              PLATFORM CONFIGURATION
          ====================================================== */}

          <Route path="/configuration" element={<PlatformConfiguration />} />

          {/* =====================================================
              FEATURE MANAGEMENT
          ====================================================== */}

          <Route path="/features" element={<Features />} />

          <Route path="/features/create" element={<CreateFeature />} />

          <Route path="/features/:id" element={<FeatureDetails />} />

          <Route path="/features/:id/edit" element={<EditFeature />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
