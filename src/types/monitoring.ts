export type HealthStatus = "healthy" | "warning" | "critical" | "offline";

export type IncidentSeverity = "low" | "medium" | "high" | "critical";

export type IncidentStatus =
  | "investigating"
  | "identified"
  | "monitoring"
  | "resolved";

export interface MonitoringOverview {
  platformStatus: HealthStatus;
  uptime: number;
  cpuUsage: number;
  memoryUsage: number;
  storageUsage: number;
  apiResponseTime: number;
  requestsPerMinute: number;
  errorRate: number;
  activeUsers: number;
  servicesOnline: number;
  servicesTotal: number;
}

export interface ServiceHealth {
  id: string;
  name: string;
  description: string;
  status: HealthStatus;
  uptime: number;
  responseTime: number;
  lastChecked: string;
}

export interface MonitoringMetric {
  timestamp: string;
  cpu: number;
  memory: number;
  requests: number;
  errors: number;
  responseTime: number;
}

export interface MonitoringIncident {
  id: string;
  title: string;
  description: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  service: string;
  startedAt: string;
  resolvedAt?: string;
}
