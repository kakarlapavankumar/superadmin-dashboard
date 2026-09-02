import type { UserRole } from "../../types/user";

interface UserRoleBadgeProps {
  role: UserRole;
}

const UserRoleBadge = ({ role }: UserRoleBadgeProps) => {
  return (
    <span className="inline-flex rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
      {role}
    </span>
  );
};

export default UserRoleBadge;
