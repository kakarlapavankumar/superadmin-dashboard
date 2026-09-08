import type {
  MonitoringIncident,
  MonitoringMetric,
  MonitoringOverview,
  ServiceHealth,
} from "../types/monitoring";

export const monitoringOverview: MonitoringOverview = {
  platformStatus: "healthy",
  uptime: 99.98,
  cpuUsage: 42,
  memoryUsage: 61,
  storageUsage: 68,
  apiResponseTime: 184,
  requestsPerMinute: 2840,
  errorRate: 0.42,
  activeUsers: 1248,
  servicesOnline: 11,
  servicesTotal: 12,
};

export const serviceHealth: ServiceHealth[] = [
  {
    id: "SVC-001",
    name: "API Gateway",
    description: "Handles incoming API requests.",
    status: "healthy",
    uptime: 99.99,
    responseTime: 120,
    lastChecked: "2026-09-08T09:45:00",
  },
  {
    id: "SVC-002",
    name: "Authentication Service",
    description: "Handles authentication and authorization.",
    status: "healthy",
    uptime: 99.98,
    responseTime: 95,
    lastChecked: "2026-09-08T09:45:00",
  },
  {
    id: "SVC-003",
    name: "Database",
    description: "Primary platform database.",
    status: "healthy",
    uptime: 99.99,
    responseTime: 42,
    lastChecked: "2026-09-08T09:45:00",
  },
  {
    id: "SVC-004",
    name: "Notification Service",
    description: "Email, SMS and push notifications.",
    status: "warning",
    uptime: 98.72,
    responseTime: 380,
    lastChecked: "2026-09-08T09:44:30",
  },
  {
    id: "SVC-005",
    name: "Billing Service",
    description: "Processes subscriptions and payments.",
    status: "healthy",
    uptime: 99.95,
    responseTime: 155,
    lastChecked: "2026-09-08T09:45:00",
  },
  {
    id: "SVC-006",
    name: "Analytics Service",
    description: "Processes reports and analytics.",
    status: "healthy",
    uptime: 99.91,
    responseTime: 210,
    lastChecked: "2026-09-08T09:45:00",
  },
];

export const monitoringMetrics: MonitoringMetric[] = [
  {
    timestamp: "09:00",
    cpu: 38,
    memory: 57,
    requests: 2100,
    errors: 7,
    responseTime: 170,
  },
  {
    timestamp: "09:05",
    cpu: 41,
    memory: 59,
    requests: 2280,
    errors: 8,
    responseTime: 176,
  },
  {
    timestamp: "09:10",
    cpu: 45,
    memory: 60,
    requests: 2450,
    errors: 9,
    responseTime: 181,
  },
  {
    timestamp: "09:15",
    cpu: 43,
    memory: 61,
    requests: 2600,
    errors: 10,
    responseTime: 188,
  },
  {
    timestamp: "09:20",
    cpu: 47,
    memory: 62,
    requests: 2720,
    errors: 11,
    responseTime: 194,
  },
  {
    timestamp: "09:25",
    cpu: 42,
    memory: 61,
    requests: 2840,
    errors: 8,
    responseTime: 184,
  },
];

export const monitoringIncidents: MonitoringIncident[] = [
  {
    id: "INC-001",
    title: "Notification Service Latency",
    description:
      "Notification delivery is experiencing increased response times.",
    severity: "medium",
    status: "monitoring",
    service: "Notification Service",
    startedAt: "2026-09-08T08:15:00",
  },
  {
    id: "INC-002",
    title: "Database Connection Spike",
    description:
      "Database connection count temporarily exceeded normal levels.",
    severity: "low",
    status: "resolved",
    service: "Database",
    startedAt: "2026-09-07T15:20:00",
    resolvedAt: "2026-09-07T15:42:00",
  },
];
