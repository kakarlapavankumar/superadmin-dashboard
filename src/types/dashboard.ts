export interface DashboardStats {
  totalTenants: number;
  activeTenants: number;
  inactiveTenants: number;
  totalUsers: number;
  activeLiciences: number;
}

export interface platformHealth {
  apiGateway: string;
  database: string;
  server: string;
  storage: string;
  cpuUsage: string;
  memoryUsage: string;
}

export interface TenantGrowth {
  month: string;
  tenants: number;
}

export interface recentActivity {
  id: string;
  message: string;
  date: string;
  type: string;
}

export interface DashboardData {
  stats: DashboardStats;
  health: platformHealth;
  growth: TenantGrowth[];
  Activities: recentActivity[];
}
