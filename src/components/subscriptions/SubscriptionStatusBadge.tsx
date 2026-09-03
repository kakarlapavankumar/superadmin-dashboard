import type { SubscriptionStatus } from "../../types/subscription";

export default function SubscriptionStatusBadge({
  status,
}: {
  status: SubscriptionStatus;
}) {
  const styles = {
    Active: "bg-emerald-100 text-emerald-700",
    Inactive: "bg-slate-100 text-slate-600",
    Trial: "bg-blue-100 text-blue-700",
    Expired: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}
