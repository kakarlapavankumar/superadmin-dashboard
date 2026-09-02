import { useState } from "react";
import { Eye, Edit, Power, Trash2, Plus, Search } from "lucide-react";

import { Link } from "react-router-dom";

import {
  useOrganizations,
  useDeleteOrganization,
  useToggleOrganizationStatus,
} from "../../hooks/useOrganizations";

export default function Organizations() {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("all");

  const [page, setPage] = useState(1);

  const limit = 10;

  const organizationQuery = useOrganizations({
    search,
    status,
    page,
    limit,
  });

  const deleteMutation = useDeleteOrganization();

  const toggleMutation = useToggleOrganizationStatus();

  const organizations = organizationQuery.data?.data ?? [];

  const total = organizationQuery.data?.total ?? 0;

  const totalPages = organizationQuery.data?.totalPages ?? 1;

  const currentPage = organizationQuery.data?.page ?? page;

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatus = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const handleDelete = async (id: string, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(id);

      if (organizations.length === 1 && page > 1) {
        setPage((previous) => previous - 1);
      }
    } catch (error) {
      console.error("Failed to delete organization:", error);
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleMutation.mutateAsync(id);
    } catch (error) {
      console.error("Failed to update organization:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Organization Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage organizations across your tenants.
          </p>
        </div>

        <Link
          to="/organizations/create"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Organization
        </Link>
      </div>

      {/* Filters */}

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="relative md:col-span-2">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder="Search organizations..."
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={status}
            onChange={(event) => handleStatus(event.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">All Status</option>

            <option value="Active">Active</option>

            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Loading */}

      {organizationQuery.isLoading && (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

          <p className="mt-4 text-sm text-gray-500">Loading organizations...</p>
        </div>
      )}

      {/* Error */}

      {organizationQuery.isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <h3 className="font-semibold text-red-700">
            Failed to load organizations
          </h3>

          <button
            onClick={() => organizationQuery.refetch()}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Table */}

      {!organizationQuery.isLoading && !organizationQuery.isError && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="font-semibold text-gray-900">Organizations</h2>

            <p className="mt-1 text-xs text-gray-500">
              {total} organization
              {total !== 1 ? "s" : ""} found
            </p>
          </div>

          {organizations.length === 0 ? (
            <div className="p-12 text-center">
              <p className="font-medium text-gray-700">
                No organizations found
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="border-b border-gray-200">
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Organization
                      </th>

                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Tenant
                      </th>

                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Industry
                      </th>

                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Employees
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
                    {organizations.map((organization) => (
                      <tr key={organization.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-gray-900">
                            {organization.name}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {organization.code}
                          </p>
                        </td>

                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-gray-700">
                            {organization.tenantName}
                          </p>

                          <p className="text-xs text-gray-500">
                            Tenant #{organization.tenantId}
                          </p>
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {organization.industry}
                        </td>

                        <td className="px-6 py-4 text-sm font-medium text-gray-700">
                          {organization.employees.toLocaleString()}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                              organization.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {organization.status}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-1">
                            <Link
                              to={`/organizations/${organization.id}`}
                              className="rounded-lg p-2 text-gray-500 hover:bg-blue-50 hover:text-blue-600"
                              title="View"
                            >
                              <Eye size={17} />
                            </Link>

                            <Link
                              to={`/organizations/${organization.id}/edit`}
                              className="rounded-lg p-2 text-gray-500 hover:bg-yellow-50 hover:text-yellow-600"
                              title="Edit"
                            >
                              <Edit size={17} />
                            </Link>

                            <button
                              type="button"
                              onClick={() => handleToggle(organization.id)}
                              className="rounded-lg p-2 text-gray-500 hover:bg-green-50 hover:text-green-600"
                              title="Toggle status"
                            >
                              <Power size={17} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(organization.id, organization.name)
                              }
                              className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                              title="Delete"
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

              {/* Pagination */}

              <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
                <p className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </p>

                <div className="flex gap-2">
                  <button
                    disabled={currentPage <= 1}
                    onClick={() => setPage((previous) => previous - 1)}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm disabled:opacity-40"
                  >
                    Previous
                  </button>

                  <button
                    disabled={currentPage >= totalPages}
                    onClick={() => setPage((previous) => previous + 1)}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm disabled:opacity-40"
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
