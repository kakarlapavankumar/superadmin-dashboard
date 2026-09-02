import { ArrowLeft, Save } from "lucide-react";

import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { usePermission, useUpdatePermission } from "../../hooks/usePermissions";

import type { PermissionFormData } from "../../types/permission";

export default function EditPermission() {
  const navigate = useNavigate();

  const { id } = useParams<{
    id: string;
  }>();

  const permissionId = Number(id);

  const permissionQuery = usePermission(permissionId);

  const updatePermission = useUpdatePermission();

  const permission = permissionQuery.data;

  const initialForm: PermissionFormData = {
    name: permission?.name ?? "",
    code: permission?.code ?? "",
    description: permission?.description ?? "",
    module: permission?.module ?? "Dashboard",
    action: permission?.action ?? "View",
    status: permission?.status ?? "Active",
  };

  const [form, setForm] = useState<PermissionFormData | null>(null);

  const formData = form ?? initialForm;

  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!permission) {
      return;
    }

    if (
      !formData.name.trim() ||
      !formData.code.trim() ||
      !formData.description.trim()
    ) {
      setError("Please fill in all required fields.");

      return;
    }

    try {
      await updatePermission.mutateAsync({
        id: permission.id,
        data: {
          name: formData.name.trim(),
          code: formData.code.trim().toLowerCase(),
          description: formData.description.trim(),
          module: formData.module,
          action: formData.action,
          status: formData.status,
        },
      });

      navigate(`/permissions/${permission.id}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update permission.",
      );
    }
  };

  if (permissionQuery.isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      </div>
    );
  }

  if (permissionQuery.isError || !permission) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
        Permission not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <button
        type="button"
        onClick={() => navigate("/permissions")}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft size={17} />
        Back to Permissions
      </button>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Edit Permission</h1>

        <p className="mt-1 text-sm text-slate-500">
          Update permission information.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Permission Name *
            </label>

            <input
              value={formData.name}
              onChange={(event) =>
                setForm({
                  ...formData,
                  name: event.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Permission Code *
            </label>

            <input
              value={formData.code}
              onChange={(event) =>
                setForm({
                  ...formData,
                  code: event.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 font-mono text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Module
            </label>

            <select
              value={formData.module}
              onChange={(event) =>
                setForm({
                  ...formData,
                  module: event.target.value as PermissionFormData["module"],
                })
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="Dashboard">Dashboard</option>

              <option value="Tenants">Tenants</option>

              <option value="Organizations">Organizations</option>

              <option value="Users">Users</option>

              <option value="Roles">Roles</option>

              <option value="Permissions">Permissions</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Action
            </label>

            <select
              value={formData.action}
              onChange={(event) =>
                setForm({
                  ...formData,
                  action: event.target.value as PermissionFormData["action"],
                })
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="View">View</option>

              <option value="Create">Create</option>

              <option value="Edit">Edit</option>

              <option value="Delete">Delete</option>

              <option value="Manage">Manage</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status
            </label>

            <select
              value={formData.status}
              onChange={(event) =>
                setForm({
                  ...formData,
                  status: event.target.value as PermissionFormData["status"],
                })
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="Active">Active</option>

              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Description *
            </label>

            <textarea
              rows={5}
              value={formData.description}
              onChange={(event) =>
                setForm({
                  ...formData,
                  description: event.target.value,
                })
              }
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(`/permissions/${permission.id}`)}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={updatePermission.isPending}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Save size={17} />

            {updatePermission.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
