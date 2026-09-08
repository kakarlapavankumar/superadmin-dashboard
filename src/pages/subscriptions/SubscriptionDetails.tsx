import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Database,
  Edit,
  KeyRound,
  RefreshCw,
  Users,
  XCircle,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import SubscriptionStatusBadge from "../../components/subscriptions/SubscriptionStatusBadge";

import {
  useSubscription,
  useToggleAutoRenew,
  useUpdateSubscriptionStatus,
} from "../../hooks/useSubscriptions";

import type { SubscriptionStatus } from "../../types/subscription";

export default function SubscriptionDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const subscriptionId = Number(id);

  const {
    data: subscription,
    isLoading,
    isError,
  } = useSubscription(subscriptionId);

  const statusMutation = useUpdateSubscriptionStatus();

  const autoRenewMutation = useToggleAutoRenew();

  if (isLoading) {
    return (
      <div className="space-y-5">
        <div className="h-10 w-64 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-72 animate-pulse rounded-2xl bg-slate-100" />
      </div>
    );
  }

  if (isError || !subscription) {
    return (
      <div className="rounded-2xl bg-red-50 p-8 text-center text-red-700">
        Subscription not found.
      </div>
    );
  }

  const userUtilization = Math.round(
    (subscription.usedUsers / subscription.maxUsers) * 100,
  );

  const storageUtilization = Math.round(
    (subscription.usedStorage / subscription.storageLimit) * 100,
  );

  const apiUtilization = Math.round(
    (subscription.usedApiCalls / subscription.apiLimit) * 100,
  );

  const changeStatus = async (status: SubscriptionStatus) => {
    await statusMutation.mutateAsync({
      id: subscription.id,
      status,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/subscriptions")}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Subscription Details
            </h1>

            <p className="text-sm text-slate-500">{subscription.tenantName}</p>
          </div>
        </div>

        <button
          onClick={() => navigate(`/subscriptions/${subscription.id}/edit`)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Edit size={17} />
          Edit Subscription
        </button>
      </div>

      {/* Main summary */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-5 md:flex-row">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-bold text-slate-900">
                {subscription.plan} Plan
              </h2>

              <SubscriptionStatusBadge status={subscription.status} />
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Subscription #{subscription.id}
            </p>
          </div>

          <div className="text-left md:text-right">
            <p className="text-3xl font-bold text-slate-900">
              ${subscription.price.toLocaleString()}
            </p>

            <p className="text-sm text-slate-500">
              per {subscription.billingCycle.toLowerCase()}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          <Info
            icon={<CalendarDays size={18} />}
            label="Start Date"
            value={subscription.startDate}
          />

          <Info
            icon={<CalendarDays size={18} />}
            label="End Date"
            value={subscription.endDate}
          />

          <Info
            icon={<RefreshCw size={18} />}
            label="Next Billing"
            value={subscription.nextBillingDate}
          />

          <Info
            icon={<CreditCard size={18} />}
            label="Payment"
            value={subscription.paymentStatus}
          />
        </div>
      </div>

      {/* Usage */}
      <div>
        <h2 className="mb-4 text-lg font-bold text-slate-900">
          Subscription Usage
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <UsageCard
            title="Users"
            icon={<Users size={20} />}
            used={subscription.usedUsers}
            limit={subscription.maxUsers}
            percentage={userUtilization}
          />

          <UsageCard
            title="Storage"
            icon={<Database size={20} />}
            used={subscription.usedStorage}
            limit={subscription.storageLimit}
            suffix=" GB"
            percentage={storageUtilization}
          />

          <UsageCard
            title="API Calls"
            icon={<KeyRound size={20} />}
            used={subscription.usedApiCalls}
            limit={subscription.apiLimit}
            percentage={apiUtilization}
          />
        </div>
      </div>

      {/* Auto renew */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="font-bold text-slate-900">Automatic Renewal</h2>

            <p className="mt-1 text-sm text-slate-500">
              Automatically renew this subscription at the end of its billing
              period.
            </p>
          </div>

          <button
            onClick={() => autoRenewMutation.mutate(subscription.id)}
            disabled={autoRenewMutation.isPending}
            className={`relative h-7 w-12 rounded-full transition ${
              subscription.autoRenew ? "bg-indigo-600" : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                subscription.autoRenew ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-bold text-slate-900">Subscription Actions</h2>

        <div className="mt-4 flex flex-wrap gap-3">
          {subscription.status !== "Active" && (
            <button
              onClick={() => changeStatus("Active")}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white"
            >
              <CheckCircle2 size={17} />
              Activate
            </button>
          )}

          {subscription.status === "Active" && (
            <button
              onClick={() => changeStatus("Suspended")}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white"
            >
              <XCircle size={17} />
              Suspend
            </button>
          )}

          {subscription.status !== "Cancelled" && (
            <button
              onClick={() => changeStatus("Cancelled")}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white"
            >
              <XCircle size={17} />
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
        {icon}
      </div>

      <div>
        <p className="text-xs text-slate-400">{label}</p>

        <p className="mt-1 text-sm font-semibold text-slate-700">{value}</p>
      </div>
    </div>
  );
}

function UsageCard({
  title,
  icon,
  used,
  limit,
  percentage,
  suffix = "",
}: {
  title: string;
  icon: React.ReactNode;
  used: number;
  limit: number;
  percentage: number;
  suffix?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          {icon}
        </div>

        <h3 className="font-semibold text-slate-800">{title}</h3>
      </div>

      <div className="mt-5 flex items-end justify-between">
        <p className="text-xl font-bold text-slate-900">
          {used.toLocaleString()}
          {suffix}
        </p>

        <p className="text-sm text-slate-400">
          / {limit.toLocaleString()}
          {suffix}
        </p>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${
            percentage >= 90
              ? "bg-red-500"
              : percentage >= 75
                ? "bg-amber-500"
                : "bg-indigo-500"
          }`}
          style={{
            width: `${Math.min(percentage, 100)}%`,
          }}
        />
      </div>

      <p className="mt-2 text-xs text-slate-400">{percentage}% utilized</p>
    </div>
  );
}
