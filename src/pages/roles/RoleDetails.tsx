import { ArrowLeft, Edit, ShieldCheck, Users } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import { useRole } from "../../hooks/useRoles";

import RoleStatusBadge from "../../components/roles/RoleStatusBadge";

export default function RoleDetails() {
  const navigate = useNavigate();

  const { id } = useParams<{
    id: string;
  }>();

  const roleId = Number(id);

  const roleQuery = useRole(roleId);

  const role = roleQuery.data;

  if (roleQuery.isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      </div>
    );
  }

  if (roleQuery.isError || !role) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
        Role not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <button
          type="button"
          onClick={() => navigate("/roles")}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft size={17} />
          Back to Roles
        </button>

        <button
          type="button"
          onClick={() => navigate(`/roles/${role.id}/edit`)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Edit size={17} />
          Edit Role
        </button>
      </div>

      {/* Role header */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
            <ShieldCheck size={32} className="text-blue-600" />
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">{role.name}</h1>

              <RoleStatusBadge status={role.status} />
            </div>

            <p className="mt-1 font-mono text-sm text-slate-500">{role.code}</p>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              {role.description}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3">
              <Users size={22} className="text-blue-600" />
            </div>

            <div>
              <p className="text-sm text-slate-500">Assigned Users</p>

              <p className="text-2xl font-bold text-slate-900">{role.users}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet-50 p-3">
              <ShieldCheck size={22} className="text-violet-600" />
            </div>

            <div>
              <p className="text-sm text-slate-500">Permissions</p>

              <p className="text-2xl font-bold text-slate-900">
                {role.permissions.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Created</p>

          <p className="mt-2 text-lg font-bold text-slate-900">
            {role.createdAt}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Last updated {role.updatedAt}
          </p>
        </div>
      </div>

      {/* Permissions */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Assigned Permissions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Permissions currently assigned to this role.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {role.permissions.map((permission) => (
            <div
              key={permission}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <p className="text-sm font-medium text-slate-700">{permission}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
