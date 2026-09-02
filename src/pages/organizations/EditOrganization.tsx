import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Building2, Save } from "lucide-react";

import {
  useOrganization,
  useUpdateOrganization,
} from "../../hooks/useOrganizations";

import type { OrganizationFormData } from "../../types/organization";

export default function EditOrganization() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const organizationQuery = useOrganization(id);
  const updateOrganization = useUpdateOrganization();

  const organization = organizationQuery.data;

  const [form, setForm] = useState<OrganizationFormData | null>(null);

  const [error, setError] = useState("");

  const formData: OrganizationFormData =
    form ??
    (organization
      ? {
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
        }
      : {
          name: "",
          code: "",
          description: "",
          tenantId: 0,
          tenantName: "",
          industry: "",
          location: "",
          email: "",
          phone: "",
          employees: 0,
          status: "Active",
        });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setForm((previous) => {
      const current = previous ?? formData;

      return {
        ...current,
        [name]:
          name === "tenantId" || name === "employees" ? Number(value) : value,
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id) {
      setError("Organization ID is missing.");
      return;
    }

    if (!formData.name.trim()) {
      setError("Organization name is required.");
      return;
    }

    if (!formData.code.trim()) {
      setError("Organization code is required.");
      return;
    }

    if (!formData.tenantName.trim()) {
      setError("Tenant name is required.");
      return;
    }

    if (!formData.industry.trim()) {
      setError("Industry is required.");
      return;
    }

    if (!formData.location.trim()) {
      setError("Location is required.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Phone number is required.");
      return;
    }

    if (formData.tenantId <= 0) {
      setError("Tenant ID must be greater than 0.");
      return;
    }

    if (formData.employees < 0) {
      setError("Employees cannot be negative.");
      return;
    }

    setError("");

    try {
      await updateOrganization.mutateAsync({
        id,
        data: {
          name: formData.name.trim(),
          code: formData.code.trim(),
          description: formData.description.trim(),
          tenantId: formData.tenantId,
          tenantName: formData.tenantName.trim(),
          industry: formData.industry.trim(),
          location: formData.location.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          employees: formData.employees,
          status: formData.status,
        },
      });

      navigate(`/organizations/${id}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update organization.",
      );
    }
  };

  if (organizationQuery.isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-sm text-slate-500">Loading organization...</div>
      </div>
    );
  }

  if (organizationQuery.isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-lg font-semibold text-red-700">
          Failed to load organization
        </h2>

        <p className="mt-2 text-sm text-red-600">
          {organizationQuery.error instanceof Error
            ? organizationQuery.error.message
            : "Something went wrong."}
        </p>

        <button
          type="button"
          onClick={() => navigate("/organizations")}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Back to Organizations
        </button>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <Building2 className="mx-auto h-12 w-12 text-slate-400" />

        <h2 className="mt-4 text-lg font-semibold text-slate-800">
          Organization not found
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          The organization you are trying to edit does not exist.
        </p>

        <button
          type="button"
          onClick={() => navigate("/organizations")}
          className="mt-5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Back to Organizations
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          type="button"
          onClick={() => navigate(`/organizations/${organization.id}`)}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Organization
        </button>

        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-50 p-3">
            <Building2 className="h-6 w-6 text-indigo-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Edit Organization
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Update organization information and settings.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Organization Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Modify the details below and save your changes.
          </p>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          {/* Organization Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Organization Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter organization name"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Organization Code */}
          <div>
            <label
              htmlFor="code"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Organization Code
            </label>

            <input
              id="code"
              name="code"
              type="text"
              value={formData.code}
              onChange={handleChange}
              placeholder="ORG-001"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm uppercase outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Tenant Name */}
          <div>
            <label
              htmlFor="tenantName"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Tenant Name
            </label>

            <input
              id="tenantName"
              name="tenantName"
              type="text"
              value={formData.tenantName}
              onChange={handleChange}
              placeholder="Enter tenant name"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Tenant ID */}
          <div>
            <label
              htmlFor="tenantId"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Tenant ID
            </label>

            <input
              id="tenantId"
              name="tenantId"
              type="number"
              min="1"
              value={formData.tenantId}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Industry */}
          <div>
            <label
              htmlFor="industry"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Industry
            </label>

            <input
              id="industry"
              name="industry"
              type="text"
              value={formData.industry}
              onChange={handleChange}
              placeholder="Technology"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Location
            </label>

            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="Hyderabad, India"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="organization@example.com"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Phone
            </label>

            <input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Employees */}
          <div>
            <label
              htmlFor="employees"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Employees
            </label>

            <input
              id="employees"
              name="employees"
              type="number"
              min="0"
              value={formData.employees}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Status
            </label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Enter organization description"
              className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mx-6 mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate(`/organizations/${organization.id}`)}
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={updateOrganization.isPending}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save className="h-4 w-4" />

            {updateOrganization.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
