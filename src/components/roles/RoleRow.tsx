import { Eye, Pencil, Power, Trash2 } from "lucide-react";

import type { Role } from "../../types/role";

import RoleStatusBadge from "./RoleStatusBadge";

interface RoleRowProps {
  role: Role;
  onView: (role: Role) => void;
  onEdit: (role: Role) => void;
  onToggle: (role: Role) => void;
  onDelete: (role: Role) => void;
}

export default function RoleRow({
  role,
  onView,
  onEdit,
  onToggle,
  onDelete,
}: RoleRowProps) {
  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50">
      <td className="px-6 py-4">
        <div>
          <p className="font-semibold text-slate-900">{role.name}</p>

          <p className="mt-1 text-xs text-slate-500">{role.code}</p>
        </div>
      </td>

      <td className="px-6 py-4">
        <p className="max-w-sm text-sm text-slate-600">{role.description}</p>
      </td>

      <td className="px-6 py-4">
        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
          {role.permissions.length} permissions
        </span>
      </td>

      <td className="px-6 py-4 text-sm font-medium text-slate-700">
        {role.users}
      </td>

      <td className="px-6 py-4">
        <RoleStatusBadge status={role.status} />
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onView(role)}
            title="View"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <Eye size={17} />
          </button>

          <button
            type="button"
            onClick={() => onEdit(role)}
            title="Edit"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
          >
            <Pencil size={17} />
          </button>

          <button
            type="button"
            onClick={() => onToggle(role)}
            title={role.status === "Active" ? "Deactivate" : "Activate"}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-amber-50 hover:text-amber-600"
          >
            <Power size={17} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(role)}
            title="Delete"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </td>
    </tr>
  );
}
