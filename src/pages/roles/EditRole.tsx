import { ArrowLeft, Save } from "lucide-react";

import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useRole, useUpdateRole } from "../../hooks/useRoles";

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

export default function EditRole() {
  const navigate = useNavigate();

  const { id } = useParams<{
    id: string;
  }>();

  const roleId = Number(id);

  const roleQuery = useRole(roleId);

  const updateRole = useUpdateRole();

  const role = roleQuery.data;

  const initialForm: RoleFormData = {
    name: role?.name ?? "",
    code: role?.code ?? "",
    description: role?.description ?? "",
    status: role?.status ?? "Active",
    permissions: role?.permissions ?? [],
  };

  const [form, setForm] = useState<RoleFormData | null>(null);

  const formData = form ?? initialForm;

  const [error, setError] = useState("");

  const updateField = (field: keyof RoleFormData, value: string) => {
    setForm((current) => ({
      ...(current ?? initialForm),
      [field]: value,
    }));
  };

  const togglePermission = (permission: Permission) => {
    setForm((current) => {
      const currentForm = current ?? initialForm;

      return {
        ...currentForm,
        permissions: currentForm.permissions.includes(permission)
          ? currentForm.permissions.filter((item) => item !== permission)
          : [...currentForm.permissions, permission],
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!role) return;

    if (
      !formData.name.trim() ||
      !formData.code.trim() ||
      !formData.description.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      await updateRole.mutateAsync({
        id: role.id,
        data: {
          name: formData.name.trim(),
          code: formData.code.trim().toUpperCase(),
          description: formData.description.trim(),
          status: formData.status,
          permissions: formData.permissions,
        },
      });

      navigate(`/roles/${role.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update role.");
    }
  };

  if (roleQuery.isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      </div>
    );
  }

  if (roleQuery.isError || !role) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
        Role not found.
      </div>
    );
  }

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
        <h1 className="text-2xl font-bold text-slate-900">Edit Role</h1>

        <p className="mt-1 text-sm text-slate-500">
          Update role information and permissions.
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
                value={formData.name}
                onChange={(event) => updateField("name", event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Role Code *
              </label>

              <input
                value={formData.code}
                onChange={(event) => updateField("code", event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm uppercase outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Description *
              </label>

              <textarea
                rows={4}
                value={formData.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Status
              </label>

              <select
                value={formData.status}
                onChange={(event) => updateField("status", event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="Active">Active</option>

                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Permissions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage permissions for this role.
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {formData.permissions.length} selected
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {permissions.map((permission) => {
              const selected = formData.permissions.includes(permission);

              return (
                <label
                  key={permission}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 ${
                    selected ? "border-blue-300 bg-blue-50" : "border-slate-200"
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
            onClick={() => navigate(`/roles/${role.id}`)}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={updateRole.isPending}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Save size={17} />

            {updateRole.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
