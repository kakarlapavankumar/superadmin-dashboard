import { CheckCircle2, XCircle } from "lucide-react";

import type { FeatureStatus } from "../../types/feature";

interface FeatureStatusBadgeProps {
  status: FeatureStatus;
}

export default function FeatureStatusBadge({
  status,
}: FeatureStatusBadgeProps) {
  const isActive = status === "Active";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        isActive
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-600"
      }`}
    >
      {isActive ? (
        <CheckCircle2 className="h-3.5 w-3.5" />
      ) : (
        <XCircle className="h-3.5 w-3.5" />
      )}

      {status}
    </span>
  );
}
