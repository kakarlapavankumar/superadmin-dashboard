import {
  ArrowLeft,
  Mail,
  Phone,
  Shield,
  Building2,
  Pencil,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import { useUser } from "../../hooks/useUsers";

import UserStatusBadge from "../../components/users/UserStatusBadge";
import UserRoleBadge from "../../components/users/UserRoleBadge";

const UserDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const userQuery = useUser(id);

  const user = userQuery.data;

  if (userQuery.isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-sm text-slate-500">
        Loading user...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <h2 className="text-lg font-semibold text-slate-900">User not found</h2>

        <button
          type="button"
          onClick={() => navigate("/users")}
          className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm text-white"
        >
          Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/users")}
            className="rounded-lg border border-slate-200 bg-white p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">User Details</h1>

            <p className="text-sm text-slate-500">
              View user account information.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate(`/users/${user.id}/edit`)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white"
        >
          <Pencil className="h-4 w-4" />
          Edit User
        </button>
      </div>

      {/* Profile */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-xl font-bold text-white">
            {user.firstName[0]}
            {user.lastName[0]}
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-900">
              {user.firstName} {user.lastName}
            </h2>

            <p className="mt-1 text-sm text-slate-500">{user.email}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              <UserRoleBadge role={user.role} />

              <UserStatusBadge status={user.status} />
            </div>
          </div>
        </div>
      </div>

      {/* Information */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-5 flex items-center gap-3">
            <Mail className="h-5 w-5 text-slate-500" />

            <h2 className="font-semibold text-slate-900">
              Contact Information
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-500">Email</p>

              <p className="mt-1 text-sm font-medium text-slate-900">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">Phone</p>

              <p className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-900">
                <Phone className="h-4 w-4 text-slate-400" />
                {user.phone}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-5 flex items-center gap-3">
            <Building2 className="h-5 w-5 text-slate-500" />

            <h2 className="font-semibold text-slate-900">Organization</h2>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-500">Tenant</p>

              <p className="mt-1 text-sm font-medium text-slate-900">
                {user.tenantName}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">Organization</p>

              <p className="mt-1 text-sm font-medium text-slate-900">
                {user.organizationName}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">Organization ID</p>

              <p className="mt-1 text-sm font-medium text-slate-900">
                {user.organizationId}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Access */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-5 flex items-center gap-3">
          <Shield className="h-5 w-5 text-slate-500" />

          <h2 className="font-semibold text-slate-900">Account Information</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <p className="text-xs text-slate-500">Role</p>

            <div className="mt-2">
              <UserRoleBadge role={user.role} />
            </div>
          </div>

          <div>
            <p className="text-xs text-slate-500">Created</p>

            <p className="mt-1 text-sm font-medium text-slate-900">
              {user.createdAt}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Last Login</p>

            <p className="mt-1 text-sm font-medium text-slate-900">
              {user.lastLogin
                ? new Date(user.lastLogin).toLocaleString()
                : "Never"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
