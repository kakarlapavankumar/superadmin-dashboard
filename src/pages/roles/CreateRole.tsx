import { ArrowLeft, Save } from "lucide-react";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useCreateRole } from "../../hooks/useRoles";

import type { Permission, RoleFormData } from "../../types/role";

const permissions: Permission[] = [
  "dashboard.view",
  "tenants.view",
  "tenants.create",
  "tenants.edit",
  "tenants.delete",
  "organizations.view",
  "organizations.create",
  "organizations.edit",
  "organizations.delete",
  "users.view",
  "users.create",
  "users.edit",
  "users.delete",
  "roles.view",
  "roles.create",
  "roles.edit",
  "roles.delete",
];

const initialForm: RoleFormData = {
  name: "",
  code: "",
  description: "",
  status: "Active",
  permissions: [],
};

export default function CreateRole() {
  const navigate = useNavigate();

  const createRole = useCreateRole();

  const [form, setForm] = useState<RoleFormData>(initialForm);

  const [error, setError] = useState("");

  const handleChange = (field: keyof RoleFormData, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const togglePermission = (permission: Permission) => {
    setForm((current) => ({
      ...current,
      permissions: current.permissions.includes(permission)
        ? current.permissions.filter((item) => item !== permission)
        : [...current.permissions, permission],
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.name.trim() || !form.code.trim() || !form.description.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      await createRole.mutateAsync({
        name: form.name.trim(),
        code: form.code.trim().toUpperCase(),
        description: form.description.trim(),
        status: form.status,
        permissions: form.permissions,
      });

      navigate("/roles");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create role.");
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <button
        type="button"
        onClick={() => navigate("/roles")}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft size={17} />
        Back to Roles
      </button>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Create Role</h1>

        <p className="mt-1 text-sm text-slate-500">
          Create a new platform role and assign permissions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Basic Information
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Role Name *
              </label>

              <input
                value={form.name}
                onChange={(event) => handleChange("name", event.target.value)}
                placeholder="e.g. Finance Manager"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Role Code *
              </label>

              <input
                value={form.code}
                onChange={(event) => handleChange("code", event.target.value)}
                placeholder="FINANCE_MANAGER"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm uppercase outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Description *
              </label>

              <textarea
                rows={4}
                value={form.description}
                onChange={(event) =>
                  handleChange("description", event.target.value)
                }
                placeholder="Describe what this role is responsible for..."
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Status
              </label>

              <select
                value={form.status}
                onChange={(event) => handleChange("status", event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="Active">Active</option>

                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Permissions */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Permissions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Select the permissions this role should have.
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {form.permissions.length} selected
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {permissions.map((permission) => {
              const selected = form.permissions.includes(permission);

              return (
                <label
                  key={permission}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                    selected
                      ? "border-blue-300 bg-blue-50"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => togglePermission(permission)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600"
                  />

                  <span className="text-sm text-slate-700">{permission}</span>
                </label>
              );
            })}
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/roles")}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={createRole.isPending}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Save size={17} />

            {createRole.isPending ? "Creating..." : "Create Role"}
          </button>
        </div>
      </form>
    </div>
  );
}
