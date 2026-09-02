import { Plus, Search, Users as UsersIcon } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

import {
  useUsers,
  useActivateUser,
  useDeactivateUser,
  useDeleteUser,
} from "../../hooks/useUsers";

import UserRow from "../../components/users/UserRow";

import type { User } from "../../types/user";

const Users = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("all");

  const [role, setRole] = useState("all");

  const [page, setPage] = useState(1);

  const limit = 10;

  const usersQuery = useUsers({
    search,
    status,
    role,
    page,
    limit,
  });

  const activateUser = useActivateUser();

  const deactivateUser = useDeactivateUser();

  const deleteUser = useDeleteUser();

  const users = usersQuery.data?.data ?? [];

  const total = usersQuery.data?.total ?? 0;

  const totalPages = usersQuery.data?.totalPages ?? 1;

  const handleToggleStatus = (user: User) => {
    const action = user.status === "Active" ? deactivateUser : activateUser;

    const message =
      user.status === "Active"
        ? `Deactivate ${user.firstName} ${user.lastName}?`
        : `Activate ${user.firstName} ${user.lastName}?`;

    if (!window.confirm(message)) {
      return;
    }

    action.mutate(user.id);
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    deleteUser.mutate(id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-slate-900 p-2.5 text-white">
              <UsersIcon className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                User Management
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage platform users, roles and access.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/users/create")}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" />
          Add User
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Total Users</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">{total}</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Active Users</p>

          <p className="mt-2 text-2xl font-bold text-emerald-600">
            {users.filter((user) => user.status === "Active").length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Inactive Users</p>

          <p className="mt-2 text-2xl font-bold text-slate-500">
            {users.filter((user) => user.status === "Inactive").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search users..."
              className="w-full rounded-lg border border-slate-300 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          >
            <option value="all">All Statuses</option>

            <option value="Active">Active</option>

            <option value="Inactive">Inactive</option>
          </select>

          <select
            value={role}
            onChange={(event) => {
              setRole(event.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          >
            <option value="all">All Roles</option>

            <option value="Super Admin">Super Admin</option>

            <option value="Admin">Admin</option>

            <option value="Manager">Manager</option>

            <option value="User">User</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {usersQuery.isLoading ? (
          <div className="flex h-64 items-center justify-center text-sm text-slate-500">
            Loading users...
          </div>
        ) : usersQuery.isError ? (
          <div className="flex h-64 items-center justify-center text-sm text-red-600">
            Failed to load users.
          </div>
        ) : users.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center">
            <UsersIcon className="h-10 w-10 text-slate-300" />

            <p className="mt-3 font-medium text-slate-700">No users found</p>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left">
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    User
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Role
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Tenant
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Organization
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    onView={(id) => navigate(`/users/${id}`)}
                    onEdit={(id) => navigate(`/users/${id}/edit`)}
                    onToggleStatus={handleToggleStatus}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4">
          <p className="text-sm text-slate-500">
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((previous) => previous - 1)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => setPage((previous) => previous + 1)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
