import { Plus, Search, ShieldCheck } from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useRoles,
  useDeleteRole,
  useActivateRole,
  useDeactivateRole,
} from "../../hooks/useRoles";

import type { Role } from "../../types/role";

import RoleRow from "../../components/roles/RoleRow";

export default function Roles() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("all");

  const [page, setPage] = useState(1);

  const limit = 10;

  const rolesQuery = useRoles({
    search,
    status,
    page,
    limit,
  });

  const deleteRole = useDeleteRole();

  const activateRole = useActivateRole();

  const deactivateRole = useDeactivateRole();

  const roles = rolesQuery.data?.data ?? [];

  const total = rolesQuery.data?.total ?? 0;

  const totalPages = rolesQuery.data?.totalPages ?? 1;

  const handleDelete = (role: Role) => {
    const confirmed = window.confirm(`Delete role "${role.name}"?`);

    if (!confirmed) return;

    deleteRole.mutate(role.id);
  };

  const handleToggle = (role: Role) => {
    const action = role.status === "Active" ? "deactivate" : "activate";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} "${role.name}"?`,
    );

    if (!confirmed) return;

    if (role.status === "Active") {
      deactivateRole.mutate(role.id);
    } else {
      activateRole.mutate(role.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3">
              <ShieldCheck className="text-blue-600" size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Role Management
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage platform roles and permissions.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/roles/create")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Role
        </button>
      </div>

      {/* Filters */}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
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
              placeholder="Search roles..."
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">All Status</option>

            <option value="Active">Active</option>

            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {rolesQuery.isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          </div>
        ) : rolesQuery.isError ? (
          <div className="p-8 text-center text-red-600">
            Failed to load roles.
          </div>
        ) : roles.length === 0 ? (
          <div className="p-12 text-center">
            <ShieldCheck size={40} className="mx-auto text-slate-300" />

            <h3 className="mt-4 font-semibold text-slate-900">
              No roles found
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
                    <th className="px-6 py-4">Role</th>

                    <th className="px-6 py-4">Description</th>

                    <th className="px-6 py-4">Permissions</th>

                    <th className="px-6 py-4">Users</th>

                    <th className="px-6 py-4">Status</th>

                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {roles.map((role) => (
                    <RoleRow
                      key={role.id}
                      role={role}
                      onView={(item) => navigate(`/roles/${item.id}`)}
                      onEdit={(item) => navigate(`/roles/${item.id}/edit`)}
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
                  {roles.length}
                </span>{" "}
                of <span className="font-medium text-slate-700">{total}</span>{" "}
                roles
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
