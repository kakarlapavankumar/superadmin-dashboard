import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, Save } from "lucide-react";

import type { OrganizationFormData } from "../../types/organization";

import { useCreateOrganization } from "../../hooks/useOrganizations";
import { useTenants } from "../../hooks/useTenants";

const initialForm: OrganizationFormData = {
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
};

export default function CreateOrganization() {
  const navigate = useNavigate();

  const createOrganization = useCreateOrganization();

  const tenantsQuery = useTenants({
    page: 1,
    limit: 125,
  });

  const tenants = tenantsQuery.data?.data ?? [];

  const [form, setForm] = useState<OrganizationFormData>(initialForm);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    name: keyof OrganizationFormData,
    value: string | number,
  ) => {
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      newErrors.name = "Organization name is required";
    }

    if (!form.code.trim()) {
      newErrors.code = "Organization code is required";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!form.tenantId) {
      newErrors.tenantId = "Please select a tenant";
    }

    if (!form.industry.trim()) {
      newErrors.industry = "Industry is required";
    }

    if (!form.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (form.employees < 0) {
      newErrors.employees = "Employees cannot be negative";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await createOrganization.mutateAsync({
        name: form.name.trim(),
        code: form.code.trim().toUpperCase(),
        description: form.description.trim(),

        tenantId: form.tenantId,
        tenantName: form.tenantName,

        industry: form.industry.trim(),
        location: form.location.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),

        employees: form.employees,
        status: form.status,
      });

      navigate("/organizations");
    } catch (error) {
      console.error("Failed to create organization:", error);
    }
  };

  const handleTenantChange = (value: string) => {
    const tenantId = Number(value);

    const selectedTenant = tenants.find((tenant) => tenant.id === tenantId);

    setForm((previous) => ({
      ...previous,
      tenantId,
      tenantName: selectedTenant?.name ?? "",
    }));

    setErrors((previous) => ({
      ...previous,
      tenantId: "",
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <button
              type="button"
              onClick={() => navigate("/organizations")}
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              <ArrowLeft size={18} />
              Back to Organizations
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <Building2 size={22} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Create Organization
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Add a new organization to the platform
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          {/* Basic Information */}
          <div className="border-b border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Basic Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the organization's basic details.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Organization Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Organization Name
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  placeholder="Enter organization name"
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2 ${
                    errors.name
                      ? "border-red-400 focus:ring-red-100"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />

                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Organization Code */}
              <div>
                <label
                  htmlFor="code"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Organization Code
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  id="code"
                  type="text"
                  value={form.code}
                  onChange={(event) => handleChange("code", event.target.value)}
                  placeholder="e.g. ORG001"
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm uppercase outline-none transition focus:ring-2 ${
                    errors.code
                      ? "border-red-400 focus:ring-red-100"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />

                {errors.code && (
                  <p className="mt-1 text-xs text-red-500">{errors.code}</p>
                )}
              </div>

              {/* Tenant */}
              <div>
                <label
                  htmlFor="tenantId"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Tenant
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <select
                  id="tenantId"
                  value={form.tenantId === 0 ? "" : String(form.tenantId)}
                  onChange={(event) => handleTenantChange(event.target.value)}
                  className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none transition focus:ring-2 ${
                    errors.tenantId
                      ? "border-red-400 focus:ring-red-100"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                >
                  <option value="">Select tenant</option>

                  {tenants.map((tenant) => (
                    <option key={tenant.id} value={tenant.id}>
                      {tenant.name} ({tenant.code})
                    </option>
                  ))}
                </select>

                {errors.tenantId && (
                  <p className="mt-1 text-xs text-red-500">{errors.tenantId}</p>
                )}

                {tenantsQuery.isLoading && (
                  <p className="mt-1 text-xs text-slate-500">
                    Loading tenants...
                  </p>
                )}
              </div>

              {/* Industry */}
              <div>
                <label
                  htmlFor="industry"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Industry
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  id="industry"
                  type="text"
                  value={form.industry}
                  onChange={(event) =>
                    handleChange("industry", event.target.value)
                  }
                  placeholder="e.g. Technology"
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2 ${
                    errors.industry
                      ? "border-red-400 focus:ring-red-100"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />

                {errors.industry && (
                  <p className="mt-1 text-xs text-red-500">{errors.industry}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Location
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  id="location"
                  type="text"
                  value={form.location}
                  onChange={(event) =>
                    handleChange("location", event.target.value)
                  }
                  placeholder="e.g. Hyderabad, India"
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2 ${
                    errors.location
                      ? "border-red-400 focus:ring-red-100"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />

                {errors.location && (
                  <p className="mt-1 text-xs text-red-500">{errors.location}</p>
                )}
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
                  type="number"
                  min="0"
                  value={form.employees}
                  onChange={(event) =>
                    handleChange("employees", Number(event.target.value))
                  }
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2 ${
                    errors.employees
                      ? "border-red-400 focus:ring-red-100"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />

                {errors.employees && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.employees}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mt-5">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Description
                <span className="ml-1 text-red-500">*</span>
              </label>

              <textarea
                id="description"
                rows={4}
                value={form.description}
                onChange={(event) =>
                  handleChange("description", event.target.value)
                }
                placeholder="Enter organization description"
                className={`w-full resize-none rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2 ${
                  errors.description
                    ? "border-red-400 focus:ring-red-100"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                }`}
              />

              {errors.description && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-b border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Contact Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add contact details for the organization.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    handleChange("email", event.target.value)
                  }
                  placeholder="contact@example.com"
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2 ${
                    errors.email
                      ? "border-red-400 focus:ring-red-100"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />

                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Phone
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(event) =>
                    handleChange("phone", event.target.value)
                  }
                  placeholder="+91 9876543210"
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2 ${
                    errors.phone
                      ? "border-red-400 focus:ring-red-100"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />

                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Organization Status
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Choose the initial status of the organization.
            </p>

            <div className="mt-5 flex gap-6">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="Active"
                  checked={form.status === "Active"}
                  onChange={() => handleChange("status", "Active")}
                  className="h-4 w-4"
                />

                <span className="text-sm font-medium text-slate-700">
                  Active
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  checked={form.status === "Inactive"}
                  onChange={() => handleChange("status", "Inactive")}
                  className="h-4 w-4"
                />

                <span className="text-sm font-medium text-slate-700">
                  Inactive
                </span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
            <button
              type="button"
              onClick={() => navigate("/organizations")}
              disabled={createOrganization.isPending}
              className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={createOrganization.isPending}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={17} />

              {createOrganization.isPending
                ? "Creating..."
                : "Create Organization"}
            </button>
          </div>

          {createOrganization.isError && (
            <div className="mx-6 mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              Failed to create organization. Please try again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
