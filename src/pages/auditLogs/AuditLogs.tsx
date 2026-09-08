import { useState } from "react";

import PageHeader from "../../components/PageHeader";
import BackToDashboard from "../../components/BackToDashboard";
import Spinner from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";

import AuditLogFilters from "../../components/auditLogs/AuditLogFilters";
import AuditLogRow from "../../components/auditLogs/AuditLogRow";
import AuditLogDetails from "../../components/auditLogs/AuditLogDetails";

import { useAuditLogs } from "../../hooks/useAuditLogs";

import type { AuditLog } from "../../types/auditLog";
import type { AuditLogFilters as Filters } from "../../api/auditLogApi";

export default function AuditLogs() {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    action: "all",
    resource: "all",
    status: "all",
  });

  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const { data, isLoading, isError } = useAuditLogs(filters);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <ErrorMessage message="Failed to load audit logs." />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Audit Logs"
        description="Track administrative activity and changes across the platform."
      />

      <BackToDashboard />

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Events</p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {data?.total ?? 0}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Successful</p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {data?.data.filter((log) => log.status === "success").length}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Failed</p>

          <p className="mt-2 text-3xl font-bold text-red-600">
            {data?.data.filter((log) => log.status === "failed").length}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Users</p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {new Set(data?.data.map((log) => log.userId)).size}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h2 className="font-semibold text-gray-900">Filter Audit Logs</h2>

          <p className="mt-1 text-sm text-gray-500">
            Search and filter administrative activity.
          </p>
        </div>

        <AuditLogFilters filters={filters} onChange={setFilters} />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <h2 className="font-semibold text-gray-900">Activity Logs</h2>

            <p className="text-sm text-gray-500">
              {data?.total ?? 0} events found
            </p>
          </div>
        </div>

        {data?.data.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
                  <th className="px-4 py-3">Timestamp</th>

                  <th className="px-4 py-3">User</th>

                  <th className="px-4 py-3">Action</th>

                  <th className="px-4 py-3">Resource</th>

                  <th className="px-4 py-3">IP Address</th>

                  <th className="px-4 py-3">Status</th>

                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {data.data.map((log) => (
                  <AuditLogRow key={log.id} log={log} onView={setSelectedLog} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="text-4xl">📋</div>

            <h3 className="mt-3 font-semibold text-gray-900">
              No audit logs found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </div>

      {selectedLog && (
        <AuditLogDetails
          log={selectedLog}
          onClose={() => setSelectedLog(null)}
        />
      )}
    </div>
  );
}
