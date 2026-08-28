export type TenantStatus = "Active" | "Inactive";

export type SubscriptionPlan = "Basic" | "Pro" | "Enterprise";

export interface Tenant {
  id: string;
  tenantCode: string;
  tenantName: string;
  adminName: string;
  adminEmail: string;
  phone: string;
  subscription: SubscriptionPlan;
  country: string;
  timeZone: string;
  status: TenantStatus;
  users: number;
  organizations: number;
  activeUsers: number;
  storage: number;
  createdAt: string;
}

export interface TenantFilters {
  search: string;
  status: string;
  plan: string;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export interface CreateTenantRequest {
  tenantName: string;
  tenantCode: string;
  adminName: string;
  adminEmail: string;
  phone: string;
  subscription: SubscriptionPlan;
  country: string;
  timeZone: string;
  status: TenantStatus;
}
