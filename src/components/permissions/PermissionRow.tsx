import { Eye, Pencil, Power, Trash2 } from "lucide-react";

import type { Permission } from "../../types/permission";

import PermissionStatusBadge from "./PermissionStatusBadge";

interface PermissionRowProps {
  permission: Permission;
  onView: (permission: Permission) => void;
  onEdit: (permission: Permission) => void;
  onToggle: (permission: Permission) => void;
  onDelete: (permission: Permission) => void;
}

export default function PermissionRow({
  permission,
  onView,
  onEdit,
  onToggle,
  onDelete,
}: PermissionRowProps) {
  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50">
      <td className="px-6 py-4">
        <div>
          <p className="font-semibold text-slate-900">{permission.name}</p>

          <p className="mt-1 font-mono text-xs text-slate-500">
            {permission.code}
          </p>
        </div>
      </td>

      <td className="px-6 py-4">
        <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
          {permission.module}
        </span>
      </td>

      <td className="px-6 py-4">
        <span className="rounded-lg bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
          {permission.action}
        </span>
      </td>

      <td className="px-6 py-4 text-sm text-slate-600">{permission.roles}</td>

      <td className="px-6 py-4">
        <PermissionStatusBadge status={permission.status} />
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-1">
          <button
            type="button"
            title="View"
            onClick={() => onView(permission)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <Eye size={17} />
          </button>

          <button
            type="button"
            title="Edit"
            onClick={() => onEdit(permission)}
            className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
          >
            <Pencil size={17} />
          </button>

          <button
            type="button"
            title={permission.status === "Active" ? "Deactivate" : "Activate"}
            onClick={() => onToggle(permission)}
            className="rounded-lg p-2 text-slate-500 hover:bg-amber-50 hover:text-amber-600"
          >
            <Power size={17} />
          </button>

          <button
            type="button"
            title="Delete"
            onClick={() => onDelete(permission)}
            className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </td>
    </tr>
  );
}
