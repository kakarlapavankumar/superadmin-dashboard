export interface ReportsOverview {
  totalRevenue: number;
  monthlyRevenue: number;
  totalUsers: number;
  activeUsers: number;
  totalTenants: number;
  activeTenants: number;
  totalSubscriptions: number;
  activeSubscriptions: number;
  totalApiRequests: number;
  averageResponseTime: number;
  errorRate: number;
}

export interface RevenueReport {
  month: string;
  revenue: number;
  subscriptions: number;
}

export interface TenantGrowthReport {
  month: string;
  totalTenants: number;
  newTenants: number;
}

export interface UserGrowthReport {
  month: string;
  totalUsers: number;
  newUsers: number;
}

export interface UsageReport {
  month: string;
  apiRequests: number;
  activeUsers: number;
  storageUsed: number;
}

export interface ReportSummary {
  id: string;
  title: string;
  description: string;
  category: string;
  value: string;
  change: number;
  trend: "up" | "down" | "stable";
}
