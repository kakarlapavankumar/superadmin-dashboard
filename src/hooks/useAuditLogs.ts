import { useQuery } from "@tanstack/react-query";

import { auditLogApi, type AuditLogFilters } from "../api/auditLogApi";

export const useAuditLogs = (filters: AuditLogFilters = {}) => {
  return useQuery({
    queryKey: ["auditLogs", filters],
    queryFn: () => auditLogApi.getLogs(filters),
  });
};

export const useAuditLog = (id?: string) => {
  return useQuery({
    queryKey: ["auditLog", id],
    queryFn: () => {
      if (!id) {
        throw new Error("Audit log ID is required");
      }

      return auditLogApi.getLogById(id);
    },
    enabled: Boolean(id),
  });
};
