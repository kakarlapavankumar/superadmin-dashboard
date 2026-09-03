import { Plus, Search, ShieldCheck } from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useDataPermissions,
  useDeleteDataPermission,
  useActivateDataPermission,
  useDeactivateDataPermission,
} from "../../hooks/useDataPermissions";

import type { DataPermission } from "../../types/dataPermission";

export default function DataPermissions() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [resource, setResource] = useState("all");

  const [scope, setScope] = useState("all");

  const [accessLevel, setAccessLevel] = useState("all");

  const [status, setStatus] = useState("all");

  const [page, setPage] = useState(1);

  const limit = 10;

  const query = useDataPermissions({
    search,
    resource,
    scope,
    accessLevel,
    status,
    page,
    limit,
  });

  const deleteMutation = useDeleteDataPermission();

  const activateMutation = useActivateDataPermission();

  const deactivateMutation = useDeactivateDataPermission();

  const permissionList = query.data?.data ?? [];

  const total = query.data?.total ?? 0;

  const totalPages = query.data?.totalPages ?? 1;

  const startItem = total === 0 ? 0 : (page - 1) * limit + 1;

  const endItem = Math.min(page * limit, total);

  const handleDelete = (permission: DataPermission) => {
    const confirmed = window.confirm(
      `Delete data permission "${permission.name}"?`,
    );

    if (!confirmed) return;

    deleteMutation.mutate(permission.id);
  };

  const handleToggle = (permission: DataPermission) => {
    const isActive = permission.status === "Active";

    const action = isActive ? "deactivate" : "activate";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} "${permission.name}"?`,
    );

    if (!confirmed) return;

    if (isActive) {
      deactivateMutation.mutate(permission.id);
    } else {
      activateMutation.mutate(permission.id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-50 p-3">
            <ShieldCheck size={25} className="text-blue-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Data Permission Management
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Control which data users and roles can access.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/data-permissions/create")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Data Permission
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-5">
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
              placeholder="Search data permissions..."
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={resource}
            onChange={(event) => {
              setResource(event.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">All Resources</option>
            <option value="Tenants">Tenants</option>
            <option value="Organizations">Organizations</option>
            <option value="Users">Users</option>
            <option value="Roles">Roles</option>
            <option value="Permissions">Permissions</option>
            <option value="Reports">Reports</option>
          </select>

          <select
            value={scope}
            onChange={(event) => {
              setScope(event.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">All Scopes</option>
            <option value="Global">Global</option>
            <option value="Tenant">Tenant</option>
            <option value="Organization">Organization</option>
            <option value="Own">Own</option>
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
            value={accessLevel}
            onChange={(event) => {
              setAccessLevel(event.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">All Access Levels</option>
            <option value="Read">Read</option>
            <option value="ReadWrite">Read & Write</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {query.isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          </div>
        ) : query.isError ? (
          <div className="p-8 text-center text-red-600">
            Failed to load data permissions.
          </div>
        ) : permissionList.length === 0 ? (
          <div className="p-12 text-center">
            <ShieldCheck size={40} className="mx-auto text-slate-300" />

            <h3 className="mt-4 font-semibold text-slate-900">
              No data permissions found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px]">
                <thead className="bg-slate-50">
                  <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4">Permission</th>

                    <th className="px-6 py-4">Resource</th>

                    <th className="px-6 py-4">Scope</th>

                    <th className="px-6 py-4">Access</th>

                    <th className="px-6 py-4">Roles</th>

                    <th className="px-6 py-4">Status</th>

                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {permissionList.map((permission) => (
                    <tr
                      key={permission.id}
                      className="border-t border-slate-100"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-slate-900">
                            {permission.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {permission.code}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-700">
                        {permission.resource}
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                          {permission.scope}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-700">
                        {permission.accessLevel === "ReadWrite"
                          ? "Read & Write"
                          : "Read"}
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-slate-700">
                        {permission.assignedRoles}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={
                            permission.status === "Active"
                              ? "rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700"
                              : "rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700"
                          }
                        >
                          {permission.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/data-permissions/${permission.id}`)
                            }
                            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                          >
                            View
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/data-permissions/${permission.id}/edit`,
                              )
                            }
                            className="rounded-lg border border-blue-200 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleToggle(permission)}
                            className="rounded-lg border border-amber-200 px-3 py-1.5 text-xs font-medium text-amber-600 hover:bg-amber-50"
                          >
                            {permission.status === "Active"
                              ? "Deactivate"
                              : "Activate"}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(permission)}
                            className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-medium text-slate-700">
                  {startItem}–{endItem}
                </span>{" "}
                of <span className="font-medium text-slate-700">{total}</span>{" "}
                data permissions
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
