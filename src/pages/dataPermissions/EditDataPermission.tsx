import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import {
  useDataPermission,
  useUpdateDataPermission,
} from "../../hooks/useDataPermissions";
import type {
  DataAccessLevel,
  DataPermission,
  DataPermissionStatus,
  DataResource,
  DataScope,
} from "../../types/dataPermission";

interface EditDataPermissionFormProps {
  permission: DataPermission;
}

function EditDataPermissionForm({ permission }: EditDataPermissionFormProps) {
  const navigate = useNavigate();
  const updateMutation = useUpdateDataPermission();

  const [name, setName] = useState(permission.name);
  const [code, setCode] = useState(permission.code);
  const [resource, setResource] = useState<DataResource>(permission.resource);
  const [scope, setScope] = useState<DataScope>(permission.scope);
  const [accessLevel, setAccessLevel] = useState<DataAccessLevel>(
    permission.accessLevel,
  );
  const [status, setStatus] = useState<DataPermissionStatus>(permission.status);
  const [description, setDescription] = useState(permission.description);

  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Permission name is required.");
      return;
    }

    if (!code.trim()) {
      setError("Permission code is required.");
      return;
    }

    if (!description.trim()) {
      setError("Description is required.");
      return;
    }

    updateMutation.mutate(
      {
        id: permission.id,
        data: {
          name: name.trim(),
          code: code.trim().toUpperCase(),
          resource,
          scope,
          accessLevel,
          status,
          description: description.trim(),
        },
      },
      {
        onSuccess: () => {
          navigate(`/data-permissions/${permission.id}`);
        },
        onError: (mutationError) => {
          setError(
            mutationError instanceof Error
              ? mutationError.message
              : "Failed to update data permission.",
          );
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate(`/data-permissions/${permission.id}`)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Edit Data Permission
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Update the data permission configuration.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Name + Code */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Permission Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter permission name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Permission Code
              </label>

              <input
                type="text"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="Example: TENANT_READ"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm uppercase outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Resource + Scope */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Resource
              </label>

              <select
                value={resource}
                onChange={(event) =>
                  setResource(event.target.value as DataResource)
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Scope
              </label>

              <select
                value={scope}
                onChange={(event) => setScope(event.target.value as DataScope)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="Global">Global</option>
                <option value="Tenant">Tenant</option>
                <option value="Organization">Organization</option>
                <option value="Own">Own</option>
              </select>
            </div>
          </div>

          {/* Access Level + Status */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Access Level
              </label>

              <select
                value={accessLevel}
                onChange={(event) =>
                  setAccessLevel(event.target.value as DataAccessLevel)
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="Read">Read</option>
                <option value="ReadWrite">Read & Write</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Status
              </label>

              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as DataPermissionStatus)
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={5}
              placeholder="Enter permission description"
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-6">
            <button
              type="button"
              onClick={() => navigate(`/data-permissions/${permission.id}`)}
              className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={17} />

              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function EditDataPermission() {
  const { id } = useParams<{ id: string }>();

  const { data: permission, isLoading, isError, error } = useDataPermission(id);

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-sm text-gray-500">Loading data permission...</div>
      </div>
    );
  }

  if (isError || !permission) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-lg font-semibold text-red-800">
          Unable to load data permission
        </h2>

        <p className="mt-2 text-sm text-red-600">
          {error instanceof Error
            ? error.message
            : "Data permission not found."}
        </p>
      </div>
    );
  }

  return <EditDataPermissionForm key={permission.id} permission={permission} />;
}
