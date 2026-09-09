import { useQuery } from "@tanstack/react-query";
import { reportsApi } from "../api/reportsApi";

export function useReportsOverview() {
  return useQuery({
    queryKey: ["reports", "overview"],
    queryFn: reportsApi.getOverview,
  });
}

export function useRevenueReports() {
  return useQuery({
    queryKey: ["reports", "revenue"],
    queryFn: reportsApi.getRevenueReports,
  });
}

export function useTenantGrowthReports() {
  return useQuery({
    queryKey: ["reports", "tenant-growth"],
    queryFn: reportsApi.getTenantGrowthReports,
  });
}

export function useUserGrowthReports() {
  return useQuery({
    queryKey: ["reports", "user-growth"],
    queryFn: reportsApi.getUserGrowthReports,
  });
}

export function useUsageReports() {
  return useQuery({
    queryKey: ["reports", "usage"],
    queryFn: reportsApi.getUsageReports,
  });
}

export function useReportSummaries() {
  return useQuery({
    queryKey: ["reports", "summaries"],
    queryFn: reportsApi.getReportSummaries,
  });
}
