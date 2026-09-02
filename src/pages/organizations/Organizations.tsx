import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Eye,
  Pencil,
  Plus,
  Search,
  Power,
  PowerOff,
} from "lucide-react";

import {
  useOrganizations,
  useActivateOrganization,
  useDeactivateOrganization,
} from "../../hooks/useOrganizations";

import type { Organization } from "../../types/organization";

export default function Organizations() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const limit = 10;

  const organizationsQuery = useOrganizations({
    search,
    status: statusFilter,
    page,
    limit,
  });

  const activateOrganization = useActivateOrganization();

  const deactivateOrganization = useDeactivateOrganization();

  const organizations = useMemo<Organization[]>(
    () => organizationsQuery.data?.data ?? [],
    [organizationsQuery.data],
  );

  const total = organizationsQuery.data?.total ?? 0;

  const totalPages = organizationsQuery.data?.totalPages ?? 1;

  /*
   * Search is also applied locally so the table remains
   * responsive even when mock/API filtering changes.
   */
  const filteredOrganizations = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return organizations;
    }

    return organizations.filter(
      (organization) =>
        organization.name.toLowerCase().includes(value) ||
        organization.code.toLowerCase().includes(value) ||
        organization.tenantName.toLowerCase().includes(value) ||
        organization.industry.toLowerCase().includes(value) ||
        organization.location.toLowerCase().includes(value),
    );
  }, [organizations, search]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handleActivate = async (id: string) => {
    try {
      await activateOrganization.mutateAsync(id);
    } catch (error) {
      console.error("Failed to activate organization:", error);
    }
  };

  const handleDeactivate = async (id: string) => {
    try {
      await deactivateOrganization.mutateAsync(id);
    } catch (error) {
      console.error("Failed to deactivate organization:", error);
    }
  };

  if (organizationsQuery.isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex min-h-[500px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

              <p className="mt-4 text-sm text-slate-500">
                Loading organizations...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (organizationsQuery.isError) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-red-200 bg-white p-10 text-center shadow-sm">
            <Building2 size={42} className="mx-auto text-red-400" />

            <h2 className="mt-4 text-xl font-semibold text-slate-900">
              Failed to load organizations
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Something went wrong while loading the organizations.
            </p>

            <button
              type="button"
              onClick={() => organizationsQuery.refetch()}
              className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <Building2 size={22} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Organizations
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Manage organizations across your platform
                </p>
              </div>
            </div>
          </div>

          <Link
            to="/organizations/create"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Organization
          </Link>
        </div>

        {/* Summary */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Organizations
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">{total}</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Active</p>

            <p className="mt-2 text-2xl font-bold text-emerald-600">
              {
                organizations.filter(
                  (organization) => organization.status === "Active",
                ).length
              }
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Inactive</p>

            <p className="mt-2 text-2xl font-bold text-red-600">
              {
                organizations.filter(
                  (organization) => organization.status === "Inactive",
                ).length
              }
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => handleSearch(event.target.value)}
                placeholder="Search by name, code, tenant, industry or location..."
                className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Status */}
            <div className="w-full md:w-48">
              <select
                value={statusFilter}
                onChange={(event) => handleStatusChange(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="all">All Statuses</option>

                <option value="Active">Active</option>

                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Organization
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Code
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Tenant
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Industry
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Location
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Employees
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredOrganizations.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-16 text-center">
                      <Building2 size={42} className="mx-auto text-slate-300" />

                      <h3 className="mt-4 text-base font-semibold text-slate-900">
                        No organizations found
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Try changing your search or filter.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredOrganizations.map((organization) => (
                    <tr
                      key={organization.id}
                      className="transition hover:bg-slate-50"
                    >
                      {/* Organization */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <Building2 size={19} />
                          </div>

                          <div>
                            <p className="font-semibold text-slate-900">
                              {organization.name}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500">
                              {organization.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Code */}
                      <td className="px-6 py-4">
                        <span className="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-xs font-semibold text-slate-700">
                          {organization.code}
                        </span>
                      </td>

                      {/* Tenant */}
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-slate-800">
                          {organization.tenantName}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          Tenant ID: {organization.tenantId}
                        </p>
                      </td>

                      {/* Industry */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-700">
                          {organization.industry}
                        </span>
                      </td>

                      {/* Location */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-700">
                          {organization.location}
                        </span>
                      </td>

                      {/* Employees */}
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-slate-800">
                          {organization.employees}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {organization.status === "Active" ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                            Inactive
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/organizations/${organization.id}`}
                            title="View organization"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Eye size={17} />
                          </Link>

                          <Link
                            to={`/organizations/${organization.id}/edit`}
                            title="Edit organization"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600"
                          >
                            <Pencil size={17} />
                          </Link>

                          {organization.status === "Active" ? (
                            <button
                              type="button"
                              title="Deactivate organization"
                              disabled={deactivateOrganization.isPending}
                              onClick={() => handleDeactivate(organization.id)}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <PowerOff size={17} />
                            </button>
                          ) : (
                            <button
                              type="button"
                              title="Activate organization"
                              disabled={activateOrganization.isPending}
                              onClick={() => handleActivate(organization.id)}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Power size={17} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-700">
                {filteredOrganizations.length}
              </span>{" "}
              of <span className="font-medium text-slate-700">{total}</span>{" "}
              organizations
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1 || organizationsQuery.isFetching}
                onClick={() => setPage((current) => Math.max(current - 1, 1))}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <span className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white">
                {page}
              </span>

              <button
                type="button"
                disabled={page >= totalPages || organizationsQuery.isFetching}
                onClick={() =>
                  setPage((current) => Math.min(current + 1, totalPages))
                }
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
