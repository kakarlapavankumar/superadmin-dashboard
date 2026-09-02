import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Globe,
  Pencil,
  Users,
  Network,
  Power,
  PowerOff,
} from "lucide-react";

import {
  useTenant,
  useActivateTenant,
  useDeactivateTenant,
} from "../hooks/useTenants";

export default function TenantDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const tenantId = id ? Number(id) : undefined;

  const tenantQuery = useTenant(tenantId);

  const activateTenant = useActivateTenant();
  const deactivateTenant = useDeactivateTenant();

  const tenant = tenantQuery.data;

  const handleToggleStatus = async () => {
    if (!tenant) {
      return;
    }

    try {
      if (tenant.status === "Active") {
        await deactivateTenant.mutateAsync(tenant.id);
      } else {
        await activateTenant.mutateAsync(tenant.id);
      }
    } catch (error) {
      console.error("Failed to update tenant status:", error);
    }
  };

  if (tenantQuery.isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-slate-500">Loading tenant...</p>
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
          The requested tenant does not exist.
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

  const isUpdatingStatus =
    activateTenant.isPending || deactivateTenant.isPending;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate("/tenants")}
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tenants
          </button>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-50 p-3">
              <Building2 className="h-7 w-7 text-indigo-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {tenant.name}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Tenant Code: {tenant.code}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/tenants/${tenant.id}/edit`}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Link>

          <button
            type="button"
            disabled={isUpdatingStatus}
            onClick={handleToggleStatus}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60 ${
              tenant.status === "Active"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {tenant.status === "Active" ? (
              <PowerOff className="h-4 w-4" />
            ) : (
              <Power className="h-4 w-4" />
            )}

            {isUpdatingStatus
              ? "Updating..."
              : tenant.status === "Active"
                ? "Deactivate"
                : "Activate"}
          </button>
        </div>
      </div>

      {/* Status */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Tenant Status</p>

            <p className="mt-1 text-sm text-slate-600">
              Current status of this tenant.
            </p>
          </div>

          <span
            className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold ${
              tenant.status === "Active"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {tenant.status}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Users */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Users</p>

            <div className="rounded-lg bg-indigo-50 p-2">
              <Users className="h-5 w-5 text-indigo-600" />
            </div>
          </div>

          <p className="mt-4 text-2xl font-bold text-slate-900">
            {tenant.users.toLocaleString()}
          </p>
        </div>

        {/* Organizations */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Organizations</p>

            <div className="rounded-lg bg-indigo-50 p-2">
              <Network className="h-5 w-5 text-indigo-600" />
            </div>
          </div>

          <p className="mt-4 text-2xl font-bold text-slate-900">
            {tenant.organizations.toLocaleString()}
          </p>
        </div>

        {/* Plan */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Plan</p>

            <div className="rounded-lg bg-indigo-50 p-2">
              <Building2 className="h-5 w-5 text-indigo-600" />
            </div>
          </div>

          <p className="mt-4 text-2xl font-bold text-slate-900">
            {tenant.plan}
          </p>
        </div>

        {/* Created */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Created</p>

            <div className="rounded-lg bg-indigo-50 p-2">
              <CalendarDays className="h-5 w-5 text-indigo-600" />
            </div>
          </div>

          <p className="mt-4 text-lg font-bold text-slate-900">
            {tenant.createdAt}
          </p>
        </div>
      </div>

      {/* Tenant Information */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Tenant Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Basic information and configuration.
          </p>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">Tenant Name</p>

            <p className="mt-1 font-medium text-slate-900">{tenant.name}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Tenant Code</p>

            <p className="mt-1 font-medium text-slate-900">{tenant.code}</p>
          </div>

          <div className="flex items-start gap-3">
            <Globe className="mt-0.5 h-5 w-5 text-slate-400" />

            <div>
              <p className="text-sm text-slate-500">Domain</p>

              <p className="mt-1 font-medium text-slate-900">{tenant.domain}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-slate-500">Subscription Plan</p>

            <p className="mt-1 font-medium text-slate-900">{tenant.plan}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Created At</p>

            <p className="mt-1 font-medium text-slate-900">
              {tenant.createdAt}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Last Updated</p>

            <p className="mt-1 font-medium text-slate-900">
              {tenant.updatedAt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
