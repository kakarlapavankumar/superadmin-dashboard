import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Edit, Power, Trash2, Plus, Search } from "lucide-react";

import {
  useTenants,
  useActivateTenant,
  useDeactivateTenant,
  useDeleteTenant,
} from "../hooks/useTenants";

export default function Tenants() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [plan, setPlan] = useState("all");
  const [page, setPage] = useState(1);

  const limit = 10;

  const tenantsQuery = useTenants({
    search,
    status,
    plan,
    page,
    limit,
  });

  const activateMutation = useActivateTenant();
  const deactivateMutation = useDeactivateTenant();
  const deleteMutation = useDeleteTenant();

  /*
   * IMPORTANT:
   *
   * getTenants() returns:
   *
   * {
   *   data: Tenant[],
   *   total: number,
   *   page: number,
   *   limit: number,
   *   totalPages: number
   * }
   *
   * Therefore we need .data.data
   */
  const tenants = tenantsQuery.data?.data ?? [];

  const total = tenantsQuery.data?.total ?? 0;

  const totalPages = tenantsQuery.data?.totalPages ?? 1;

  const currentPage = tenantsQuery.data?.page ?? page;

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const handlePlanChange = (value: string) => {
    setPlan(value);
    setPage(1);
  };

  const handleToggleStatus = async (
    id: number,
    currentStatus: "Active" | "Inactive",
  ) => {
    try {
      if (currentStatus === "Active") {
        await deactivateMutation.mutateAsync(id);
      } else {
        await activateMutation.mutateAsync(id);
      }
    } catch (error) {
      console.error("Failed to update tenant status:", error);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(id);

      if (tenants.length === 1 && page > 1) {
        setPage(page - 1);
      }
    } catch (error) {
      console.error("Failed to delete tenant:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Tenant Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage all tenants across the platform.
          </p>
        </div>

        <Link
          to="/tenants/create"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Tenant
        </Link>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* Search */}
          <div className="relative md:col-span-2">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder="Search tenants..."
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Status */}
          <select
            value={status}
            onChange={(event) => handleStatusChange(event.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          {/* Plan */}
          <select
            value={plan}
            onChange={(event) => handlePlanChange(event.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">All Plans</option>
            <option value="Basic">Basic</option>
            <option value="Professional">Professional</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>
      </div>

      {/* Loading */}
      {tenantsQuery.isLoading && (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

          <p className="mt-4 text-sm text-gray-500">Loading tenants...</p>
        </div>
      )}

      {/* Error */}
      {tenantsQuery.isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <h3 className="font-semibold text-red-700">Failed to load tenants</h3>

          <p className="mt-1 text-sm text-red-600">
            {tenantsQuery.error instanceof Error
              ? tenantsQuery.error.message
              : "Something went wrong."}
          </p>

          <button
            onClick={() => tenantsQuery.refetch()}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Table */}
      {!tenantsQuery.isLoading && !tenantsQuery.isError && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {/* Table Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <div>
              <h2 className="font-semibold text-gray-900">All Tenants</h2>

              <p className="mt-1 text-xs text-gray-500">
                {total} tenant{total !== 1 ? "s" : ""} found
              </p>
            </div>
          </div>

          {tenants.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="font-medium text-gray-700">No tenants found</p>

              <p className="mt-1 text-sm text-gray-500">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="border-b border-gray-200">
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Tenant
                      </th>

                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Domain
                      </th>

                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Plan
                      </th>

                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Users
                      </th>

                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Organizations
                      </th>

                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Status
                      </th>

                      <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {tenants.map((tenant) => (
                      <tr
                        key={tenant.id}
                        className="transition hover:bg-gray-50"
                      >
                        {/* Tenant */}
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {tenant.name}
                            </p>

                            <p className="mt-0.5 text-xs text-gray-500">
                              {tenant.code}
                            </p>
                          </div>
                        </td>

                        {/* Domain */}
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {tenant.domain}
                        </td>

                        {/* Plan */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                              tenant.plan === "Enterprise"
                                ? "bg-purple-100 text-purple-700"
                                : tenant.plan === "Professional"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {tenant.plan}
                          </span>
                        </td>

                        {/* Users */}
                        <td className="px-6 py-4 text-sm font-medium text-gray-700">
                          {tenant.users.toLocaleString()}
                        </td>

                        {/* Organizations */}
                        <td className="px-6 py-4 text-sm font-medium text-gray-700">
                          {tenant.organizations}
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                              tenant.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                tenant.status === "Active"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                            />

                            {tenant.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-1">
                            <Link
                              to={`/tenants/${tenant.id}`}
                              title="View tenant"
                              className="rounded-lg p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-600"
                            >
                              <Eye size={17} />
                            </Link>

                            <Link
                              to={`/tenants/${tenant.id}/edit`}
                              title="Edit tenant"
                              className="rounded-lg p-2 text-gray-500 transition hover:bg-yellow-50 hover:text-yellow-600"
                            >
                              <Edit size={17} />
                            </Link>

                            <button
                              type="button"
                              title={
                                tenant.status === "Active"
                                  ? "Deactivate tenant"
                                  : "Activate tenant"
                              }
                              onClick={() =>
                                handleToggleStatus(tenant.id, tenant.status)
                              }
                              disabled={
                                activateMutation.isPending ||
                                deactivateMutation.isPending
                              }
                              className="rounded-lg p-2 text-gray-500 transition hover:bg-green-50 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Power size={17} />
                            </button>

                            <button
                              type="button"
                              title="Delete tenant"
                              onClick={() =>
                                handleDelete(tenant.id, tenant.name)
                              }
                              disabled={deleteMutation.isPending}
                              className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="divide-y divide-gray-200 md:hidden">
                {tenants.map((tenant) => (
                  <div key={tenant.id} className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {tenant.name}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                          {tenant.code}
                        </p>

                        <p className="mt-2 text-sm text-gray-600">
                          {tenant.domain}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          tenant.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {tenant.status}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-gray-500">Plan</p>
                        <p className="font-medium text-gray-800">
                          {tenant.plan}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Users</p>
                        <p className="font-medium text-gray-800">
                          {tenant.users.toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Organizations</p>
                        <p className="font-medium text-gray-800">
                          {tenant.organizations}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Link
                        to={`/tenants/${tenant.id}`}
                        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        View
                      </Link>

                      <Link
                        to={`/tenants/${tenant.id}/edit`}
                        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          handleToggleStatus(tenant.id, tenant.status)
                        }
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        {tenant.status === "Active" ? "Off" : "On"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex flex-col gap-3 border-t border-gray-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => setPage((previous) => previous - 1)}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  <span className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
                    {currentPage}
                  </span>

                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => setPage((previous) => previous + 1)}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
