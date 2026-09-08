import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCreateSubscription } from "../../hooks/useSubscriptions";

import type {
  BillingCycle,
  PaymentStatus,
  PlanType,
  SubscriptionStatus,
} from "../../types/subscription";

export default function CreateSubscription() {
  const navigate = useNavigate();

  const mutation = useCreateSubscription();

  const [form, setForm] = useState({
    tenantId: 109,
    tenantName: "",
    plan: "Basic" as PlanType,
    status: "Active" as SubscriptionStatus,
    billingCycle: "Monthly" as BillingCycle,
    price: 199,
    maxUsers: 25,
    storageLimit: 50,
    apiLimit: 50000,
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    nextBillingDate: "",
    autoRenew: true,
    paymentStatus: "Pending" as PaymentStatus,
  });

  const updateField = <K extends keyof typeof form>(
    field: K,
    value: (typeof form)[K],
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.tenantName.trim()) {
      alert("Tenant name is required.");
      return;
    }

    if (!form.endDate) {
      alert("End date is required.");
      return;
    }

    await mutation.mutateAsync(form);

    navigate("/subscriptions");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/subscriptions")}
          className="rounded-lg p-2 hover:bg-slate-100"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Create Subscription
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create a new tenant subscription.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Field
            label="Tenant Name"
            value={form.tenantName}
            onChange={(value) => updateField("tenantName", value)}
            placeholder="Enter tenant name"
          />

          <Field
            label="Tenant ID"
            type="number"
            value={form.tenantId}
            onChange={(value) => updateField("tenantId", Number(value))}
          />

          <SelectField
            label="Plan"
            value={form.plan}
            options={["Basic", "Professional", "Enterprise"]}
            onChange={(value) => updateField("plan", value as PlanType)}
          />

          <SelectField
            label="Status"
            value={form.status}
            options={["Active", "Trial", "Suspended", "Cancelled", "Expired"]}
            onChange={(value) =>
              updateField("status", value as SubscriptionStatus)
            }
          />

          <SelectField
            label="Billing Cycle"
            value={form.billingCycle}
            options={["Monthly", "Quarterly", "Annual"]}
            onChange={(value) =>
              updateField("billingCycle", value as BillingCycle)
            }
          />

          <Field
            label="Price"
            type="number"
            value={form.price}
            onChange={(value) => updateField("price", Number(value))}
          />

          <Field
            label="Maximum Users"
            type="number"
            value={form.maxUsers}
            onChange={(value) => updateField("maxUsers", Number(value))}
          />

          <Field
            label="Storage Limit (GB)"
            type="number"
            value={form.storageLimit}
            onChange={(value) => updateField("storageLimit", Number(value))}
          />

          <Field
            label="API Limit"
            type="number"
            value={form.apiLimit}
            onChange={(value) => updateField("apiLimit", Number(value))}
          />

          <Field
            label="Start Date"
            type="date"
            value={form.startDate}
            onChange={(value) => updateField("startDate", value)}
          />

          <Field
            label="End Date"
            type="date"
            value={form.endDate}
            onChange={(value) => updateField("endDate", value)}
          />

          <Field
            label="Next Billing Date"
            type="date"
            value={form.nextBillingDate}
            onChange={(value) => updateField("nextBillingDate", value)}
          />

          <SelectField
            label="Payment Status"
            value={form.paymentStatus}
            options={["Paid", "Pending", "Failed"]}
            onChange={(value) =>
              updateField("paymentStatus", value as PaymentStatus)
            }
          />
        </div>

        <label className="mt-6 flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.autoRenew}
            onChange={(event) => updateField("autoRenew", event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-indigo-600"
          />

          <span className="text-sm font-medium text-slate-700">
            Enable automatic renewal
          </span>
        </label>

        <div className="mt-8 flex justify-end gap-3 border-t border-slate-100 pt-6">
          <button
            type="button"
            onClick={() => navigate("/subscriptions")}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            <Save size={17} />

            {mutation.isPending ? "Creating..." : "Create Subscription"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />
    </div>
  );
}

function SelectField({
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
        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
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
