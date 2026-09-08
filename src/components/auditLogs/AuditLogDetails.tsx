import type { AuditLog } from "../../types/auditLog";

import AuditLogStatusBadge from "./AuditLogStatusBadge";
import AuditLogActionBadge from "./AuditLogActionBadge";

interface Props {
  log: AuditLog;
  onClose: () => void;
}

export default function AuditLogDetails({ log, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Audit Log Details
            </h2>

            <p className="text-xs text-gray-500">{log.id}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-gray-500">User</p>

              <p className="mt-1 font-medium text-gray-900">{log.userName}</p>

              <p className="text-sm text-gray-500">{log.userEmail}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Timestamp</p>

              <p className="mt-1 text-sm text-gray-900">
                {new Date(log.timestamp).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Action</p>

              <div className="mt-1">
                <AuditLogActionBadge action={log.action} />
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500">Status</p>

              <div className="mt-1">
                <AuditLogStatusBadge status={log.status} />
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500">Resource</p>

              <p className="mt-1 text-sm text-gray-900">{log.resource}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Resource ID</p>

              <p className="mt-1 font-mono text-sm text-gray-900">
                {log.resourceId}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">IP Address</p>

              <p className="mt-1 font-mono text-sm text-gray-900">
                {log.ipAddress}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Location</p>

              <p className="mt-1 text-sm text-gray-900">{log.location}</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500">Description</p>

            <div className="mt-2 rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
              {log.description}
            </div>
          </div>

          {log.changes && (
            <div>
              <p className="mb-2 text-sm font-semibold text-gray-900">
                Changes
              </p>

              <pre className="overflow-x-auto rounded-lg bg-gray-950 p-4 text-xs text-gray-100">
                {JSON.stringify(log.changes, null, 2)}
              </pre>
            </div>
          )}

          {log.metadata && (
            <div>
              <p className="mb-2 text-sm font-semibold text-gray-900">
                Metadata
              </p>

              <pre className="overflow-x-auto rounded-lg bg-gray-950 p-4 text-xs text-gray-100">
                {JSON.stringify(log.metadata, null, 2)}
              </pre>
            </div>
          )}

          <div>
            <p className="text-xs text-gray-500">User Agent</p>

            <p className="mt-1 rounded-lg bg-gray-50 p-3 font-mono text-xs text-gray-600">
              {log.userAgent}
            </p>
          </div>
        </div>

        <div className="flex justify-end border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
