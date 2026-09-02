import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Building2, Save } from "lucide-react";

import { useTenant, useTenants, useUpdateTenant } from "../hooks/useTenants";

import type { TenantPlan, TenantStatus } from "../types/tenant";

interface EditTenantForm {
  name: string;
  code: string;
  domain: string;
  plan: TenantPlan;
  status: TenantStatus;
}

const emptyForm: EditTenantForm = {
  name: "",
  code: "",
  domain: "",
  plan: "Basic",
  status: "Active",
};

export default function EditTenant() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const tenantId = id ? Number(id) : undefined;

  const tenantQuery = useTenant(tenantId);

  /*
   * We need the tenant list only for checking
   * duplicate tenant codes and domains.
   */
  const tenantsQuery = useTenants({
    page: 1,
    limit: 1000,
  });

  const updateTenant = useUpdateTenant();

  const tenant = tenantQuery.data;

  /*
   * IMPORTANT:
   * useTenants() returns:
   *
   * {
   *   data: Tenant[],
   *   total: number,
   *   page: number,
   *   limit: number,
   *   totalPages: number
   * }
   *
   * Therefore we must access .data.
   */
  const tenants = tenantsQuery.data?.data ?? [];

  /*
   * No useEffect and no setState inside an effect.
   *
   * When the tenant is available, use its values.
   * Otherwise use the empty form.
   */
  const tenantForm: EditTenantForm = tenant
    ? {
        name: tenant.name,
        code: tenant.code,
        domain: tenant.domain,
        plan: tenant.plan,
        status: tenant.status,
      }
    : emptyForm;

  const [form, setForm] = useState<EditTenantForm | null>(null);

  /*
   * If the user has not edited anything yet,
   * display values from the tenant.
   *
   * Once the user changes a field, local state takes over.
   */
  const formData = form ?? tenantForm;

  const [error, setError] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setForm((previous) => {
      const current = previous ?? tenantForm;

      return {
        ...current,
        [name]: value,
      };
    });

    setError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!tenant) {
      setError("Tenant not found.");
      return;
    }

    const name = formData.name.trim();
    const code = formData.code.trim().toUpperCase();
    const domain = formData.domain.trim().toLowerCase();

    if (!name) {
      setError("Tenant name is required.");
      return;
    }

    if (!code) {
      setError("Tenant code is required.");
      return;
    }

    if (!domain) {
      setError("Tenant domain is required.");
      return;
    }

    /*
     * Check duplicate tenant code.
     */
    const duplicateCode = tenants.some(
      (existingTenant) =>
        existingTenant.id !== tenant.id &&
        existingTenant.code.toLowerCase() === code.toLowerCase(),
    );

    if (duplicateCode) {
      setError("Another tenant already uses this tenant code.");
      return;
    }

    /*
     * Check duplicate domain.
     */
    const duplicateDomain = tenants.some(
      (existingTenant) =>
        existingTenant.id !== tenant.id &&
        existingTenant.domain.toLowerCase() === domain.toLowerCase(),
    );

    if (duplicateDomain) {
      setError("Another tenant already uses this domain.");
      return;
    }

    setError("");

    try {
      await updateTenant.mutateAsync({
        id: tenant.id,
        data: {
          name,
          code,
          domain,
          plan: formData.plan,
          status: formData.status,
        },
      });

      navigate(`/tenants/${tenant.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update tenant.");
    }
  };

  if (tenantQuery.isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-sm text-slate-500">Loading tenant...</div>
      </div>
    );
  }

  if (tenantQuery.isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-lg font-semibold text-red-700">
          Failed to load tenant
        </h2>

        <p className="mt-2 text-sm text-red-600">
          {tenantQuery.error instanceof Error
            ? tenantQuery.error.message
            : "Something went wrong."}
        </p>

        <Link
          to="/tenants"
          className="mt-4 inline-flex rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Back to Tenants
        </Link>
      </div>
    );
  }

  if (!tenant) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <Building2 className="mx-auto h-12 w-12 text-slate-300" />

        <h2 className="mt-4 text-lg font-semibold text-slate-800">
          Tenant not found
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          The tenant you are trying to edit does not exist.
        </p>

        <Link
          to="/tenants"
          className="mt-5 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Back to Tenants
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <button
          type="button"
          onClick={() => navigate(`/tenants/${tenant.id}`)}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tenant
        </button>

        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-50 p-3">
            <Building2 className="h-6 w-6 text-indigo-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">Edit Tenant</h1>

            <p className="mt-1 text-sm text-slate-500">
              Update tenant information and settings.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        {/* Form Header */}
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Tenant Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Modify the details below and save your changes.
          </p>
        </div>

        {/* Form Fields */}
        <div className="grid gap-6 p-6 md:grid-cols-2">
          {/* Tenant Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Tenant Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter tenant name"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Tenant Code */}
          <div>
            <label
              htmlFor="code"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Tenant Code
            </label>

            <input
              id="code"
              name="code"
              type="text"
              value={formData.code}
              onChange={handleChange}
              placeholder="TENANT-001"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm uppercase outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Domain */}
          <div className="md:col-span-2">
            <label
              htmlFor="domain"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Domain
            </label>

            <input
              id="domain"
              name="domain"
              type="text"
              value={formData.domain}
              onChange={handleChange}
              placeholder="example.com"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Plan */}
          <div>
            <label
              htmlFor="plan"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Plan
            </label>

            <select
              id="plan"
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
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
        </div>

        {/* Current Usage */}
        <div className="mx-6 mb-6 rounded-xl bg-slate-50 p-4">
          <h3 className="text-sm font-semibold text-slate-800">
            Current Usage
          </h3>

          <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <p className="text-xs text-slate-500">Users</p>

              <p className="mt-1 text-lg font-semibold text-slate-900">
                {tenant.users.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">Organizations</p>

              <p className="mt-1 text-lg font-semibold text-slate-900">
                {tenant.organizations.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">Created</p>

              <p className="mt-1 text-sm font-medium text-slate-700">
                {tenant.createdAt}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">Last Updated</p>

              <p className="mt-1 text-sm font-medium text-slate-700">
                {tenant.updatedAt}
              </p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mx-6 mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate(`/tenants/${tenant.id}`)}
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={updateTenant.isPending}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save className="h-4 w-4" />

            {updateTenant.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
