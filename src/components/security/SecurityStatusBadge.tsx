import type {
  SecurityEventSeverity,
  SecurityStatus,
} from "../../types/security";

interface Props {
  status: SecurityStatus | SecurityEventSeverity;
}

export default function SecurityStatusBadge({ status }: Props) {
  const styles: Record<string, string> = {
    secure: "bg-green-50 text-green-700 border-green-200",
    low: "bg-green-50 text-green-700 border-green-200",

    warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
    medium: "bg-yellow-50 text-yellow-700 border-yellow-200",

    critical: "bg-red-50 text-red-700 border-red-200",
    high: "bg-orange-50 text-orange-700 border-orange-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${
        styles[status] ?? "bg-gray-50 text-gray-700 border-gray-200"
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
