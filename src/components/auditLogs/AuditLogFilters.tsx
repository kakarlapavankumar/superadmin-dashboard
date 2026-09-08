import type { AuditLogFilters } from "../../api/auditLogApi";

interface Props {
  filters: AuditLogFilters;
  onChange: (filters: AuditLogFilters) => void;
}

export default function AuditLogFilters({ filters, onChange }: Props) {
  const update = (key: keyof AuditLogFilters, value: string) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-600">
          Search
        </label>

        <input
          value={filters.search ?? ""}
          onChange={(e) => update("search", e.target.value)}
          placeholder="User, ID, IP address..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-gray-600">
          Action
        </label>

        <select
          value={filters.action ?? "all"}
          onChange={(e) => update("action", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
        >
          <option value="all">All actions</option>
          <option value="CREATE">Create</option>
          <option value="UPDATE">Update</option>
          <option value="DELETE">Delete</option>
          <option value="LOGIN">Login</option>
          <option value="LOGOUT">Logout</option>
          <option value="ACTIVATE">Activate</option>
          <option value="DEACTIVATE">Deactivate</option>
          <option value="EXPORT">Export</option>
          <option value="VIEW">View</option>
          <option value="RESET_PASSWORD">Reset Password</option>
          <option value="CHANGE_PERMISSION">Change Permission</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-gray-600">
          Resource
        </label>

        <select
          value={filters.resource ?? "all"}
          onChange={(e) => update("resource", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
        >
          <option value="all">All resources</option>
          <option value="Tenant">Tenant</option>
          <option value="Organization">Organization</option>
          <option value="User">User</option>
          <option value="Role">Role</option>
          <option value="Permission">Permission</option>
          <option value="Subscription">Subscription</option>
          <option value="API Key">API Key</option>
          <option value="Security">Security</option>
          <option value="Notification">Notification</option>
          <option value="Report">Report</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-gray-600">
          Status
        </label>

        <select
          value={filters.status ?? "all"}
          onChange={(e) => update("status", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
        >
          <option value="all">All statuses</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
        </select>
      </div>
    </div>
  );
}
