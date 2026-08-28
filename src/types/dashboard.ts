export interface DashboardStats {
  totalTenants: number;
  activeTenants: number;
  inactiveTenants: number;
  totalUsers: number;
  activeLicenses: number;
}

export interface HealthItem {
  name: string;
  status: string;
  type: "success" | "info" | "warning";
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  time: string;
  type: "success" | "info" | "warning";
}

export interface TenantGrowth {
  month: string;
  tenants: number;
}
