import { FormEvent, useState } from "react";
import { ArrowLeft, Building2, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  createOrganization,
} from "../../api/organizationApi";

import type { OrganizationFormData } from "../../types/organization";

const initialForm: OrganizationFormData = {
  name: "",
  code: "",
  tenantId: "",
  description: "",
  industry: "",
  location: "",
  email: "",
  phone: "",
  employees: 0,
};

function CreateOrganization() {
  const navigate = useNavigate();

  const [form, setForm] =
    useState<OrganizationFormData>(initialForm);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const updateField = (
    field: keyof OrganizationFormData,
    value: string | number
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent
  ) => {
    event.preventDefault();

    setError("");

    if (!form.name.trim()) {
      setError("Organization name is required");
      return;
    }

    if (!form.code.trim()) {
      setError("Organization code is required");
      return;
    }

    if (!form.tenantId.trim()) {
      setError("Tenant ID is required");
      return;
    }

    try {
      setSaving(true);

      await createOrganization(form);

      navigate("/organizations");
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to create organization"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6">

      <button
        onClick={() => navigate("/organizations")}
        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
      >
        <ArrowLeft size={17} />
        Back to Organizations
      </button>

      <div className="mx-auto max-w-4xl">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <Building2 size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Create Organization
            </h1>

            <p className="text-sm text-slate-500">
              Add a new organization to the platform.
            </p>
          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2">

            <Input
              label="Organization Name"
              required
              value={form.name}
              onChange={(value) =>
                updateField("name", value)
              }
            />

            <Input
              label="Organization Code"
              required
              value={form.code}
              onChange={(value) =>
                updateField(
                  "code",
                  value.toUpperCase()
                )
              }
            />

            <Input
              label="Tenant ID"
              required
              value={form.tenantId}
              onChange={(value) =>
                updateField("tenantId", value)
              }
            />

            <Input
              label="Industry"
              value={form.industry}
              onChange={(value) =>
                updateField("industry", value)
              }
            />

            <Input
              label="Location"
              value={form.location}
              onChange={(value) =>
                updateField("location", value)
              }
            />

            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(value) =>
                updateField("email", value)
              }
            />

            <Input
              label="Phone"
              value={form.phone}
              onChange={(value) =>
                updateField("phone", value)
              }
            />

            <Input
              label="Employees"
              type="number"
              value={String(form.employees)}
              onChange={(value) =>
                updateField(
                  "employees",
                  Number(value)
                )
              }
            />

          </div>

          <div className="mt-5">

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              value={form.description}
              onChange={(event) =>
                updateField(
                  "description",
                  event.target.value
                )
              }
              rows={4}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Enter organization description"
            />

          </div>

          <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5">

            <button
              type="button"
              onClick={() =>
                navigate("/organizations")
              }
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={17} />
              {saving ? "Creating..." : "Create Organization"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <input
        type={type}
        required={required}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

export default CreateOrganization;