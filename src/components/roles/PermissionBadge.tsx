import type { Permission } from "../../types/role";

interface PermissionBadgeProps {
  permission: Permission;
}

export default function PermissionBadge({ permission }: PermissionBadgeProps) {
  return (
    <span className="inline-flex rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
      {permission}
    </span>
  );
}
