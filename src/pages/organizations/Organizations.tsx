import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  Eye,
  Pencil,
  Plus,
  Search,
  Trash2,
  Power,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { Organization } from "../../types/organization";

import {
  getOrganizations,
  deleteOrganization,
  toggleOrganizationStatus,
} from "../../api/organizationApi";

function Organizations() {
  const navigate = useNavigate();

  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getOrganizations();

      setOrganizations(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      console.error(err);
      setError("Failed to load organizations");
      setOrganizations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredOrganizations = useMemo(() => {
    const value = search.toLowerCase().trim();

    return organizations.filter((organization) => {
      const matchesSearch =
        !value ||
        organization.name.toLowerCase().includes(value) ||
        organization.code.toLowerCase().includes(value) ||
        organization.location.toLowerCase().includes(value) ||
        organization.industry.toLowerCase().includes(value);

      const matchesStatus =
        status === "All" ||
        organization.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [organizations, search, status]);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this organization?"
    );

    if (!confirmed) return;

    try {
      await deleteOrganization(id);
      await loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to delete organization");
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleOrganizationStatus(id);
      await loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to update organization status");
    }
  };

  const total = organizations.length;

  const active = organizations.filter(
    (organization) => organization.status === "Active"
  ).length;

  const inactive = organizations.filter(
    (organization) => organization.status === "Inactive"
  ).length;

  const employees = organizations.reduce(
    (sum, organization) =>
      sum + Number(organization.employees || 0),
    0
  );

  return (
    <div className="space-y-6 p-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Building2 size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Organization Management
              </h1>

              <p className="text-sm text-slate-500">
                Create, manage and monitor organizations.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() =>
            navigate("/organizations/create")
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Organization
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <StatCard
          title="Total Organizations"
          value={total}
        />

        <StatCard
          title="Active Organizations"
          value={active}
        />

        <StatCard
          title="Inactive Organizations"
          value={inactive}
        />

        <StatCard
          title="Total Employees"
          value={employees.toLocaleString()}
        />

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
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search organizations..."
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

        </div>

      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1000px]">

            <thead className="border-b border-slate-200 bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Organization
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Tenant ID
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

              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    Loading organizations...
                  </td>
                </tr>
              ) : filteredOrganizations.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    No organizations found.
                  </td>
                </tr>
              ) : (
                filteredOrganizations.map(
                  (organization) => (
                    <tr
                      key={organization.id}
                      className="transition hover:bg-slate-50"
                    >

                      <td className="px-6 py-4">

                        <div>
                          <p className="font-semibold text-slate-900">
                            {organization.name}
                          </p>

                          <p className="text-xs text-slate-500">
                            {organization.code}
                          </p>
                        </div>

                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {organization.tenantId}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {organization.industry}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {organization.location}
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-slate-700">
                        {organization.employees.toLocaleString()}
                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                            organization.status === "Active"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {organization.status}
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <div className="flex justify-end gap-1">

                          <ActionButton
                            title="View"
                            onClick={() =>
                              navigate(
                                `/organizations/${organization.id}`
                              )
                            }
                          >
                            <Eye size={17} />
                          </ActionButton>

                          <ActionButton
                            title="Edit"
                            onClick={() =>
                              navigate(
                                `/organizations/${organization.id}/edit`
                              )
                            }
                          >
                            <Pencil size={17} />
                          </ActionButton>

                          <ActionButton
                            title={
                              organization.status === "Active"
                                ? "Deactivate"
                                : "Activate"
                            }
                            onClick={() =>
                              handleToggleStatus(
                                organization.id
                              )
                            }
                          >
                            <Power size={17} />
                          </ActionButton>

                          <ActionButton
                            title="Delete"
                            danger
                            onClick={() =>
                              handleDelete(
                                organization.id
                              )
                            }
                          >
                            <Trash2 size={17} />
                          </ActionButton>

                        </div>

                      </td>

                    </tr>
                  )
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function ActionButton({
  children,
  onClick,
  title,
  danger = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`rounded-lg p-2 transition ${
        danger
          ? "text-red-500 hover:bg-red-50"
          : "text-slate-500 hover:bg-slate-100 hover:text-blue-600"
      }`}
    >
      {children}
    </button>
  );
}

export default Organizations;