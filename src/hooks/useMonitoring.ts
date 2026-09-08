import { useQuery } from "@tanstack/react-query";

import { monitoringApi } from "../api/monitoringApi";

export const useMonitoringOverview = () => {
  return useQuery({
    queryKey: ["monitoring", "overview"],
    queryFn: monitoringApi.getOverview,
    refetchInterval: 30000,
  });
};

export const useMonitoringServices = () => {
  return useQuery({
    queryKey: ["monitoring", "services"],
    queryFn: monitoringApi.getServices,
    refetchInterval: 30000,
  });
};

export const useMonitoringMetrics = () => {
  return useQuery({
    queryKey: ["monitoring", "metrics"],
    queryFn: monitoringApi.getMetrics,
    refetchInterval: 30000,
  });
};

export const useMonitoringIncidents = () => {
  return useQuery({
    queryKey: ["monitoring", "incidents"],
    queryFn: monitoringApi.getIncidents,
    refetchInterval: 30000,
  });
};
