import type { Tenant } from "../../types/tenant";

interface Props {
  tenant: Tenant;
}

export default function TenantStats({ tenant }: Props) {
  const stats = [
    ["Users", tenant.users],
    ["Organizations", tenant.organizations],
    ["Active Users", tenant.activeUsers],
    ["Storage", `${tenant.storage}%`],
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map(([title, value]) => (
        <div key={title} className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-gray-500 text-sm">{title}</p>

          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
      ))}
    </div>
  );
}
