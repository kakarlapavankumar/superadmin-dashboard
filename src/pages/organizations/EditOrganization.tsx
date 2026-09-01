import { FormEvent, useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getOrganization,
  updateOrganization,
} from "../../api/organizationApi";

import type {
  OrganizationFormData,
} from "../../types/organization";

function EditOrganization() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [form, setForm] =
    useState<OrganizationFormData | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Organization ID is missing");
      setLoading(false);
      return;
    }

    const loadOrganization = async () => {
      try {
        const organization =
          await getOrganization(id);

        setForm({
          name: organization.name,
          code: organization.code,
          tenantId: organization.tenantId,
          description: organization.description,
          industry: organization.industry,
          location: organization.location,
          email: organization.email,
          phone: organization.phone,
          employees: organization.employees,
        });
      } catch (err) {
        console.error(err);

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load organization"
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrganization();
  }, [id]);

  const updateField = (
    field: keyof OrganizationFormData,
    value: string | number
  ) => {
    setForm((previous) =>
      previous
        ? {
            ...previous,
            [field]: value,
          }
        : previous
    );
  };

  const handleSubmit = async (
    event: FormEvent
  ) => {
    event.preventDefault();

    if (!id || !form) return;

    try {
      setSaving(true);
      setError("");

      await updateOrganization(id, form);

      navigate(`/organizations/${id}`);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to update organization"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-sm text-slate-500">
        Loading organization...
      </div>
    );
  }

  if (!form) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
          {error || "Organization not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">

      <button
        onClick={() =>
          navigate(
            id
              ? `/organizations/${id}`
              : "/organizations"
          )
        }
        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
      >
        <ArrowLeft size={17} />
        Back
      </button>

      <div className="mx-auto max-w-4xl">

        <div className="mb-6">

          <h1 className="text-2xl font-bold text-slate-900">
            Edit Organization
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Update organization information.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >

          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2">

            <Input
              label="Organization Name"
              value={form.name}
              required
              onChange={(value) =>
                updateField("name", value)
              }
            />

            <Input
              label="Organization Code"
              value={form.code}
              required
              onChange={(value) =>
                updateField(
                  "code",
                  value.toUpperCase()
                )
              }
            />

            <Input
              label="Tenant ID"
              value={form.tenantId}
              required
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
            />

          </div>

          <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5">

            <button
              type="button"
              onClick={() =>
                navigate(
                  id
                    ? `/organizations/${id}`
                    : "/organizations"
                )
              }
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              <Save size={17} />
              {saving ? "Saving..." : "Save Changes"}
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
        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

export default EditOrganization;