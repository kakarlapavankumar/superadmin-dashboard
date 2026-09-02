import { Building2, Users, Network, CalendarDays } from "lucide-react";

import type { Tenant } from "../../types/tenant";

interface TenantStatsProps {
  tenant: Tenant;
}

export default function TenantStats({ tenant }: TenantStatsProps) {
  const stats = [
    {
      label: "Users",
      value: tenant.users.toLocaleString(),
      icon: Users,
    },
    {
      label: "Organizations",
      value: tenant.organizations.toLocaleString(),
      icon: Network,
    },
    {
      label: "Plan",
      value: tenant.plan,
      icon: Building2,
    },
    {
      label: "Created",
      value: tenant.createdAt,
      icon: CalendarDays,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>

              <div className="rounded-lg bg-indigo-50 p-2">
                <Icon className="h-5 w-5 text-indigo-600" />
              </div>
            </div>

            <p className="mt-4 text-xl font-bold text-slate-900">
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
