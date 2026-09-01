import { useState } from "react";
import { Building2, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

import BackToDashboard from "../../components/BackToDashboard";
import PageHeader from "../../components/PageHeader";

import { useCreateOrganization } from "../../hooks/useOrganizations";

type OrganizationFormData = {
  name: string;
  code: string;
  tenant: string;
  tenantId: string;
  tenantName: string;
  industry: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  employees: number;
  description: string;
  status: "Active" | "Inactive";
};

const initialForm: OrganizationFormData = {
  name: "",
  code: "",
  tenant: "",
  tenantId: "",
  tenantName: "",
  industry: "",
  location: "",
  email: "",
  phone: "",
  website: "",
  employees: 0,
  description: "",
  status: "Active",
};

export default function CreateOrganization() {
  const navigate = useNavigate();

  const mutation = useCreateOrganization();

  const [form, setForm] = useState<OrganizationFormData>(initialForm);

  const updateField = <K extends keyof OrganizationFormData>(
    field: K,
    value: OrganizationFormData[K],
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const organization = await mutation.mutateAsync(form);

      navigate(`/organizations/${organization.id}`);
    } catch (error) {
      console.error(error);
      alert("Failed to create organization.");
    }
  };

  return (
    <div className="min-h-full bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl">
        <BackToDashboard />

        <div className="mt-5">
          <PageHeader
            title="Create Organization"
            description="Add a new organization to the platform."
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="border-b border-slate-200 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                <Building2 size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Organization Information
                </h2>

                <p className="text-sm text-slate-500">
                  Enter the organization details below.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 p-6 md:grid-cols-2">
            <Input
              label="Organization Name"
              required
              value={form.name}
              onChange={(value) => updateField("name", value)}
            />

            <Input
              label="Organization Code"
              required
              value={form.code}
              onChange={(value) => updateField("code", value.toUpperCase())}
            />

            <Input
              label="Tenant ID"
              required
              value={form.tenantId}
              onChange={(value) => updateField("tenantId", value)}
            />

            <Input
              label="Tenant Name"
              required
              value={form.tenantName}
              onChange={(value) => updateField("tenantName", value)}
            />

            <Input
              label="Industry"
              value={form.industry}
              onChange={(value) => updateField("industry", value)}
            />

            <Input
              label="Location"
              value={form.location}
              onChange={(value) => updateField("location", value)}
            />

            <Input
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={(value) => updateField("email", value)}
            />

            <Input
              label="Phone"
              value={form.phone}
              onChange={(value) => updateField("phone", value)}
            />

            <Input
              label="Website"
              value={form.website}
              onChange={(value) => updateField("website", value)}
            />

            <Input
              label="Employees"
              type="number"
              value={String(form.employees)}
              onChange={(value) => updateField("employees", Number(value) || 0)}
            />

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Status
              </label>

              <select
                value={form.status}
                onChange={(event) =>
                  updateField(
                    "status",
                    event.target.value as OrganizationFormData["status"],
                  )
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="Active">Active</option>

                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Description
              </label>

              <textarea
                rows={4}
                value={form.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                placeholder="Enter organization description..."
                className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
            <button
              type="button"
              onClick={() => navigate("/organizations")}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              <Save size={17} />

              {mutation.isPending ? "Creating..." : "Create Organization"}
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
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}

        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <input
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}
