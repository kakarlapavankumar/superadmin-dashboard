import { ArrowLeft, Edit, ShieldCheck } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { useDataPermission } from "../../hooks/useDataPermissions";

interface DetailItemProps {
  label: string;
  value: string;
}

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}

export default function DataPermissionDetails() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const permissionId = id ? Number(id) : undefined;

  const permissionQuery = useDataPermission(permissionId);

  if (!id || permissionId === undefined || !Number.isFinite(permissionId)) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-semibold text-red-800">
            Invalid Data Permission ID
          </h2>

          <p className="mt-1 text-sm text-red-600">
            The data permission ID is invalid.
          </p>

          <button
            type="button"
            onClick={() => navigate("/data-permissions")}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (permissionQuery.isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
          Loading data permission...
        </div>
      </div>
    );
  }

  if (permissionQuery.isError) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-semibold text-red-800">
            Failed to Load Data Permission
          </h2>

          <p className="mt-1 text-sm text-red-600">
            {permissionQuery.error instanceof Error
              ? permissionQuery.error.message
              : "Something went wrong."}
          </p>

          <button
            type="button"
            onClick={() => navigate("/data-permissions")}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  const permission = permissionQuery.data;

  if (!permission) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <ShieldCheck className="mx-auto h-12 w-12 text-slate-300" />

          <h2 className="mt-4 text-lg font-semibold text-slate-900">
            Data Permission Not Found
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            No data permission exists with ID #{permissionId}.
          </p>

          <button
            type="button"
            onClick={() => navigate("/data-permissions")}
            className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Back to Data Permissions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}

        <div className="mb-6">
          <button
            type="button"
            onClick={() => navigate("/data-permissions")}
            className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Data Permissions
          </button>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-3">
                <ShieldCheck className="h-6 w-6 text-blue-600" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {permission.name}
                </h1>

                <p className="mt-1 font-mono text-sm text-slate-500">
                  {permission.code}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate(`/data-permissions/${permission.id}/edit`)
              }
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Edit className="h-4 w-4" />
              Edit Permission
            </button>
          </div>
        </div>

        {/* Status */}

        <div className="mb-6">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
              permission.status === "Active"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {permission.status}
          </span>
        </div>

        {/* Access Configuration */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="mb-6 text-lg font-semibold text-slate-900">
              Access Configuration
            </h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <DetailItem label="Resource" value={permission.resource} />

              <DetailItem label="Data Scope" value={permission.scope} />

              <DetailItem label="Access Level" value={permission.accessLevel} />

              <DetailItem
                label="Assigned Roles"
                value={String(permission.assignedRoles)}
              />

              <DetailItem label="Permission ID" value={`#${permission.id}`} />

              <DetailItem label="Status" value={permission.status} />
            </div>
          </div>

          {/* Summary */}

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-slate-900">
              Summary
            </h2>

            <div className="space-y-5">
              <DetailItem label="Resource" value={permission.resource} />

              <DetailItem label="Scope" value={permission.scope} />

              <DetailItem label="Access" value={permission.accessLevel} />

              <DetailItem
                label="Roles"
                value={String(permission.assignedRoles)}
              />
            </div>
          </div>
        </div>

        {/* Description */}

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            Description
          </h2>

          <p className="text-sm leading-6 text-slate-600">
            {permission.description || "No description provided."}
          </p>
        </div>

        {/* Metadata */}

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-slate-900">
            Metadata
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <DetailItem label="Created At" value={permission.createdAt} />

            <DetailItem label="Last Updated" value={permission.updatedAt} />
          </div>
        </div>
      </div>
    </div>
  );
}
