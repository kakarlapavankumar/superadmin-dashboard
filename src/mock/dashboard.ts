import type { DashboardStats } from "../types/dashboard";

type GrowthData = {
  month: string;
  tenants: number;
};

type Activity = {
  id: number;
  message: string;
  time: string;
  type: "create" | "activate" | "update" | "license" | "deactivate";
};

type PlatformHealthItem = {
  name: string;
  status: string;
  value?: number;
};

export const dashboardStats: DashboardStats = {
  totalTenants: 125,
  activeTenants: 112,
  inactiveTenants: 13,
  totalUsers: 5240,
  activeLiciences: 98,
};

export const platformHealth: PlatformHealthItem[] = [
  {
    name: "API Gateway",
    status: "Healthy",
  },
  {
    name: "Database",
    status: "Connected",
  },
  {
    name: "Server",
    status: "Running",
  },
  {
    name: "Storage",
    status: "68%",
    value: 68,
  },
  {
    name: "CPU Usage",
    status: "42%",
    value: 42,
  },
  {
    name: "Memory Usage",
    status: "61%",
    value: 61,
  },
];

export const growthData: GrowthData[] = [
  { month: "Jan", tenants: 70 },
  { month: "Feb", tenants: 78 },
  { month: "Mar", tenants: 85 },
  { month: "Apr", tenants: 92 },
  { month: "May", tenants: 105 },
  { month: "Jun", tenants: 112 },
  { month: "Jul", tenants: 118 },
  { month: "Aug", tenants: 125 },
];

export const activities: Activity[] = [
  {
    id: 1,
    message: "New tenant created",
    time: "10 minutes ago",
    type: "create",
  },
  {
    id: 2,
    message: "Tenant activated",
    time: "30 minutes ago",
    type: "activate",
  },
  {
    id: 3,
    message: "Tenant configuration updated",
    time: "1 hour ago",
    type: "update",
  },
  {
    id: 4,
    message: "License renewed",
    time: "2 hours ago",
    type: "license",
  },
  {
    id: 5,
    message: "Tenant deactivated",
    time: "3 hours ago",
    type: "deactivate",
  },
];
