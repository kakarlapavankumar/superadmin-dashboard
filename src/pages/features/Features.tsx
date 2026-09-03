import { Activity, Layers3, Plus, Search, Users, XCircle } from "lucide-react";

import { useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import EmptyState from "../../components/EmptyState";
import FeatureRow from "../../components/features/FeatureRow";

import {
  useDeleteFeature,
  useFeatures,
  useToggleFeature,
} from "../../hooks/useFeatures";

import type { FeatureStatus } from "../../types/feature";

const PAGE_SIZE = 6;

export default function Features() {
  const navigate = useNavigate();

  const { data: features = [], isLoading, isError, error } = useFeatures();

  const deleteMutation = useDeleteFeature();
  const toggleMutation = useToggleFeature();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | FeatureStatus>(
    "All",
  );
  const [currentPage, setCurrentPage] = useState(1);

  const totalFeatures = features.length;

  const activeFeatures = features.filter(
    (feature) => feature.status === "Active",
  ).length;

  const inactiveFeatures = features.filter(
    (feature) => feature.status === "Inactive",
  ).length;

  const totalTenantUsage = features.reduce(
    (total, feature) => total + feature.tenantCount,
    0,
  );

  const filteredFeatures = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return features.filter((feature) => {
      const matchesSearch =
        !normalizedSearch ||
        feature.name.toLowerCase().includes(normalizedSearch) ||
        feature.key.toLowerCase().includes(normalizedSearch) ||
        feature.description.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "All" || feature.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [features, search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredFeatures.length / PAGE_SIZE),
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * PAGE_SIZE;

  const paginatedFeatures = filteredFeatures.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: "All" | FeatureStatus) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleDelete = async (id: number) => {
    const feature = features.find((item) => item.id === id);

    if (!feature) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${feature.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(id);

      const remainingItems = filteredFeatures.length - 1;

      const remainingPages = Math.max(1, Math.ceil(remainingItems / PAGE_SIZE));

      if (safeCurrentPage > remainingPages) {
        setCurrentPage(remainingPages);
      }
    } catch (deleteError) {
      window.alert(
        deleteError instanceof Error
          ? deleteError.message
          : "Failed to delete feature.",
      );
    }
  };

  const handleToggle = async (id: number) => {
    try {
      await toggleMutation.mutateAsync(id);
    } catch (toggleError) {
      window.alert(
        toggleError instanceof Error
          ? toggleError.message
          : "Failed to update feature status.",
      );
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 w-56 animate-pulse rounded-lg bg-slate-200" />

          <div className="mt-2 h-4 w-80 animate-pulse rounded bg-slate-100" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-28 animate-pulse rounded-2xl border border-slate-200 bg-white"
            />
          ))}
        </div>

        <div className="h-96 animate-pulse rounded-2xl border border-slate-200 bg-white" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Feature Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage platform features and their availability across tenants.
          </p>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-semibold text-red-800">
            Failed to load features
          </h2>

          <p className="mt-1 text-sm text-red-600">
            {error instanceof Error
              ? error.message
              : "Something went wrong while loading features."}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Feature Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create, manage and control platform features for tenants.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/features/create")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Create Feature
        </button>
      </div>

      {/* Statistics */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Features */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Features
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {totalFeatures}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <Layers3 className="h-5 w-5 text-blue-600" />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">All platform features</p>
        </div>

        {/* Active Features */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Active Features
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {activeFeatures}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
              <Activity className="h-5 w-5 text-emerald-600" />
            </div>
          </div>

          <p className="mt-3 text-xs text-emerald-600">Currently enabled</p>
        </div>

        {/* Inactive Features */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Inactive Features
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {inactiveFeatures}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
              <XCircle className="h-5 w-5 text-slate-500" />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">Currently disabled</p>
        </div>

        {/* Tenant Usage */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Tenant Usage</p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {totalTenantUsage}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50">
              <Users className="h-5 w-5 text-violet-600" />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Total feature assignments
          </p>
        </div>
      </div>

      {/* Features Table */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Search and Filter */}

        <div className="border-b border-slate-100 p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}

            <div className="relative w-full lg:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder="Search features..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Status Filter */}

            <div className="flex items-center gap-2">
              <label
                htmlFor="feature-status-filter"
                className="text-sm font-medium text-slate-500"
              >
                Status:
              </label>

              <select
                id="feature-status-filter"
                value={statusFilter}
                onChange={(event) =>
                  handleStatusChange(
                    event.target.value as "All" | FeatureStatus,
                  )
                }
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="All">All</option>

                <option value="Active">Active</option>

                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Result Summary */}

        <div className="flex flex-col gap-2 border-b border-slate-100 bg-slate-50/50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredFeatures.length === 0 ? 0 : startIndex + 1}
              {" - "}
              {Math.min(
                startIndex + paginatedFeatures.length,
                filteredFeatures.length,
              )}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {filteredFeatures.length}
            </span>{" "}
            features
          </p>

          {(search || statusFilter !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
                setCurrentPage(1);
              }}
              className="text-left text-sm font-semibold text-blue-600 hover:text-blue-700 sm:text-right"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Empty State */}

        {paginatedFeatures.length === 0 ? (
          <EmptyState
            title={
              features.length === 0
                ? "No features found"
                : "No matching features"
            }
            message={
              features.length === 0
                ? "Create your first platform feature to get started."
                : "Try changing your search or status filter."
            }
          />
        ) : (
          <>
            {/* Desktop Table */}

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-left">
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Feature
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Key
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Tenants
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {paginatedFeatures.map((feature) => (
                    <FeatureRow
                      key={feature.id}
                      feature={feature}
                      onToggle={(feature) => handleToggle(feature.id)}
                      onDelete={(feature) => handleDelete(feature.id)}
                      isUpdating={
                        toggleMutation.isPending || deleteMutation.isPending
                      }
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}

            <div className="divide-y divide-slate-100 md:hidden">
              {paginatedFeatures.map((feature) => (
                <div key={feature.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <button
                        type="button"
                        onClick={() => navigate(`/features/${feature.id}`)}
                        className="text-left text-sm font-semibold text-slate-900 hover:text-blue-600"
                      >
                        {feature.name}
                      </button>

                      <p className="mt-1 font-mono text-xs text-slate-400">
                        {feature.key}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        feature.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {feature.status}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {feature.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Users className="h-3.5 w-3.5" />
                      {feature.tenantCount} tenants
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => navigate(`/features/${feature.id}`)}
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() => navigate(`/features/${feature.id}/edit`)}
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Pagination */}

        {filteredFeatures.length > PAGE_SIZE && (
          <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-sm text-slate-500">
              Page{" "}
              <span className="font-semibold text-slate-700">
                {safeCurrentPage}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">{totalPages}</span>
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={safeCurrentPage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`h-9 min-w-9 rounded-lg px-2 text-sm font-semibold transition ${
                      safeCurrentPage === page
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                type="button"
                disabled={safeCurrentPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
