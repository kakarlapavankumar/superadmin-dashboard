import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "../auth/ProtectedRoute";

import Layout from "../components/layout/Layout";

// =====================================================
// Authentication
// =====================================================
import Login from "../pages/auth/Login";

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

// =====================================================
// Subscription Management
// =====================================================
import Subscriptions from "../pages/subscriptions/Subscriptions";
import CreateSubscription from "../pages/subscriptions/CreateSubscription";
import EditSubscription from "../pages/subscriptions/EditSubscription";
import SubscriptionDetails from "../pages/subscriptions/SubscriptionDetails";

// =====================================================
// Security
// =====================================================
import Security from "../pages/security/Security";

// =====================================================
// Audit Logs
// =====================================================
import AuditLogs from "../pages/auditLogs/AuditLogs";

// =====================================================
// Notifications
// =====================================================
import Notifications from "../pages/notifications/Notifications";
import CreateNotification from "../pages/notifications/CreateNotification";

// =====================================================
// Monitoring
// =====================================================
import Monitoring from "../pages/monitoring/Monitoring";

// =====================================================
// API Management
// =====================================================
import ApiManagement from "../pages/apiManagement/ApiManagement";
import ApiUsage from "../pages/apiManagement/ApiUsage";
import CreateApiKey from "../pages/apiManagement/CreateApiKey";

// =====================================================
// Billing
// =====================================================
import Billing from "../pages/billing/Billing";
import Invoices from "../pages/billing/Invoices";
import PaymentHistory from "../pages/billing/PaymentHistory";

// =====================================================
// Reports & Analytics
// =====================================================
import ReportsAnalytics from "../pages/reports/ReportsAnalytics";

// =====================================================
// Support
// =====================================================
import Support from "../pages/support/Support";
import CreateSupportTicket from "../pages/support/CreateSupportTicket";
import SupportTicketDetails from "../pages/support/SupportTicketDetails";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =====================================================
            PUBLIC ROUTES
        ====================================================== */}

        {/* Login page does NOT use Layout */}
        <Route path="/login" element={<Login />} />

        {/* =====================================================
            PROTECTED APPLICATION
        ====================================================== */}

        <Route element={<ProtectedRoute />}>
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

            <Route
              path="/organizations/:id"
              element={<OrganizationDetails />}
            />

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

            {/* =====================================================
                SUBSCRIPTION MANAGEMENT
            ====================================================== */}

            <Route path="/subscriptions" element={<Subscriptions />} />

            <Route
              path="/subscriptions/create"
              element={<CreateSubscription />}
            />

            <Route
              path="/subscriptions/:id"
              element={<SubscriptionDetails />}
            />

            <Route
              path="/subscriptions/:id/edit"
              element={<EditSubscription />}
            />

            {/* =====================================================
                SECURITY
            ====================================================== */}

            <Route path="/security" element={<Security />} />

            {/* =====================================================
                AUDIT LOGS
            ====================================================== */}

            <Route path="/audit-logs" element={<AuditLogs />} />

            {/* =====================================================
                NOTIFICATIONS
            ====================================================== */}

            <Route path="/notifications" element={<Notifications />} />

            <Route
              path="/notifications/create"
              element={<CreateNotification />}
            />

            {/* =====================================================
                MONITORING
            ====================================================== */}

            <Route path="/monitoring" element={<Monitoring />} />

            {/* =====================================================
                API MANAGEMENT
            ====================================================== */}

            <Route path="/api-management" element={<ApiManagement />} />

            <Route path="/api-management/usage" element={<ApiUsage />} />

            <Route path="/api-management/create" element={<CreateApiKey />} />

            {/* =====================================================
                BILLING
            ====================================================== */}

            <Route path="/billing" element={<Billing />} />

            <Route path="/billing/invoices" element={<Invoices />} />

            <Route
              path="/billing/payment-history"
              element={<PaymentHistory />}
            />

            {/* =====================================================
                REPORTS & ANALYTICS
            ====================================================== */}

            <Route path="/reports" element={<ReportsAnalytics />} />

            {/* =====================================================
                SUPPORT
            ====================================================== */}

            <Route path="/support" element={<Support />} />

            <Route path="/support/create" element={<CreateSupportTicket />} />

            <Route path="/support/:id" element={<SupportTicketDetails />} />
          </Route>
        </Route>

        {/* =====================================================
            FALLBACK
        ====================================================== */}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
