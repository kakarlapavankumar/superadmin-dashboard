import { auditLogs } from "../mock/auditLogs";
import type {
  AuditLog,
  AuditLogAction,
  AuditLogResource,
  AuditLogStatus,
} from "../types/auditLog";

export interface AuditLogFilters {
  search?: string;
  action?: AuditLogAction | "all";
  resource?: AuditLogResource | "all";
  status?: AuditLogStatus | "all";
  user?: string;
}

export interface AuditLogResponse {
  data: AuditLog[];
  total: number;
}

export const auditLogApi = {
  getLogs: async (filters: AuditLogFilters = {}): Promise<AuditLogResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    let result = [...auditLogs];

    if (filters.search?.trim()) {
      const search = filters.search.toLowerCase().trim();

      result = result.filter(
        (log) =>
          log.id.toLowerCase().includes(search) ||
          log.userName.toLowerCase().includes(search) ||
          log.userEmail.toLowerCase().includes(search) ||
          log.description.toLowerCase().includes(search) ||
          log.ipAddress.toLowerCase().includes(search),
      );
    }

    if (filters.action && filters.action !== "all") {
      result = result.filter((log) => log.action === filters.action);
    }

    if (filters.resource && filters.resource !== "all") {
      result = result.filter((log) => log.resource === filters.resource);
    }

    if (filters.status && filters.status !== "all") {
      result = result.filter((log) => log.status === filters.status);
    }

    if (filters.user?.trim()) {
      const user = filters.user.toLowerCase().trim();

      result = result.filter(
        (log) =>
          log.userName.toLowerCase().includes(user) ||
          log.userEmail.toLowerCase().includes(user),
      );
    }

    return {
      data: result,
      total: result.length,
    };
  },

  getLogById: async (id: string): Promise<AuditLog> => {
    await new Promise((resolve) => setTimeout(resolve, 250));

    const log = auditLogs.find((item) => item.id === id);

    if (!log) {
      throw new Error("Audit log not found");
    }

    return log;
  },
};
