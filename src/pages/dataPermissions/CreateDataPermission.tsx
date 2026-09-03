import { ArrowLeft, Save } from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCreateDataPermission } from "../../hooks/useDataPermissions";

import type {
  DataPermissionStatus,
  DataResource,
  DataScope,
  DataAccessLevel,
} from "../../types/dataPermission";

export default function CreateDataPermission() {
  const navigate = useNavigate();

  const createMutation = useCreateDataPermission();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [resource, setResource] = useState<DataResource>("Tenants");
  const [scope, setScope] = useState<DataScope>("Tenant");
  const [accessLevel, setAccessLevel] = useState<DataAccessLevel>("Read");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<DataPermissionStatus>("Active");
  const [assignedRoles, setAssignedRoles] = useState(0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createMutation.mutate(
      {
        name: name.trim(),
        code: code.trim(),
        resource,
        scope,
        accessLevel,
        description: description.trim(),
        status,
        assignedRoles,
      },
      {
        onSuccess: () => {
          navigate("/data-permissions");
        },
      },
    );
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/data-permissions")}
          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Create Data Permission
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create a new data access rule.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Permission Name
            </label>

            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Tenant Level Access"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Permission Code
            </label>

            <input
              required
              value={code}
              onChange={(event) => setCode(event.target.value.toUpperCase())}
              placeholder="TENANT_DATA_TENANT"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm uppercase outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Resource
            </label>

            <select
              value={resource}
              onChange={(event) =>
                setResource(event.target.value as DataResource)
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="Tenants">Tenants</option>
              <option value="Organizations">Organizations</option>
              <option value="Users">Users</option>
              <option value="Roles">Roles</option>
              <option value="Permissions">Permissions</option>
              <option value="Reports">Reports</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Scope
            </label>

            <select
              value={scope}
              onChange={(event) => setScope(event.target.value as DataScope)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="Global">Global</option>
              <option value="Tenant">Tenant</option>
              <option value="Organization">Organization</option>
              <option value="Own">Own</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Access Level
            </label>

            <select
              value={accessLevel}
              onChange={(event) =>
                setAccessLevel(event.target.value as DataAccessLevel)
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="Read">Read</option>

              <option value="ReadWrite">Read & Write</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status
            </label>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as DataPermissionStatus)
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="Active">Active</option>

              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Assigned Roles
            </label>

            <input
              type="number"
              min="0"
              value={assignedRoles}
              onChange={(event) => setAssignedRoles(Number(event.target.value))}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              required
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe what this data permission allows..."
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {createMutation.isError && (
          <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
            {createMutation.error instanceof Error
              ? createMutation.error.message
              : "Failed to create data permission."}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5">
          <button
            type="button"
            onClick={() => navigate("/data-permissions")}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={createMutation.isPending}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={17} />

            {createMutation.isPending ? "Creating..." : "Create Permission"}
          </button>
        </div>
      </form>
    </div>
  );
}
