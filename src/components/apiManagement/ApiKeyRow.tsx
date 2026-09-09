import type { ApiKey } from "../../types/apiManagement";
import ApiStatusBadge from "./ApiStatusBadge";

interface ApiKeyRowProps {
  apiKey: ApiKey;
  onRevoke: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ApiKeyRow({
  apiKey,
  onRevoke,
  onDelete,
}: ApiKeyRowProps) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-4 py-4">
        <div>
          <p className="font-medium text-gray-900">{apiKey.name}</p>

          <p className="mt-1 font-mono text-xs text-gray-500">
            {apiKey.keyPrefix}••••••••
          </p>
        </div>
      </td>

      <td className="px-4 py-4">
        <ApiStatusBadge environment={apiKey.environment} />
      </td>

      <td className="px-4 py-4">
        <ApiStatusBadge status={apiKey.status} />
      </td>

      <td className="px-4 py-4">
        <div>
          <p className="text-sm font-medium text-gray-900">{apiKey.owner}</p>

          <p className="text-xs text-gray-500">{apiKey.ownerEmail}</p>
        </div>
      </td>

      <td className="px-4 py-4 text-sm text-gray-600">
        {apiKey.requestCount.toLocaleString()}
      </td>

      <td className="px-4 py-4 text-sm text-gray-600">
        {apiKey.lastUsedAt
          ? new Date(apiKey.lastUsedAt).toLocaleString()
          : "Never"}
      </td>

      <td className="px-4 py-4">
        <div className="flex gap-2">
          {apiKey.status === "active" && (
            <button
              type="button"
              onClick={() => onRevoke(apiKey.id)}
              className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
            >
              Revoke
            </button>
          )}

          <button
            type="button"
            onClick={() => onDelete(apiKey.id)}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
