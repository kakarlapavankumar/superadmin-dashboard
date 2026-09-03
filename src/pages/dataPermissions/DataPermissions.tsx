import { Eye, Edit, Trash2, Plus, Search, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useDataPermissions,
  useDeleteDataPermission,
  useActivateDataPermission,
  useDeactivateDataPermission,
} from "../../hooks/useDataPermissions";

import type {
  DataAccessLevel,
  DataResource,
  DataScope,
  DataPermissionStatus,
} from "../../types/dataPermission";

const resources: DataResource[] = [
  "Tenants",
  "Organizations",
  "Users",
  "Roles",
  "Permissions",
  "Reports",
];

const scopes: DataScope[] = ["Global", "Tenant", "Organization", "Own"];

const accessLevels: DataAccessLevel[] = ["Read", "ReadWrite"];

const statuses: DataPermissionStatus[] = ["Active", "Inactive"];

export default function DataPermission() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [resource, setResource] = useState("all");
  const [scope, setScope] = useState("all");
  const [accessLevel, setAccessLevel] = useState("all");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  const limit = 10;

  const permissionsQuery = useDataPermissions({
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

  const permissions = permissionsQuery.data?.data ?? [];

  const total = permissionsQuery.data?.total ?? 0;

  const totalPages = permissionsQuery.data?.totalPages ?? 1;

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this data permission?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(id);

      if (permissions.length === 1 && page > 1) {
        setPage(page - 1);
      }
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "Failed to delete data permission.",
      );
    }
  };

  const handleStatusChange = async (
    id: number,
    currentStatus: DataPermissionStatus,
  ) => {
    try {
      if (currentStatus === "Active") {
        await deactivateMutation.mutateAsync(id);
      } else {
        await activateMutation.mutateAsync(id);
      }
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : "Failed to update status.",
      );
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setResource("all");
    setScope("all");
    setAccessLevel("all");
    setStatus("all");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-3">
                <ShieldCheck className="h-6 w-6 text-blue-600" />
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
          </div>

          <button
            type="button"
            onClick={() => navigate("/data-permissions/create")}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Create Data Permission
          </button>
        </div>

        {/* Filters */}

        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            {/* Search */}

            <div className="relative lg:col-span-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(event) => handleSearch(event.target.value)}
                placeholder="Search..."
                className="w-full rounded-lg border border-slate-300 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Resource */}

            <select
              value={resource}
              onChange={(event) => {
                setResource(event.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="all">All Resources</option>

              {resources.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* Scope */}

            <select
              value={scope}
              onChange={(event) => {
                setScope(event.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="all">All Scopes</option>

              {scopes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* Access */}

            <select
              value={accessLevel}
              onChange={(event) => {
                setAccessLevel(event.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="all">All Access</option>

              {accessLevels.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* Status */}

            <select
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="all">All Status</option>

              {statuses.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Clear Filters
          </button>
        </div>

        {/* Loading */}

        {permissionsQuery.isLoading && (
          <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
            <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />

            <p className="mt-3 text-sm text-slate-500">
              Loading data permissions...
            </p>
          </div>
        )}

        {/* Error */}

        {permissionsQuery.isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <h2 className="font-semibold text-red-800">
              Failed to load data permissions
            </h2>

            <p className="mt-1 text-sm text-red-600">
              {permissionsQuery.error instanceof Error
                ? permissionsQuery.error.message
                : "Something went wrong."}
            </p>

            <button
              type="button"
              onClick={() => permissionsQuery.refetch()}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Table */}

        {!permissionsQuery.isLoading && !permissionsQuery.isError && (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Permission
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Resource
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Scope
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Access
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Roles
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {permissions.map((permission) => (
                    <tr key={permission.id} className="hover:bg-slate-50">
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-medium text-slate-900">
                            {permission.name}
                          </p>

                          <p className="mt-1 font-mono text-xs text-slate-400">
                            {permission.code}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {permission.resource}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {permission.scope}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {permission.accessLevel}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {permission.assignedRoles}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            permission.status === "Active"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {permission.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-1">
                          {/* VIEW */}

                          <button
                            type="button"
                            title="View"
                            onClick={() =>
                              navigate(`/data-permissions/${permission.id}`)
                            }
                            className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          {/* EDIT */}

                          <button
                            type="button"
                            title="Edit"
                            onClick={() =>
                              navigate(
                                `/data-permissions/${permission.id}/edit`,
                              )
                            }
                            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                          >
                            <Edit className="h-4 w-4" />
                          </button>

                          {/* STATUS */}

                          <button
                            type="button"
                            title={
                              permission.status === "Active"
                                ? "Deactivate"
                                : "Activate"
                            }
                            onClick={() =>
                              handleStatusChange(
                                permission.id,
                                permission.status,
                              )
                            }
                            className="rounded-lg px-2 py-1 text-xs font-medium text-amber-600 hover:bg-amber-50"
                          >
                            {permission.status === "Active" ? "Off" : "On"}
                          </button>

                          {/* DELETE */}

                          <button
                            type="button"
                            title="Delete"
                            onClick={() => handleDelete(permission.id)}
                            className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty */}

            {permissions.length === 0 && (
              <div className="p-10 text-center">
                <ShieldCheck className="mx-auto h-10 w-10 text-slate-300" />

                <h3 className="mt-3 font-semibold text-slate-900">
                  No data permissions found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Try changing your search or filters.
                </p>
              </div>
            )}

            {/* Pagination */}

            {permissions.length > 0 && (
              <div className="flex flex-col justify-between gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center">
                <p className="text-sm text-slate-500">
                  Showing {(page - 1) * limit + 1}-
                  {Math.min(page * limit, total)} of {total}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => setPage((current) => current - 1)}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  <span className="px-3 text-sm text-slate-600">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    type="button"
                    disabled={page >= totalPages}
                    onClick={() => setPage((current) => current + 1)}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
