import KPICard from "../components/dashboard/KPICard";
import PlatformHealth from "../components/dashboard/PlatformHealth";
import TenantGrowthChart from "../components/dashboard/TenantGrowthChart";
import RecentActivities from "../components/dashboard/RecentActivities";

import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

import { useDashboard } from "../hooks/useDashboard";

export default function Dashboard() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !data) {
    return <ErrorMessage message="Unable to load dashboard" />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Global Dashboard</h1>

        <p className="text-gray-500">Monitor your entire platform</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard title="Total Tenants" value={data.stats.totalTenants} />

        <KPICard title="Active Tenants" value={data.stats.activeTenants} />

        <KPICard title="Inactive Tenants" value={data.stats.inactiveTenants} />

        <KPICard title="Total Users" value={data.stats.totalUsers} />

        <KPICard title="Active Licenses" value={data.stats.activeLiciences} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PlatformHealth
          items={
            data.health as unknown as Parameters<
              typeof PlatformHealth
            >[0]["items"]
          }
        />

        <RecentActivities activities={data.activities} />
      </div>

      <TenantGrowthChart data={data.growth} />
    </div>
  );
}
