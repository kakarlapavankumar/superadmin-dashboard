import { useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Building2, Save } from "lucide-react";

import type { OrganizationFormData } from "../../types/organization";

import {
  useOrganization,
  useUpdateOrganization,
} from "../../hooks/useOrganizations";

export default function EditOrganization() {
  const navigate = useNavigate();
  const { id } = useParams();

  const organizationQuery = useOrganization(id);

  const updateOrganization = useUpdateOrganization();

  const organization = organizationQuery.data;

  const [form, setForm] = useState<OrganizationFormData | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (organizationQuery.isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

              <p className="mt-4 text-sm text-slate-500">
                Loading organization...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (organizationQuery.isError) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-5xl">
          <button
            type="button"
            onClick={() => navigate("/organizations")}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={18} />
            Back to Organizations
          </button>

          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Failed to load organization
            </h2>

            <p className="mt-2 text-sm text-slate-500">Please try again.</p>

            <button
              type="button"
              onClick={() => organizationQuery.refetch()}
              className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-5xl">
          <button
            type="button"
            onClick={() => navigate("/organizations")}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={18} />
            Back to Organizations
          </button>

          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <Building2 size={40} className="mx-auto text-slate-300" />

            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              Organization not found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              The organization does not exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /*
   * Build the initial form directly from the
   * organization returned by the query.
   */
  const defaultForm: OrganizationFormData = {
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
  };

  /*
   * If the user has not edited anything yet,
   * use the organization data.
   *
   * Once the user changes a field, `form` contains
   * the edited values.
   */
  const formData = form ?? defaultForm;

  const handleChange = (
    field: keyof OrganizationFormData,
    value: string | number,
  ) => {
    setForm((previous: OrganizationFormData | null) => {
      const current = previous ?? defaultForm;

      return {
        ...current,
        [field]: value,
      };
    });

    setErrors((previous: Record<string, string>) => ({
      ...previous,
      [field]: "",
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Organization name is required";
    }

    if (!formData.code.trim()) {
      newErrors.code = "Organization code is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.tenantId) {
      newErrors.tenantId = "Please select a tenant";
    }

    if (!formData.industry.trim()) {
      newErrors.industry = "Industry is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (formData.employees < 0) {
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
      await updateOrganization.mutateAsync({
        id: organization.id,

        data: {
          name: formData.name.trim(),

          code: formData.code.trim().toUpperCase(),

          description: formData.description.trim(),

          tenantId: formData.tenantId,

          tenantName: formData.tenantName,

          industry: formData.industry.trim(),

          location: formData.location.trim(),

          email: formData.email.trim(),

          phone: formData.phone.trim(),

          employees: formData.employees,

          status: formData.status,
        },
      });

      navigate(`/organizations/${organization.id}`);
    } catch (error) {
      console.error("Failed to update organization:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => navigate("/organizations")}
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={18} />
            Back to Organizations
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Building2 size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Edit Organization
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Update organization information
              </p>
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

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Name */}
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
                  value={formData.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none ${
                    errors.name ? "border-red-400" : "border-slate-300"
                  }`}
                />

                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Code */}
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
                  value={formData.code}
                  onChange={(event) => handleChange("code", event.target.value)}
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm uppercase outline-none ${
                    errors.code ? "border-red-400" : "border-slate-300"
                  }`}
                />

                {errors.code && (
                  <p className="mt-1 text-xs text-red-500">{errors.code}</p>
                )}
              </div>

              {/* Tenant */}
              <div>
                <label
                  htmlFor="tenantName"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Tenant
                </label>

                <input
                  id="tenantName"
                  type="text"
                  value={formData.tenantName}
                  readOnly
                  className="w-full rounded-lg border border-slate-300 bg-slate-100 px-4 py-2.5 text-sm text-slate-600 outline-none"
                />
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
                  value={formData.industry}
                  onChange={(event) =>
                    handleChange("industry", event.target.value)
                  }
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none ${
                    errors.industry ? "border-red-400" : "border-slate-300"
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
                  value={formData.location}
                  onChange={(event) =>
                    handleChange("location", event.target.value)
                  }
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none ${
                    errors.location ? "border-red-400" : "border-slate-300"
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
                  value={formData.employees}
                  onChange={(event) =>
                    handleChange("employees", Number(event.target.value))
                  }
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none ${
                    errors.employees ? "border-red-400" : "border-slate-300"
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
                value={formData.description}
                onChange={(event) =>
                  handleChange("description", event.target.value)
                }
                className={`w-full resize-none rounded-lg border px-4 py-2.5 text-sm outline-none ${
                  errors.description ? "border-red-400" : "border-slate-300"
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
                  value={formData.email}
                  onChange={(event) =>
                    handleChange("email", event.target.value)
                  }
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none ${
                    errors.email ? "border-red-400" : "border-slate-300"
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
                  value={formData.phone}
                  onChange={(event) =>
                    handleChange("phone", event.target.value)
                  }
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none ${
                    errors.phone ? "border-red-400" : "border-slate-300"
                  }`}
                />

                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="border-b border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Status</h2>

            <div className="mt-4 flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  checked={formData.status === "Active"}
                  onChange={() => handleChange("status", "Active")}
                />

                <span className="text-sm text-slate-700">Active</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  checked={formData.status === "Inactive"}
                  onChange={() => handleChange("status", "Inactive")}
                />

                <span className="text-sm text-slate-700">Inactive</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 bg-slate-50 px-6 py-4">
            <button
              type="button"
              onClick={() => navigate("/organizations")}
              disabled={updateOrganization.isPending}
              className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={updateOrganization.isPending}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              <Save size={17} />

              {updateOrganization.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {updateOrganization.isError && (
            <div className="mx-6 mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              Failed to update organization. Please try again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
