import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Building2,
  Edit,
  Eye,
  Plus,
  Search,
  Trash2,
  Power,
  PowerOff,
} from "lucide-react";

import {
  useOrganizations,
  useDeleteOrganization,
  useActivateOrganization,
  useDeactivateOrganization,
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

  const deleteOrganization = useDeleteOrganization();

  const activateOrganization = useActivateOrganization();

  const deactivateOrganization = useDeactivateOrganization();

  const organizations = organizationQuery.data?.data ?? [];

  const total = organizationQuery.data?.total ?? 0;

  const totalPages = organizationQuery.data?.totalPages ?? 1;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
    setPage(1);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this organization?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteOrganization.mutateAsync(id);
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "Failed to delete organization.",
      );
    }
  };

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    try {
      if (currentStatus === "Active") {
        await deactivateOrganization.mutateAsync(id);
      } else {
        await activateOrganization.mutateAsync(id);
      }
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "Failed to update organization status.",
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-50 p-3">
              <Building2 className="h-6 w-6 text-indigo-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Organizations
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage organizations across your tenants.
              </p>
            </div>
          </div>
        </div>

        <Link
          to="/organizations/create"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          Create Organization
        </Link>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search organizations..."
              className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <select
            value={status}
            onChange={handleStatusChange}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="all">All Statuses</option>

            <option value="Active">Active</option>

            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Loading */}
      {organizationQuery.isLoading && (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

          <p className="mt-4 text-sm text-slate-500">
            Loading organizations...
          </p>
        </div>
      )}

      {/* Error */}
      {organizationQuery.isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h2 className="font-semibold text-red-700">
            Failed to load organizations
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {organizationQuery.error instanceof Error
              ? organizationQuery.error.message
              : "Something went wrong."}
          </p>
        </div>
      )}

      {/* Empty */}
      {!organizationQuery.isLoading &&
        !organizationQuery.isError &&
        organizations.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
            <Building2 className="mx-auto h-12 w-12 text-slate-300" />

            <h2 className="mt-4 text-lg font-semibold text-slate-800">
              No organizations found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or create a new organization.
            </p>
          </div>
        )}

      {/* Desktop Table */}
      {!organizationQuery.isLoading && organizations.length > 0 && (
        <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:block">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Organization
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Code
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Tenant
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Industry
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Employees
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {organizations.map((organization) => (
                  <tr key={organization.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-indigo-50 p-2">
                          <Building2 className="h-4 w-4 text-indigo-600" />
                        </div>

                        <div>
                          <div className="font-medium text-slate-900">
                            {organization.name}
                          </div>

                          <div className="text-xs text-slate-500">
                            {organization.location}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-700">
                      {organization.code}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {organization.tenantName}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {organization.industry}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {organization.employees.toLocaleString()}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          organization.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {organization.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <Link
                          to={`/organizations/${organization.id}`}
                          title="View"
                          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>

                        <Link
                          to={`/organizations/${organization.id}/edit`}
                          title="Edit"
                          className="rounded-lg p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>

                        <button
                          type="button"
                          title={
                            organization.status === "Active"
                              ? "Deactivate"
                              : "Activate"
                          }
                          onClick={() =>
                            handleStatusToggle(
                              organization.id,
                              organization.status,
                            )
                          }
                          className="rounded-lg p-2 text-slate-500 hover:bg-amber-50 hover:text-amber-600"
                        >
                          {organization.status === "Active" ? (
                            <PowerOff className="h-4 w-4" />
                          ) : (
                            <Power className="h-4 w-4" />
                          )}
                        </button>

                        <button
                          type="button"
                          title="Delete"
                          onClick={() => handleDelete(organization.id)}
                          className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
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
        </div>
      )}

      {/* Mobile Cards */}
      {!organizationQuery.isLoading && organizations.length > 0 && (
        <div className="space-y-3 lg:hidden">
          {organizations.map((organization) => (
            <div
              key={organization.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-indigo-50 p-2.5">
                    <Building2 className="h-5 w-5 text-indigo-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {organization.name}
                    </h3>

                    <p className="text-xs text-slate-500">
                      {organization.code}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    organization.status === "Active"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {organization.status}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-slate-400">Tenant</p>

                  <p className="mt-1 text-slate-700">
                    {organization.tenantName}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Industry</p>

                  <p className="mt-1 text-slate-700">{organization.industry}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Employees</p>

                  <p className="mt-1 text-slate-700">
                    {organization.employees.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Location</p>

                  <p className="mt-1 text-slate-700">{organization.location}</p>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-1 border-t border-slate-100 pt-3">
                <Link
                  to={`/organizations/${organization.id}`}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >
                  <Eye className="h-4 w-4" />
                </Link>

                <Link
                  to={`/organizations/${organization.id}/edit`}
                  className="rounded-lg p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <Edit className="h-4 w-4" />
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    handleStatusToggle(organization.id, organization.status)
                  }
                  className="rounded-lg p-2 text-slate-500 hover:bg-amber-50 hover:text-amber-600"
                >
                  {organization.status === "Active" ? (
                    <PowerOff className="h-4 w-4" />
                  ) : (
                    <Power className="h-4 w-4" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(organization.id)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!organizationQuery.isLoading && organizations.length > 0 && (
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-medium text-slate-700">
              {(page - 1) * limit + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-slate-700">
              {Math.min(page * limit, total)}
            </span>{" "}
            of <span className="font-medium text-slate-700">{total}</span>{" "}
            organizations
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((previous) => Math.max(previous - 1, 1))}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <span className="px-2 text-sm text-slate-600">
              Page {page} of {totalPages}
            </span>

            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() =>
                setPage((previous) => Math.min(previous + 1, totalPages))
              }
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
