import { useQuery } from "@tanstack/react-query";

import {
  getDashboardStats,
  getPlatformHealth,
  getTenantGrowth,
  getRecentActivities,
} from "../api/dashboardApi";

export function useDashboard() {
  const statsQuery = useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: getDashboardStats,
  });

  const healthQuery = useQuery({
    queryKey: ["dashboard", "health"],
    queryFn: getPlatformHealth,
  });

  const growthQuery = useQuery({
    queryKey: ["dashboard", "growth"],
    queryFn: getTenantGrowth,
  });

  const activitiesQuery = useQuery({
    queryKey: ["dashboard", "activities"],
    queryFn: getRecentActivities,
  });

  return {
    stats: statsQuery.data,
    health: healthQuery.data,
    growth: growthQuery.data,
    activities: activitiesQuery.data,

    isLoading:
      statsQuery.isLoading ||
      healthQuery.isLoading ||
      growthQuery.isLoading ||
      activitiesQuery.isLoading,

    isError:
      statsQuery.isError ||
      healthQuery.isError ||
      growthQuery.isError ||
      activitiesQuery.isError,

    error:
      statsQuery.error ??
      healthQuery.error ??
      growthQuery.error ??
      activitiesQuery.error,

    refetch: async () => {
      await Promise.all([
        statsQuery.refetch(),
        healthQuery.refetch(),
        growthQuery.refetch(),
        activitiesQuery.refetch(),
      ]);
    },
  };
}
