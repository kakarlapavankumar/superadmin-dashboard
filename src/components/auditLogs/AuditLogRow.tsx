import type { AuditLog } from "../../types/auditLog";

import AuditLogActionBadge from "./AuditLogActionBadge";
import AuditLogStatusBadge from "./AuditLogStatusBadge";

interface Props {
  log: AuditLog;
  onView: (log: AuditLog) => void;
}

export default function AuditLogRow({ log, onView }: Props) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="whitespace-nowrap px-4 py-4">
        <div className="text-sm font-medium text-gray-900">
          {new Date(log.timestamp).toLocaleDateString()}
        </div>

        <div className="text-xs text-gray-500">
          {new Date(log.timestamp).toLocaleTimeString()}
        </div>
      </td>

      <td className="px-4 py-4">
        <div className="font-medium text-gray-900">{log.userName}</div>

        <div className="text-xs text-gray-500">{log.userEmail}</div>
      </td>

      <td className="px-4 py-4">
        <AuditLogActionBadge action={log.action} />
      </td>

      <td className="px-4 py-4">
        <div className="text-sm text-gray-900">{log.resource}</div>

        <div className="font-mono text-xs text-gray-500">{log.resourceId}</div>
      </td>

      <td className="px-4 py-4 text-sm text-gray-600">{log.ipAddress}</td>

      <td className="px-4 py-4">
        <AuditLogStatusBadge status={log.status} />
      </td>

      <td className="px-4 py-4">
        <button
          type="button"
          onClick={() => onView(log)}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
        >
          View
        </button>
      </td>
    </tr>
  );
}
