import type { SecuritySetting } from "../../types/security";
import SecurityStatusBadge from "./SecurityStatusBadge";

interface Props {
  setting: SecuritySetting;
  onToggle: (id: string, enabled: boolean) => void;
  loading?: boolean;
}

export default function SecuritySettingRow({
  setting,
  onToggle,
  loading = false,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-gray-100 py-4 last:border-0">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-gray-900">{setting.name}</h4>

          <SecurityStatusBadge
            status={setting.enabled ? "secure" : "warning"}
          />
        </div>

        <p className="mt-1 text-sm text-gray-500">{setting.description}</p>
      </div>

      <button
        type="button"
        disabled={loading}
        onClick={() => onToggle(setting.id, !setting.enabled)}
        className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition ${
          setting.enabled ? "bg-gray-900" : "bg-gray-300"
        } disabled:opacity-50`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
            setting.enabled ? "translate-x-5" : "translate-x-0.5"
          } mt-0.5`}
        />
      </button>
    </div>
  );
}
