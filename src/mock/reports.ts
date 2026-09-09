import type {
  ReportsOverview,
  RevenueReport,
  TenantGrowthReport,
  UserGrowthReport,
  UsageReport,
  ReportSummary,
} from "../types/reports";

export const reportsOverview: ReportsOverview = {
  totalRevenue: 1846250,
  monthlyRevenue: 248640,
  totalUsers: 5240,
  activeUsers: 4812,
  totalTenants: 125,
  activeTenants: 112,
  totalSubscriptions: 204,
  activeSubscriptions: 186,
  totalApiRequests: 4821640,
  averageResponseTime: 186,
  errorRate: 0.42,
};

export const revenueReports: RevenueReport[] = [
  {
    month: "Jan",
    revenue: 182400,
    subscriptions: 152,
  },
  {
    month: "Feb",
    revenue: 195600,
    subscriptions: 161,
  },
  {
    month: "Mar",
    revenue: 208900,
    subscriptions: 169,
  },
  {
    month: "Apr",
    revenue: 221500,
    subscriptions: 175,
  },
  {
    month: "May",
    revenue: 235800,
    subscriptions: 181,
  },
  {
    month: "Jun",
    revenue: 248640,
    subscriptions: 186,
  },
];

export const tenantGrowthReports: TenantGrowthReport[] = [
  {
    month: "Jan",
    totalTenants: 92,
    newTenants: 6,
  },
  {
    month: "Feb",
    totalTenants: 98,
    newTenants: 6,
  },
  {
    month: "Mar",
    totalTenants: 105,
    newTenants: 7,
  },
  {
    month: "Apr",
    totalTenants: 111,
    newTenants: 6,
  },
  {
    month: "May",
    totalTenants: 118,
    newTenants: 7,
  },
  {
    month: "Jun",
    totalTenants: 125,
    newTenants: 7,
  },
];

export const userGrowthReports: UserGrowthReport[] = [
  {
    month: "Jan",
    totalUsers: 3920,
    newUsers: 320,
  },
  {
    month: "Feb",
    totalUsers: 4180,
    newUsers: 260,
  },
  {
    month: "Mar",
    totalUsers: 4450,
    newUsers: 270,
  },
  {
    month: "Apr",
    totalUsers: 4680,
    newUsers: 230,
  },
  {
    month: "May",
    totalUsers: 4980,
    newUsers: 300,
  },
  {
    month: "Jun",
    totalUsers: 5240,
    newUsers: 260,
  },
];

export const usageReports: UsageReport[] = [
  {
    month: "Jan",
    apiRequests: 3250000,
    activeUsers: 3650,
    storageUsed: 420,
  },
  {
    month: "Feb",
    apiRequests: 3510000,
    activeUsers: 3910,
    storageUsed: 455,
  },
  {
    month: "Mar",
    apiRequests: 3780000,
    activeUsers: 4180,
    storageUsed: 490,
  },
  {
    month: "Apr",
    apiRequests: 4120000,
    activeUsers: 4390,
    storageUsed: 525,
  },
  {
    month: "May",
    apiRequests: 4510000,
    activeUsers: 4620,
    storageUsed: 570,
  },
  {
    month: "Jun",
    apiRequests: 4821640,
    activeUsers: 4812,
    storageUsed: 620,
  },
];

export const reportSummaries: ReportSummary[] = [
  {
    id: "RPT-001",
    title: "Revenue Growth",
    description: "Monthly platform revenue",
    category: "Financial",
    value: "$248,640",
    change: 8.4,
    trend: "up",
  },
  {
    id: "RPT-002",
    title: "Tenant Growth",
    description: "New tenants added this month",
    category: "Tenants",
    value: "7",
    change: 5.2,
    trend: "up",
  },
  {
    id: "RPT-003",
    title: "User Growth",
    description: "New platform users",
    category: "Users",
    value: "260",
    change: 4.8,
    trend: "up",
  },
  {
    id: "RPT-004",
    title: "API Performance",
    description: "Average API response time",
    category: "API",
    value: "186 ms",
    change: -3.1,
    trend: "up",
  },
];
