import { useMemo, useState } from "react";
import { Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import BackToDashboard from "../../components/BackToDashboard";
import PageHeader from "../../components/PageHeader";

import {
  useOrganization,
  useUpdateOrganization,
} from "../../hooks/useOrganizations";

type OrganizationStatus = "Active" | "Inactive";

type OrganizationFormData = {
  name: string;
  code: string;
  tenant: {
    id?: string | number;
    name?: string;
  };
  tenantId: string;
  tenantName: string;
  industry: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  employees: number;
  description: string;
  status: OrganizationStatus;
};

export default function EditOrganization() {
  const { id } = useParams<{
    id: string;
  }>();

  const navigate = useNavigate();

  const { data: organization, isLoading } = useOrganization(id);

  const mutation = useUpdateOrganization();

  const [draft, setDraft] = useState<Partial<OrganizationFormData>>({});

  const tenant = organization?.tenant;

  const form = useMemo<OrganizationFormData | null>(() => {
    if (!organization) {
      return null;
    }

    const tenantDetails: { id?: string | number; name?: string } | null =
      tenant && typeof tenant === "object"
        ? (tenant as { id?: string | number; name?: string })
        : null;

    const tenantId = String(tenantDetails?.id ?? "");
    const tenantName = tenantDetails?.name ?? "";
    const organizationWithOptionalFields =
      organization as typeof organization & {
        website?: string;
        description?: string;
      };

    return {
      name: draft.name ?? organization.name,
      code: draft.code ?? organization.code,
      tenant: draft.tenant ??
        tenantDetails ?? { id: tenantId, name: tenantName },
      tenantId: draft.tenantId ?? tenantId,
      tenantName: draft.tenantName ?? tenantName,
      industry: draft.industry ?? organization.industry,
      location: draft.location ?? organization.location,
      email: draft.email ?? organization.email,
      phone: draft.phone ?? organization.phone,
      website: draft.website ?? organizationWithOptionalFields.website ?? "",
      employees: draft.employees ?? organization.employees,
      description:
        draft.description ?? organizationWithOptionalFields.description ?? "",
      status: draft.status ?? organization.status,
    };
  }, [draft, organization, tenant]);

  const updateField = <K extends keyof OrganizationFormData>(
    field: K,
    value: OrganizationFormData[K],
  ) => {
    setDraft((current) => ({
      ...current,
      [field]: value,
    }));
  };

  if (isLoading || !form) {
    return (
      <div className="p-6 text-sm text-slate-500">Loading organization...</div>
    );
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!id) return;

    const payload = {
      ...form,
      tenant: String(
        ((form.tenantId || form.tenant?.id) ?? form.tenantName) || "",
      ),
    };

    try {
      await mutation.mutateAsync({
        id,
        data: payload,
      });

      navigate(`/organizations/${id}`);
    } catch (error) {
      console.error(error);
      alert("Failed to update organization.");
    }
  };

  return (
    <div className="min-h-full bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl">
        <BackToDashboard />

        <div className="mt-5">
          <PageHeader
            title="Edit Organization"
            description={`Update ${organization?.name}`}
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-slate-200 bg-white shadow-sm"
        >
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
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
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
                className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
            <button
              type="button"
              onClick={() => navigate(`/organizations/${id}`)}
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

              {mutation.isPending ? "Saving..." : "Save Changes"}
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
        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
      />
    </div>
  );
}
