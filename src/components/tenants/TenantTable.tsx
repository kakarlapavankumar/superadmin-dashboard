import type { Tenant } from "../../types/tenant";
import TenantRow from "./TenantRow";

interface Props {
  tenants: Tenant[];

  onActivate: (id: number) => void;
  onDeactivate: (id: number) => void;
}

export default function TenantTable({
  tenants,
  onActivate,
  onDeactivate,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4">Tenant</th>
            <th className="p-4">Admin</th>
            <th className="p-4">Plan</th>
            <th className="p-4">Users</th>
            <th className="p-4">Status</th>
            <th className="p-4">Created</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tenants.map((tenant) => (
            <TenantRow
              key={tenant.id}
              tenant={tenant}
              onActivate={onActivate}
              onDeactivate={onDeactivate}
            />
          ))}
        </tbody>
      </table>

      {tenants.length === 0 && (
        <div className="p-10 text-center text-gray-500">No tenants found.</div>
      )}
    </div>
  );
}
