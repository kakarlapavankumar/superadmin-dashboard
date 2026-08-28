import { useState } from "react";

import Button from "../Button";

import { COUNTRIES, TIMEZONES } from "../../utils/constants";

interface CreateTenantInput {
  name: string;
  code: string;
  adminName: string;
  adminEmail: string;
  phone: string;
  subscription: string;
  country: string;
  timezone: string;
  status: string;
}

interface Props {
  initialData?: Partial<CreateTenantInput>;
  existingCodes: string[];
  submitText: string;
  onSubmit: (data: CreateTenantInput) => void;
  loading?: boolean;
}

export default function TenantForm({
  initialData,
  existingCodes,
  submitText,
  onSubmit,
  loading,
}: Props) {
  const [form, setForm] = useState<CreateTenantInput>({
    name: initialData?.name ?? "",
    code: initialData?.code ?? "",
    adminName: initialData?.adminName ?? "",
    adminEmail: initialData?.adminEmail ?? "",
    phone: initialData?.phone ?? "",
    subscription: initialData?.subscription ?? "Enterprise",
    country: initialData?.country ?? "India",
    timezone: initialData?.timezone ?? "Asia/Kolkata",
    status: initialData?.status ?? "Active",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function updateField(field: keyof CreateTenantInput, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      newErrors.name = "Tenant name is required";
    }

    if (!form.code.trim()) {
      newErrors.code = "Tenant code is required";
    }

    if (
      existingCodes.some(
        (code) => code.toLowerCase() === form.code.toLowerCase(),
      )
    ) {
      newErrors.code = "Tenant code must be unique";
    }

    if (!form.adminName.trim()) {
      newErrors.adminName = "Admin name is required";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.adminEmail)) {
      newErrors.adminEmail = "Valid email is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm p-6 space-y-5"
    >
      <div>
        <label className="block mb-1 font-medium">Tenant Name</label>

        <input
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />

        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Tenant Code</label>

        <input
          value={form.code}
          onChange={(e) => updateField("code", e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />

        {errors.code && (
          <p className="text-red-500 text-sm mt-1">{errors.code}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Admin Name</label>

        <input
          value={form.adminName}
          onChange={(e) => updateField("adminName", e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />

        {errors.adminName && (
          <p className="text-red-500 text-sm mt-1">{errors.adminName}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Admin Email</label>

        <input
          type="email"
          value={form.adminEmail}
          onChange={(e) => updateField("adminEmail", e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />

        {errors.adminEmail && (
          <p className="text-red-500 text-sm mt-1">{errors.adminEmail}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Phone</label>

        <input
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Subscription</label>

        <select
          value={form.subscription}
          onChange={(e) => updateField("subscription", e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option>Basic</option>
          <option>Pro</option>
          <option>Enterprise</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Country</label>

        <select
          value={form.country}
          onChange={(e) => updateField("country", e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        >
          {COUNTRIES.map((country) => (
            <option key={country}>{country}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Time Zone</label>

        <select
          value={form.timezone}
          onChange={(e) => updateField("timezone", e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        >
          {TIMEZONES.map((timezone) => (
            <option key={timezone}>{timezone}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Status</label>

        <select
          value={form.status}
          onChange={(e) => updateField("status", e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : submitText}
      </Button>
    </form>
  );
}
