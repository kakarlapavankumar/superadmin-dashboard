import type { AuditLogStatus } from "../../types/auditLog";

interface Props {
  status: AuditLogStatus;
}

export default function AuditLogStatusBadge({ status }: Props) {
  const className =
    status === "success"
      ? "bg-green-50 text-green-700 border-green-200"
      : "bg-red-50 text-red-700 border-red-200";

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${className}`}
    >
      {status === "success" ? "Success" : "Failed"}
    </span>
  );
}
