import { Plus, Search, ShieldCheck } from "lucide-react";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  usePermissions,
  useDeletePermission,
  useActivatePermission,
  useDeactivatePermission,
} from "../../hooks/usePermissions";

import type { Permission } from "../../types/permission";

import PermissionRow from "../../components/permissions/PermissionRow";

export default function Permissions() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [module, setModule] = useState("all");

  const [action, setAction] = useState("all");

  const [status, setStatus] = useState("all");

  const [page, setPage] = useState(1);

  const limit = 10;

  const permissionsQuery = usePermissions({
    search,
    module,
    action,
    status,
    page,
    limit,
  });

  const deletePermission = useDeletePermission();

  const activatePermission = useActivatePermission();

  const deactivatePermission = useDeactivatePermission();

  const permissionList = permissionsQuery.data?.data ?? [];

  const total = permissionsQuery.data?.total ?? 0;

  const totalPages = permissionsQuery.data?.totalPages ?? 1;

  const handleDelete = (permission: Permission) => {
    const confirmed = window.confirm(`Delete permission "${permission.name}"?`);

    if (!confirmed) {
      return;
    }

    deletePermission.mutate(permission.id);
  };

  const handleToggle = (permission: Permission) => {
    const isActive = permission.status === "Active";

    const actionText = isActive ? "deactivate" : "activate";

    const confirmed = window.confirm(
      `Are you sure you want to ${actionText} "${permission.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    if (isActive) {
      deactivatePermission.mutate(permission.id);
    } else {
      activatePermission.mutate(permission.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-50 p-3">
            <ShieldCheck size={25} className="text-blue-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Permission Management
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage platform permissions and access controls.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/permissions/create")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Permission
        </button>
      </div>

      {/* Filters */}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search permissions..."
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={module}
            onChange={(event) => {
              setModule(event.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">All Modules</option>

            <option value="Dashboard">Dashboard</option>

            <option value="Tenants">Tenants</option>

            <option value="Organizations">Organizations</option>

            <option value="Users">Users</option>

            <option value="Roles">Roles</option>

            <option value="Permissions">Permissions</option>
          </select>

          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">All Status</option>

            <option value="Active">Active</option>

            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="mt-3">
          <select
            value={action}
            onChange={(event) => {
              setAction(event.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">All Actions</option>

            <option value="View">View</option>

            <option value="Create">Create</option>

            <option value="Edit">Edit</option>

            <option value="Delete">Delete</option>

            <option value="Manage">Manage</option>
          </select>
        </div>
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {permissionsQuery.isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          </div>
        ) : permissionsQuery.isError ? (
          <div className="p-8 text-center text-red-600">
            Failed to load permissions.
          </div>
        ) : permissionList.length === 0 ? (
          <div className="p-12 text-center">
            <ShieldCheck size={40} className="mx-auto text-slate-300" />

            <h3 className="mt-4 font-semibold text-slate-900">
              No permissions found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead className="bg-slate-50">
                  <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4">Permission</th>

                    <th className="px-6 py-4">Module</th>

                    <th className="px-6 py-4">Action</th>

                    <th className="px-6 py-4">Roles</th>

                    <th className="px-6 py-4">Status</th>

                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {permissionList.map((permission) => (
                    <PermissionRow
                      key={permission.id}
                      permission={permission}
                      onView={(item) => navigate(`/permissions/${item.id}`)}
                      onEdit={(item) =>
                        navigate(`/permissions/${item.id}/edit`)
                      }
                      onToggle={handleToggle}
                      onDelete={handleDelete}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}

            <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-medium text-slate-700">
                  {permissionList.length}
                </span>{" "}
                of <span className="font-medium text-slate-700">{total}</span>{" "}
                permissions
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => setPage((current) => current - 1)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="px-2 text-sm text-slate-600">
                  {page} / {totalPages}
                </span>

                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((current) => current + 1)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
