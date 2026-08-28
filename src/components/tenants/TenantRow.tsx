import { Link } from "react-router-dom";

import type { Tenant } from "../../types/tenant";

import TenantStatusBadge from "./TenantStatusBadge";

interface Props {
  tenant: Tenant;
  onActivate: (id: number) => void;
  onDeactivate: (id: number) => void;
}

export default function TenantRow({ tenant, onActivate, onDeactivate }: Props) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-4">
        <div className="font-medium">{tenant.id}</div>
      </td>

      <td className="p-4">{tenant.adminName}</td>

      <td className="p-4">{tenant.subscription}</td>

      <td className="p-4">{tenant.users}</td>

      <td className="p-4">
        <TenantStatusBadge status={tenant.status} />
      </td>

      <td className="p-4">{tenant.createdAt}</td>

      <td className="p-4">
        <div className="flex gap-2">
          <Link to={`/tenants/${tenant.id}`} className="text-blue-600">
            View
          </Link>

          {tenant.status === "Active" ? (
            <button
              onClick={() => onDeactivate(Number(tenant.id))}
              className="text-red-600"
            >
              Deactivate
            </button>
          ) : (
            <button
              onClick={() => onActivate(Number(tenant.id))}
              className="text-green-600"
            >
              Activate
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
