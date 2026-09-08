import type { AuditLogAction } from "../../types/auditLog";

interface Props {
  action: AuditLogAction;
}

export default function AuditLogActionBadge({ action }: Props) {
  return (
    <span className="inline-flex rounded-md bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">
      {action.replaceAll("_", " ")}
    </span>
  );
}
