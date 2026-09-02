import { Eye, Pencil, Power, Trash2 } from "lucide-react";

import type { User } from "../../types/user";

import UserStatusBadge from "./UserStatusBadge";
import UserRoleBadge from "./UserRoleBadge";

interface UserRowProps {
  user: User;

  onView: (id: number) => void;

  onEdit: (id: number) => void;

  onToggleStatus: (user: User) => void;

  onDelete: (id: number) => void;
}

const UserRow = ({
  user,
  onView,
  onEdit,
  onToggleStatus,
  onDelete,
}: UserRowProps) => {
  const initials = `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`;

  return (
    <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
            {initials}
          </div>

          <div>
            <p className="font-medium text-slate-900">
              {user.firstName} {user.lastName}
            </p>

            <p className="text-xs text-slate-500">{user.email}</p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <UserRoleBadge role={user.role} />
      </td>

      <td className="px-5 py-4 text-sm text-slate-600">{user.tenantName}</td>

      <td className="px-5 py-4 text-sm text-slate-600">
        {user.organizationName}
      </td>

      <td className="px-5 py-4">
        <UserStatusBadge status={user.status} />
      </td>

      <td className="px-5 py-4 text-right">
        <div className="flex justify-end gap-1">
          <button
            type="button"
            title="View"
            onClick={() => onView(user.id)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <Eye className="h-4 w-4" />
          </button>

          <button
            type="button"
            title="Edit"
            onClick={() => onEdit(user.id)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <Pencil className="h-4 w-4" />
          </button>

          <button
            type="button"
            title={user.status === "Active" ? "Deactivate" : "Activate"}
            onClick={() => onToggleStatus(user)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <Power className="h-4 w-4" />
          </button>

          <button
            type="button"
            title="Delete"
            onClick={() => onDelete(user.id)}
            className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
