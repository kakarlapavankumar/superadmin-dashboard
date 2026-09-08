import {
  CalendarDays,
  CheckCircle2,
  CreditCard,
  DollarSign,
  Plus,
  Search,
  XCircle,
} from "lucide-react";

import { useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import SubscriptionRow from "../../components/subscriptions/SubscriptionRow";
import SubscriptionStatusBadge from "../../components/subscriptions/SubscriptionStatusBadge";

import EmptyState from "../../components/EmptyState";

import {
  useDeleteSubscription,
  useSubscriptions,
  useUpdateSubscriptionStatus,
} from "../../hooks/useSubscriptions";

import type {
  SubscriptionStatus,
  BillingCycle,
} from "../../types/subscription";

const PAGE_SIZE = 6;

export default function Subscriptions() {
  const navigate = useNavigate();

  const {
    data: subscriptions = [],
    isLoading,
    isError,
    refetch,
  } = useSubscriptions();

  const deleteMutation = useDeleteSubscription();

  const statusMutation = useUpdateSubscriptionStatus();

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<"All" | SubscriptionStatus>(
    "All",
  );

  const [billingFilter, setBillingFilter] = useState<"All" | BillingCycle>(
    "All",
  );

  const [page, setPage] = useState(1);

  const filteredSubscriptions = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return subscriptions.filter((subscription) => {
      const matchesSearch =
        !searchValue ||
        subscription.tenantName.toLowerCase().includes(searchValue) ||
        subscription.plan.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || subscription.status === statusFilter;

      const matchesBilling =
        billingFilter === "All" || subscription.billingCycle === billingFilter;

      return matchesSearch && matchesStatus && matchesBilling;
    });
  }, [subscriptions, search, statusFilter, billingFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSubscriptions.length / PAGE_SIZE),
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedSubscriptions = filteredSubscriptions.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const activeCount = subscriptions.filter(
    (item) => item.status === "Active",
  ).length;

  const trialCount = subscriptions.filter(
    (item) => item.status === "Trial",
  ).length;

  const monthlyRevenue = subscriptions
    .filter(
      (item) => item.status === "Active" && item.billingCycle === "Monthly",
    )
    .reduce((total, item) => total + item.price, 0);

  const handleDelete = async (id: number, tenantName: string) => {
    const confirmed = window.confirm(`Delete subscription for ${tenantName}?`);

    if (!confirmed) return;

    await deleteMutation.mutateAsync(id);
  };

  const handleStatusChange = async (
    id: number,
    currentStatus: SubscriptionStatus,
  ) => {
    let nextStatus: SubscriptionStatus;

    if (currentStatus === "Active") {
      nextStatus = "Suspended";
    } else if (currentStatus === "Suspended") {
      nextStatus = "Active";
    } else {
      nextStatus = "Active";
    }

    await statusMutation.mutateAsync({
      id,
      status: nextStatus,
    });
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setBillingFilter("All");
    setPage(1);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-72 animate-pulse rounded-lg bg-slate-200" />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-32 animate-pulse rounded-2xl bg-slate-100"
            />
          ))}
        </div>

        <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <XCircle className="mx-auto h-10 w-10 text-red-500" />

        <h2 className="mt-3 font-semibold text-red-800">
          Failed to load subscriptions
        </h2>

        <button
          onClick={() => refetch()}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Subscription Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage tenant subscriptions, plans, billing and licenses.
          </p>
        </div>

        <button
          onClick={() => navigate("/subscriptions/create")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
        >
          <Plus size={18} />
          New Subscription
        </button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Subscriptions"
          value={subscriptions.length}
          icon={<CreditCard size={20} />}
        />

        <StatCard
          title="Active"
          value={activeCount}
          icon={<CheckCircle2 size={20} />}
        />

        <StatCard
          title="Trial"
          value={trialCount}
          icon={<CalendarDays size={20} />}
        />

        <StatCard
          title="Monthly Revenue"
          value={`$${monthlyRevenue.toLocaleString()}`}
          icon={<DollarSign size={20} />}
        />
      </div>

      {/* Search and Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
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
              placeholder="Search tenant or plan..."
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value as "All" | SubscriptionStatus);
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Trial">Trial</option>
            <option value="Suspended">Suspended</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Expired">Expired</option>
          </select>

          <select
            value={billingFilter}
            onChange={(event) => {
              setBillingFilter(event.target.value as "All" | BillingCycle);
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500"
          >
            <option value="All">All Billing Cycles</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Annual">Annual</option>
          </select>

          {(search || statusFilter !== "All" || billingFilter !== "All") && (
            <button
              onClick={resetFilters}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">
        {paginatedSubscriptions.length === 0 ? (
          <EmptyState
            title="No subscriptions found"
            message="Try changing your search or filters."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-4">Tenant</th>

                  <th className="px-5 py-4">Plan</th>

                  <th className="px-5 py-4">Status</th>

                  <th className="px-5 py-4">Users</th>

                  <th className="px-5 py-4">Price</th>

                  <th className="px-5 py-4">Next Billing</th>

                  <th className="px-5 py-4">Auto Renew</th>

                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedSubscriptions.map((subscription) => (
                  <SubscriptionRow
                    key={subscription.id}
                    subscription={subscription}
                    onView={() => navigate(`/subscriptions/${subscription.id}`)}
                    onEdit={() =>
                      navigate(`/subscriptions/${subscription.id}/edit`)
                    }
                    onDelete={() =>
                      handleDelete(subscription.id, subscription.tenantName)
                    }
                    onStatusChange={() =>
                      handleStatusChange(subscription.id, subscription.status)
                    }
                    isUpdating={statusMutation.isPending}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Mobile cards */}
      <div className="grid gap-4 lg:hidden">
        {paginatedSubscriptions.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white">
            <EmptyState
              title="No subscriptions found"
              message="Try changing your search or filters."
            />
          </div>
        ) : (
          paginatedSubscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {subscription.tenantName}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {subscription.plan}
                  </p>
                </div>

                <SubscriptionStatusBadge status={subscription.status} />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <Info
                  label="Price"
                  value={`$${subscription.price.toLocaleString()}`}
                />

                <Info label="Billing" value={subscription.billingCycle} />

                <Info
                  label="Users"
                  value={`${subscription.usedUsers}/${subscription.maxUsers}`}
                />

                <Info
                  label="Next Billing"
                  value={subscription.nextBillingDate}
                />
              </div>

              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => navigate(`/subscriptions/${subscription.id}`)}
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50"
                >
                  View
                </button>

                <button
                  onClick={() =>
                    navigate(`/subscriptions/${subscription.id}/edit`)
                  }
                  className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4">
          <p className="text-sm text-slate-500">
            Page {currentPage} of {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:opacity-40"
            >
              Previous
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setPage((value) => Math.min(totalPages, value + 1))
              }
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
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
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-500">{title}</p>

      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>

      <p className="mt-1 text-sm font-semibold text-slate-700">{value}</p>
    </div>
  );
}
