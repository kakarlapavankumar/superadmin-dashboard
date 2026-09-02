import type { UserStatus } from "../../types/user";

interface UserStatusBadgeProps {
  status: UserStatus;
}

const UserStatusBadge = ({ status }: UserStatusBadgeProps) => {
  const active = status === "Active";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
        active
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
};

export default UserStatusBadge;
