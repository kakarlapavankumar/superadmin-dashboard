import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  useSubscription,
  useUpdateSubscription,
} from "../../hooks/useSubscriptions";

import type {
  BillingCycle,
  PaymentStatus,
  PlanType,
  SubscriptionStatus,
  UpdateSubscriptionInput,
} from "../../types/subscription";

export default function EditSubscription() {
  const { id } = useParams();
  const subscriptionId = Number(id);

  const {
    data: subscription,
    isLoading,
    isError,
  } = useSubscription(subscriptionId);

  if (isLoading) {
    return <div className="h-80 animate-pulse rounded-2xl bg-slate-100" />;
  }

  if (isError || !subscription) {
    return (
      <div className="rounded-2xl bg-red-50 p-8 text-center text-red-700">
        Subscription not found.
      </div>
    );
  }

  return (
    <EditSubscriptionForm key={subscriptionId} subscription={subscription} />
  );
}

function EditSubscriptionForm({
  subscription,
}: {
  subscription: NonNullable<ReturnType<typeof useSubscription>["data"]>;
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const subscriptionId = Number(id);
  const mutation = useUpdateSubscription();

  const [form, setForm] = useState<UpdateSubscriptionInput>(() => ({
    tenantId: subscription.tenantId,
    tenantName: subscription.tenantName,
    plan: subscription.plan,
    status: subscription.status,
    billingCycle: subscription.billingCycle,
    price: subscription.price,
    maxUsers: subscription.maxUsers,
    storageLimit: subscription.storageLimit,
    apiLimit: subscription.apiLimit,
    startDate: subscription.startDate,
    endDate: subscription.endDate,
    nextBillingDate: subscription.nextBillingDate,
    autoRenew: subscription.autoRenew,
    paymentStatus: subscription.paymentStatus,
  }));

  const updateField = <K extends keyof UpdateSubscriptionInput>(
    field: K,
    value: UpdateSubscriptionInput[K],
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await mutation.mutateAsync({
      id: subscriptionId,
      payload: form,
    });

    navigate(`/subscriptions/${subscriptionId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(`/subscriptions/${subscriptionId}`)}
          className="rounded-lg p-2 hover:bg-slate-100"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Edit Subscription
          </h1>

          <p className="text-sm text-slate-500">
            Update subscription information.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Tenant Name"
            value={form.tenantName ?? ""}
            onChange={(value) => updateField("tenantName", value)}
          />

          <Input
            label="Price"
            type="number"
            value={form.price ?? ""}
            onChange={(value) => updateField("price", Number(value))}
          />

          <Select
            label="Plan"
            value={form.plan ?? "Basic"}
            options={["Basic", "Professional", "Enterprise"]}
            onChange={(value) => updateField("plan", value as PlanType)}
          />

          <Select
            label="Status"
            value={form.status ?? "Active"}
            options={["Active", "Trial", "Suspended", "Cancelled", "Expired"]}
            onChange={(value) =>
              updateField("status", value as SubscriptionStatus)
            }
          />

          <Select
            label="Billing Cycle"
            value={form.billingCycle ?? "Monthly"}
            options={["Monthly", "Quarterly", "Annual"]}
            onChange={(value) =>
              updateField("billingCycle", value as BillingCycle)
            }
          />

          <Input
            label="Maximum Users"
            type="number"
            value={form.maxUsers ?? ""}
            onChange={(value) => updateField("maxUsers", Number(value))}
          />

          <Input
            label="Storage Limit"
            type="number"
            value={form.storageLimit ?? ""}
            onChange={(value) => updateField("storageLimit", Number(value))}
          />

          <Input
            label="API Limit"
            type="number"
            value={form.apiLimit ?? ""}
            onChange={(value) => updateField("apiLimit", Number(value))}
          />

          <Input
            label="Start Date"
            type="date"
            value={form.startDate ?? ""}
            onChange={(value) => updateField("startDate", value)}
          />

          <Input
            label="End Date"
            type="date"
            value={form.endDate ?? ""}
            onChange={(value) => updateField("endDate", value)}
          />

          <Input
            label="Next Billing Date"
            type="date"
            value={form.nextBillingDate ?? ""}
            onChange={(value) => updateField("nextBillingDate", value)}
          />

          <Select
            label="Payment Status"
            value={form.paymentStatus ?? "Pending"}
            options={["Paid", "Pending", "Failed"]}
            onChange={(value) =>
              updateField("paymentStatus", value as PaymentStatus)
            }
          />
        </div>

        <label className="mt-6 flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.autoRenew ?? false}
            onChange={(event) => updateField("autoRenew", event.target.checked)}
          />

          <span className="text-sm font-medium text-slate-700">
            Enable automatic renewal
          </span>
        </label>

        <div className="mt-8 flex justify-end gap-3 border-t border-slate-100 pt-6">
          <button
            type="button"
            onClick={() => navigate(`/subscriptions/${subscriptionId}`)}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          >
            <Save size={17} />

            {mutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />
    </div>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
