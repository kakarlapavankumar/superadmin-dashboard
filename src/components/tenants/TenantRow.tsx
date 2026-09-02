import { Eye, Pencil, Power, PowerOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { Tenant } from "../../types/tenant";

interface TenantRowProps {
  tenant: Tenant;
  onActivate: (id: number) => void;
  onDeactivate: (id: number) => void;
}

export default function TenantRow({
  tenant,
  onActivate,
  onDeactivate,
}: TenantRowProps) {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/tenants/${tenant.id}`);
  };

  const handleEdit = () => {
    navigate(`/tenants/${tenant.id}/edit`);
  };

  const handleStatusChange = () => {
    if (tenant.status === "Active") {
      onDeactivate(tenant.id);
    } else {
      onActivate(tenant.id);
    }
  };

  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50">
      {/* Tenant */}
      <td className="px-6 py-4">
        <div>
          <p className="font-semibold text-slate-900">{tenant.name}</p>

          <p className="mt-1 text-xs text-slate-500">{tenant.code}</p>
        </div>
      </td>

      {/* Domain */}
      <td className="px-6 py-4">
        <span className="text-sm text-slate-600">{tenant.domain}</span>
      </td>

      {/* Plan */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
            tenant.plan === "Enterprise"
              ? "bg-purple-100 text-purple-700"
              : tenant.plan === "Professional"
                ? "bg-blue-100 text-blue-700"
                : "bg-slate-100 text-slate-700"
          }`}
        >
          {tenant.plan}
        </span>
      </td>

      {/* Users */}
      <td className="px-6 py-4">
        <span className="text-sm font-medium text-slate-700">
          {tenant.users.toLocaleString()}
        </span>
      </td>

      {/* Organizations */}
      <td className="px-6 py-4">
        <span className="text-sm font-medium text-slate-700">
          {tenant.organizations.toLocaleString()}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
            tenant.status === "Active"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              tenant.status === "Active" ? "bg-emerald-500" : "bg-red-500"
            }`}
          />

          {tenant.status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {/* View */}
          <button
            type="button"
            onClick={handleView}
            title="View tenant"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600"
          >
            <Eye size={17} />
          </button>

          {/* Edit */}
          <button
            type="button"
            onClick={handleEdit}
            title="Edit tenant"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600"
          >
            <Pencil size={17} />
          </button>

          {/* Activate / Deactivate */}
          <button
            type="button"
            onClick={handleStatusChange}
            title={
              tenant.status === "Active"
                ? "Deactivate tenant"
                : "Activate tenant"
            }
            className={`rounded-lg p-2 transition ${
              tenant.status === "Active"
                ? "text-slate-500 hover:bg-red-50 hover:text-red-600"
                : "text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"
            }`}
          >
            {tenant.status === "Active" ? (
              <PowerOff size={17} />
            ) : (
              <Power size={17} />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
}
