import { ArrowLeft, Save } from "lucide-react";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useCreatePermission } from "../../hooks/usePermissions";

import type { PermissionFormData } from "../../types/permission";

const initialForm: PermissionFormData = {
  name: "",
  code: "",
  description: "",
  module: "Dashboard",
  action: "View",
  status: "Active",
};

export default function CreatePermission() {
  const navigate = useNavigate();

  const createPermission = useCreatePermission();

  const [form, setForm] = useState<PermissionFormData>(initialForm);

  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.name.trim() || !form.code.trim() || !form.description.trim()) {
      setError("Please fill in all required fields.");

      return;
    }

    try {
      await createPermission.mutateAsync({
        name: form.name.trim(),
        code: form.code.trim().toLowerCase(),
        description: form.description.trim(),
        module: form.module,
        action: form.action,
        status: form.status,
      });

      navigate("/permissions");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create permission.",
      );
    }
  };

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
        <h1 className="text-2xl font-bold text-slate-900">Create Permission</h1>

        <p className="mt-1 text-sm text-slate-500">
          Define a new permission for the platform.
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
              value={form.name}
              onChange={(event) =>
                setForm({
                  ...form,
                  name: event.target.value,
                })
              }
              placeholder="e.g. View Reports"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Permission Code *
            </label>

            <input
              value={form.code}
              onChange={(event) =>
                setForm({
                  ...form,
                  code: event.target.value,
                })
              }
              placeholder="reports.view"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 font-mono text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Module
            </label>

            <select
              value={form.module}
              onChange={(event) =>
                setForm({
                  ...form,
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
              value={form.action}
              onChange={(event) =>
                setForm({
                  ...form,
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
              value={form.status}
              onChange={(event) =>
                setForm({
                  ...form,
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
              value={form.description}
              onChange={(event) =>
                setForm({
                  ...form,
                  description: event.target.value,
                })
              }
              placeholder="Describe what this permission allows..."
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
            onClick={() => navigate("/permissions")}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={createPermission.isPending}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Save size={17} />

            {createPermission.isPending ? "Creating..." : "Create Permission"}
          </button>
        </div>
      </form>
    </div>
  );
}
