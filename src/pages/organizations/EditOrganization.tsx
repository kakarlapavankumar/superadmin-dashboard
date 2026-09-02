import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { getOrganization, updateOrganization } from "../../api/organizationApi";

import type {
  OrganizationFormData,
  OrganizationStatus,
} from "../../types/organization";

const initialForm: OrganizationFormData = {
  name: "",
  code: "",
  description: "",
  tenantId: "",
  tenantName: "",
  industry: "",
  location: "",
  email: "",
  phone: "",
  employees: 0,
  status: "Active",
};

function EditOrganization() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [form, setForm] = useState<OrganizationFormData>(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrganization() {
      if (!id) {
        setError("Organization ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const organization = await getOrganization(id);

        if (!organization) {
          setError("Organization not found.");
          return;
        }

        setForm({
          name: organization.name,
          code: organization.code,
          description: organization.description,
          tenantId: organization.tenantId,
          tenantName: organization.tenantName,
          industry: organization.industry,
          location: organization.location,
          email: organization.email,
          phone: organization.phone,
          employees: organization.employees,
          status: organization.status,
        });
      } catch {
        setError("Failed to load organization.");
      } finally {
        setLoading(false);
      }
    }

    loadOrganization();
  }, [id]);

  const handleChange = (
    field: keyof OrganizationFormData,
    value: string | number,
  ) => {
    setForm((previous: OrganizationFormData) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id) {
      setError("Organization ID is missing.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await updateOrganization(id, {
        ...form,
        status: form.status as OrganizationStatus,
      });

      navigate("/organizations");
    } catch {
      setError("Failed to update organization.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-sm text-slate-500">Loading organization...</div>
      </div>
    );
  }

  if (error && !form.name) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
          {error}
        </div>
        <button
          onClick={() => navigate("/organizations")}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          <ArrowLeft size={16} />
          Back to Organizations
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => navigate("/organizations")}
          className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Edit Organization
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Update organization information.
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Organization Name
            </label>
            <input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Organization Code
            </label>
            <input
              value={form.code}
              onChange={(e) => handleChange("code", e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Tenant Name
            </label>
            <input
              value={form.tenantName}
              onChange={(e) => handleChange("tenantName", e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Tenant ID
            </label>
            <input
              value={form.tenantId}
              onChange={(e) => handleChange("tenantId", e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Industry
            </label>
            <input
              value={form.industry}
              onChange={(e) => handleChange("industry", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Location
            </label>
            <input
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Phone
            </label>
            <input
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Employees
            </label>
            <input
              type="number"
              min="0"
              value={form.employees}
              onChange={(e) =>
                handleChange("employees", Number(e.target.value))
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) =>
                handleChange("status", e.target.value as OrganizationStatus)
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 pt-5">
          <button
            type="button"
            onClick={() => navigate("/organizations")}
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Save size={17} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditOrganization;
