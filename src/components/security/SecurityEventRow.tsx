import type { SecurityEvent } from "../../types/security";
import SecurityStatusBadge from "./SecurityStatusBadge";

interface Props {
  event: SecurityEvent;
  onResolve: (id: string) => void;
  loading?: boolean;
}

export default function SecurityEventRow({ event, onResolve, loading }: Props) {
  return (
    <div className="flex flex-col gap-3 border-b border-gray-100 py-4 last:border-0 md:flex-row md:items-center md:justify-between">
      <div className="flex gap-3">
        <div className="mt-1 h-2.5 w-2.5 rounded-full bg-gray-400" />

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-medium text-gray-900">{event.title}</h4>

            <SecurityStatusBadge status={event.severity} />
          </div>

          <p className="mt-1 text-sm text-gray-500">{event.description}</p>

          <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-400">
            <span>{event.userName}</span>
            <span>{event.ipAddress}</span>
            <span>{event.location}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {event.resolved ? (
          <span className="text-xs font-medium text-green-600">Resolved</span>
        ) : (
          <button
            type="button"
            disabled={loading}
            onClick={() => onResolve(event.id)}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Resolve
          </button>
        )}
      </div>
    </div>
  );
}
