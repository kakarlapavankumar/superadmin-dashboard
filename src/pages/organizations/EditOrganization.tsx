import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  useOrganization,
  useUpdateOrganization,
} from "../../hooks/useOrganizations";

import type { OrganizationFormData } from "../../types/organization";

const initialForm: OrganizationFormData = {
  name: "",
  code: "",
  description: "",

  tenantId: 1,
  tenantName: "",

  industry: "",
  location: "",

  email: "",
  phone: "",

  employees: 0,

  status: "Active",
};

export default function EditOrganization() {
  const { id } = useParams<{
    id: string;
  }>();

  const navigate = useNavigate();

  const { data: organization, isLoading, isError } = useOrganization(id);

  const updateMutation = useUpdateOrganization();

  const [form, setForm] = useState<OrganizationFormData>(initialForm);

  const [error, setError] = useState("");

  useEffect(() => {
    if (!organization) {
      return;
    }

    queueMicrotask(() => {
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
    });
  }, [organization]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setForm((previous: OrganizationFormData) => ({
      ...previous,

      [name]:
        name === "tenantId" || name === "employees" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!id) {
      setError("Organization ID is missing.");
      return;
    }

    if (!form.name.trim()) {
      setError("Organization name is required.");
      return;
    }

    if (!form.code.trim()) {
      setError("Organization code is required.");
      return;
    }

    if (!form.tenantName.trim()) {
      setError("Tenant name is required.");
      return;
    }

    setError("");

    try {
      await updateMutation.mutateAsync({
        id,
        data: form,
      });

      navigate(`/organizations/${id}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update organization.",
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      </div>
    );
  }

  if (isError || !organization) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
        <h2 className="text-lg font-semibold text-red-700">
          Organization not found
        </h2>

        <p className="mt-2 text-sm text-red-600">
          The organization you are trying to edit does not exist.
        </p>

        <Link
          to="/organizations"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          <ArrowLeft size={16} />
          Back to Organizations
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}

      <div className="flex items-center gap-4">
        <Link
          to={`/organizations/${id}`}
          className="rounded-lg border border-gray-300 p-2 text-gray-600 hover:bg-gray-50"
        >
          <ArrowLeft size={20} />
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Edit Organization
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Update organization information.
          </p>
        </div>
      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Name */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Organization Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Enter organization name"
            />
          </div>

          {/* Code */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Organization Code
            </label>

            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="ORG-CODE"
            />
          </div>

          {/* Tenant */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Tenant Name
            </label>

            <input
              name="tenantName"
              value={form.tenantName}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Enter tenant name"
            />
          </div>

          {/* Tenant ID */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Tenant ID
            </label>

            <input
              type="number"
              name="tenantId"
              value={form.tenantId}
              onChange={handleChange}
              min="1"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Industry */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Industry
            </label>

            <input
              name="industry"
              value={form.industry}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Technology"
            />
          </div>

          {/* Location */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Location
            </label>

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Hyderabad, India"
            />
          </div>

          {/* Email */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="organization@example.com"
            />
          </div>

          {/* Phone */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Phone
            </label>

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="+91 9876543210"
            />
          </div>

          {/* Employees */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Employees
            </label>

            <input
              type="number"
              name="employees"
              value={form.employees}
              onChange={handleChange}
              min="0"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Status */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="Active">Active</option>

              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Description */}

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Describe this organization..."
            />
          </div>
        </div>

        {/* Buttons */}

        <div className="mt-8 flex justify-end gap-3 border-t border-gray-200 pt-6">
          <Link
            to={`/organizations/${id}`}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={17} />

            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
