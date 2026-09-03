import { Eye, Pencil, Power, Trash2 } from "lucide-react";

import { useNavigate } from "react-router-dom";

import FeatureStatusBadge from "./FeatureStatusBadge";

import type { Feature } from "../../types/feature";

interface FeatureRowProps {
  feature: Feature;
  onToggle: (feature: Feature) => void;
  onDelete: (feature: Feature) => void;
  isUpdating?: boolean;
}

export default function FeatureRow({
  feature,
  onToggle,
  onDelete,
  isUpdating = false,
}: FeatureRowProps) {
  const navigate = useNavigate();

  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50">
      <td className="px-5 py-4">
        <div>
          <p className="font-semibold text-slate-800">{feature.name}</p>

          <p className="mt-1 text-xs text-slate-400">ID: {feature.id}</p>
        </div>
      </td>

      <td className="px-5 py-4">
        <code className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700">
          {feature.key}
        </code>
      </td>

      <td className="max-w-xs px-5 py-4">
        <p className="truncate text-sm text-slate-500">{feature.description}</p>
      </td>

      <td className="px-5 py-4">
        <FeatureStatusBadge status={feature.status} />
      </td>

      <td className="px-5 py-4 text-sm font-medium text-slate-700">
        {feature.tenantCount}
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-1">
          <button
            type="button"
            title="View"
            onClick={() => navigate(`/features/${feature.id}`)}
            className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
          >
            <Eye className="h-4 w-4" />
          </button>

          <button
            type="button"
            title="Edit"
            onClick={() => navigate(`/features/${feature.id}/edit`)}
            className="rounded-lg p-2 text-slate-500 hover:bg-amber-50 hover:text-amber-600"
          >
            <Pencil className="h-4 w-4" />
          </button>

          <button
            type="button"
            title={feature.status === "Active" ? "Deactivate" : "Activate"}
            disabled={isUpdating}
            onClick={() => onToggle(feature)}
            className="rounded-lg p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-50"
          >
            <Power className="h-4 w-4" />
          </button>

          <button
            type="button"
            title="Delete"
            onClick={() => onDelete(feature)}
            className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
