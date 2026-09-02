import { useState } from "react";
import { ArrowLeft, Building2, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useCreateTenant, useTenants } from "../hooks/useTenants";

import type {
  CreateTenantInput,
  TenantPlan,
  TenantStatus,
} from "../types/tenant";

const initialForm: CreateTenantInput = {
  name: "",
  code: "",
  domain: "",
  status: "Active",
  plan: "Professional",
  users: 0,
  organizations: 0,
};

export default function CreateTenant() {
  const navigate = useNavigate();

  const [form, setForm] = useState<CreateTenantInput>(initialForm);

  const [error, setError] = useState("");

  const createMutation = useCreateTenant();

  /*
   * IMPORTANT:
   *
   * useTenants() returns a paginated response.
   *
   * We only need the actual tenant array here.
   */
  const tenantsQuery = useTenants({
    page: 1,
    limit: 1000,
  });

  const tenants = tenantsQuery.data?.data ?? [];

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,

      [name]: value,
    }));
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,

      [name]: Number(value),
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setError("");

    if (!form.name.trim()) {
      setError("Tenant name is required.");
      return;
    }

    if (!form.code.trim()) {
      setError("Tenant code is required.");
      return;
    }

    if (!form.domain.trim()) {
      setError("Tenant domain is required.");
      return;
    }

    const codeExists = tenants.some(
      (tenant) => tenant.code.toLowerCase() === form.code.toLowerCase(),
    );

    if (codeExists) {
      setError("A tenant with this code already exists.");
      return;
    }

    const domainExists = tenants.some(
      (tenant) => tenant.domain.toLowerCase() === form.domain.toLowerCase(),
    );

    if (domainExists) {
      setError("A tenant with this domain already exists.");
      return;
    }

    try {
      await createMutation.mutateAsync({
        name: form.name.trim(),
        code: form.code.trim().toUpperCase(),
        domain: form.domain.trim().toLowerCase(),
        status: form.status,
        plan: form.plan,
        users: form.users ?? 0,
        organizations: form.organizations ?? 0,
      });

      navigate("/tenants");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create tenant.");
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}

      <div className="flex items-center gap-4">
        <Link
          to="/tenants"
          className="rounded-lg border border-gray-300 p-2 text-gray-600 transition hover:bg-gray-50"
        >
          <ArrowLeft size={20} />
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Tenant</h1>

          <p className="mt-1 text-sm text-gray-500">
            Create a new tenant for the platform.
          </p>
        </div>
      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-gray-200 bg-white shadow-sm"
      >
        {/* Form Header */}

        <div className="border-b border-gray-200 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600">
              <Building2 size={22} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                Tenant Information
              </h2>

              <p className="text-sm text-gray-500">
                Enter the basic information for the new tenant.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Error */}

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Name */}

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Tenant Name
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Acme Corporation"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Code */}

            <div>
              <label
                htmlFor="code"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Tenant Code
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                id="code"
                name="code"
                type="text"
                value={form.code}
                onChange={handleChange}
                placeholder="ACME"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm uppercase outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <p className="mt-1 text-xs text-gray-500">
                Use a unique short code.
              </p>
            </div>

            {/* Domain */}

            <div>
              <label
                htmlFor="domain"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Domain
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                id="domain"
                name="domain"
                type="text"
                value={form.domain}
                onChange={handleChange}
                placeholder="acme.com"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Plan */}

            <div>
              <label
                htmlFor="plan"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Plan
              </label>

              <select
                id="plan"
                name="plan"
                value={form.plan}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    plan: event.target.value as TenantPlan,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="Basic">Basic</option>

                <option value="Professional">Professional</option>

                <option value="Enterprise">Enterprise</option>
              </select>
            </div>

            {/* Status */}

            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Status
              </label>

              <select
                id="status"
                name="status"
                value={form.status}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    status: event.target.value as TenantStatus,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="Active">Active</option>

                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Users */}

            <div>
              <label
                htmlFor="users"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Initial Users
              </label>

              <input
                id="users"
                name="users"
                type="number"
                min="0"
                value={form.users ?? 0}
                onChange={handleNumberChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Organizations */}

            <div>
              <label
                htmlFor="organizations"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Initial Organizations
              </label>

              <input
                id="organizations"
                name="organizations"
                type="number"
                min="0"
                value={form.organizations ?? 0}
                onChange={handleNumberChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">
          <Link
            to="/tenants"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={createMutation.isPending}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={17} />

            {createMutation.isPending ? "Creating..." : "Create Tenant"}
          </button>
        </div>
      </form>
    </div>
  );
}
