import type { PermissionStatus } from "../../types/permission";

interface PermissionStatusBadgeProps {
  status: PermissionStatus;
}

export default function PermissionStatusBadge({
  status,
}: PermissionStatusBadgeProps) {
  const active = status === "Active";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
        active
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-600"
      }`}
    >
      <span
        className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
          active ? "bg-emerald-500" : "bg-slate-400"
        }`}
      />

      {status}
    </span>
  );
}
