import { ArrowLeft, Edit, KeyRound, ShieldCheck, Users } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import { usePermission } from "../../hooks/usePermissions";

import PermissionStatusBadge from "../../components/permissions/PermissionStatusBadge";

export default function PermissionDetails() {
  const navigate = useNavigate();

  const { id } = useParams<{
    id: string;
  }>();

  const permissionId = Number(id);

  const permissionQuery = usePermission(permissionId);

  const permission = permissionQuery.data;

  if (permissionQuery.isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      </div>
    );
  }

  if (permissionQuery.isError || !permission) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
        Permission not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Navigation */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <button
          type="button"
          onClick={() => navigate("/permissions")}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft size={17} />
          Back to Permissions
        </button>

        <button
          type="button"
          onClick={() => navigate(`/permissions/${permission.id}/edit`)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Edit size={17} />
          Edit Permission
        </button>
      </div>

      {/* Header */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
            <KeyRound size={32} className="text-blue-600" />
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">
                {permission.name}
              </h1>

              <PermissionStatusBadge status={permission.status} />
            </div>

            <p className="mt-2 font-mono text-sm text-slate-500">
              {permission.code}
            </p>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              {permission.description}
            </p>
          </div>
        </div>
      </div>

      {/* Statistics */}

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3">
              <ShieldCheck size={22} className="text-blue-600" />
            </div>

            <div>
              <p className="text-sm text-slate-500">Module</p>

              <p className="text-lg font-bold text-slate-900">
                {permission.module}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet-50 p-3">
              <KeyRound size={22} className="text-violet-600" />
            </div>

            <div>
              <p className="text-sm text-slate-500">Action</p>

              <p className="text-lg font-bold text-slate-900">
                {permission.action}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 p-3">
              <Users size={22} className="text-emerald-600" />
            </div>

            <div>
              <p className="text-sm text-slate-500">Assigned Roles</p>

              <p className="text-2xl font-bold text-slate-900">
                {permission.roles}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Information */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Permission Information
        </h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Permission Code
            </p>

            <p className="mt-2 font-mono text-sm text-slate-700">
              {permission.code}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Module
            </p>

            <p className="mt-2 text-sm font-medium text-slate-700">
              {permission.module}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Action
            </p>

            <p className="mt-2 text-sm font-medium text-slate-700">
              {permission.action}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Status
            </p>

            <div className="mt-2">
              <PermissionStatusBadge status={permission.status} />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Created
            </p>

            <p className="mt-2 text-sm text-slate-700">
              {permission.createdAt}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Last Updated
            </p>

            <p className="mt-2 text-sm text-slate-700">
              {permission.updatedAt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
