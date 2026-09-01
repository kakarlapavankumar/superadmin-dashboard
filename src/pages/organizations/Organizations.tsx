import { useMemo, useState } from "react";
import { Building2, Edit, Eye, Plus, Trash2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

import BackToDashboard from "../../components/BackToDashboard";
import PageHeader from "../../components/PageHeader";
import SearchInput from "../../components/SearchInput";
import StatusBadge from "../../components/StatusBadge";
import Pagination from "../../components/Pagination";

import {
  useDeleteOrganization,
  useOrganizations,
  useToggleOrganizationStatus,
} from "../../hooks/useOrganizations";

export default function Organizations() {
  const navigate = useNavigate();

  const { data: organizations = [], isLoading, isError } = useOrganizations();

  const deleteMutation = useDeleteOrganization();
  const statusMutation = useToggleOrganizationStatus();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [tenant, setTenant] = useState("All");
  const [page, setPage] = useState(1);

  const pageSize = 6;

  const getTenantName = (
    tenant: { name?: string } | string | null | undefined,
  ): string | undefined => {
    if (typeof tenant === "string") {
      return tenant;
    }

    return tenant?.name;
  };

  const tenants = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(
          organizations
            .map((organization) => getTenantName(organization.tenant))
            .filter((tenantName): tenantName is string => Boolean(tenantName)),
        ),
      ),
    ],
    [organizations],
  );

  const filteredOrganizations = useMemo(() => {
    const searchValue = search.toLowerCase();

    return organizations.filter((organization) => {
      const matchesSearch =
        organization.name.toLowerCase().includes(searchValue) ||
        organization.code.toLowerCase().includes(searchValue) ||
        organization.email.toLowerCase().includes(searchValue);

      const matchesStatus = status === "All" || organization.status === status;

      const matchesTenant =
        tenant === "All" || getTenantName(organization.tenant) === tenant;

      return matchesSearch && matchesStatus && matchesTenant;
    });
  }, [organizations, search, status, tenant]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrganizations.length / pageSize),
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedOrganizations = filteredOrganizations.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const activeCount = organizations.filter(
    (item) => item.status === "Active",
  ).length;

  const inactiveCount = organizations.length - activeCount;

  const totalEmployees = organizations.reduce(
    (total, organization) => total + organization.employees,
    0,
  );

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this organization?",
    );

    if (!confirmed) return;

    await deleteMutation.mutateAsync(id);
  };

  const handleToggleStatus = async (id: string) => {
    await statusMutation.mutateAsync(id);
  };

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-slate-500">Loading organizations...</div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-sm text-red-600">
        Failed to load organizations.
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        <BackToDashboard />

        <div className="mt-5">
          <PageHeader
            title="Organization Management"
            description="Create, manage and monitor organizations across the platform."
            action={
              <button
                type="button"
                onClick={() => navigate("/organizations/create")}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                <Plus size={18} />
                Create Organization
              </button>
            }
          />
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Organizations"
            value={organizations.length}
            icon={<Building2 size={20} />}
          />

          <StatCard
            title="Active"
            value={activeCount}
            icon={<Building2 size={20} />}
          />

          <StatCard
            title="Inactive"
            value={inactiveCount}
            icon={<Building2 size={20} />}
          />

          <StatCard
            title="Total Employees"
            value={totalEmployees.toLocaleString()}
            icon={<Users size={20} />}
          />
        </div>

        <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-3">
            <SearchInput
              value={search}
              onChange={(value) => {
                setSearch(value);
                setPage(1);
              }}
              placeholder="Search organization..."
            />

            <select
              value={tenant}
              onChange={(event) => {
                setTenant(event.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              {tenants.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <select
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <TableHeader>Organization</TableHeader>

                  <TableHeader>Tenant</TableHeader>

                  <TableHeader>Industry</TableHeader>

                  <TableHeader>Employees</TableHeader>

                  <TableHeader>Status</TableHeader>

                  <TableHeader align="right">Actions</TableHeader>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {paginatedOrganizations.map((organization) => (
                  <tr
                    key={organization.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 font-bold text-blue-600">
                          {organization.name.charAt(0)}
                        </div>

                        <div>
                          <div className="font-semibold text-slate-900">
                            {organization.name}
                          </div>

                          <div className="text-xs text-slate-500">
                            {organization.code}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {getTenantName(organization.tenant) ?? "—"}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {organization.industry}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                      {organization.employees.toLocaleString()}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={organization.status} />
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <IconButton
                          title="View"
                          onClick={() =>
                            navigate(`/organizations/${organization.id}`)
                          }
                        >
                          <Eye size={16} />
                        </IconButton>

                        <IconButton
                          title="Edit"
                          onClick={() =>
                            navigate(`/organizations/${organization.id}/edit`)
                          }
                        >
                          <Edit size={16} />
                        </IconButton>

                        <button
                          type="button"
                          onClick={() => handleToggleStatus(organization.id)}
                          className={`rounded-lg px-2.5 py-2 text-xs font-semibold ${
                            organization.status === "Active"
                              ? "text-amber-600 hover:bg-amber-50"
                              : "text-emerald-600 hover:bg-emerald-50"
                          }`}
                        >
                          {organization.status === "Active"
                            ? "Deactivate"
                            : "Activate"}
                        </button>

                        <IconButton
                          title="Delete"
                          danger
                          onClick={() => handleDelete(organization.id)}
                        >
                          <Trash2 size={16} />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}

                {paginatedOrganizations.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-16 text-center text-sm text-slate-500"
                    >
                      No organizations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col justify-between gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <strong className="text-slate-700">
                {filteredOrganizations.length === 0
                  ? 0
                  : (currentPage - 1) * pageSize + 1}
              </strong>{" "}
              to{" "}
              <strong className="text-slate-700">
                {Math.min(currentPage * pageSize, filteredOrganizations.length)}
              </strong>{" "}
              of{" "}
              <strong className="text-slate-700">
                {filteredOrganizations.length}
              </strong>
            </p>

            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm text-slate-500">{title}</span>

        <div className="rounded-lg bg-blue-50 p-2 text-blue-600">{icon}</div>
      </div>

      <div className="text-2xl font-bold text-slate-900">{value}</div>
    </div>
  );
}

function TableHeader({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-5 py-4 text-${align} text-xs font-semibold uppercase tracking-wider text-slate-500`}
    >
      {children}
    </th>
  );
}

function IconButton({
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
          : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
      }`}
    >
      {children}
    </button>
  );
}
