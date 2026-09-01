export type TenantStatus = "Active" | "Inactive";

export type TenantPlan = "Basic" | "Professional" | "Enterprise";

export interface Tenant {
  id: number;
  name: string;
  code: string;
  domain: string;
  status: TenantStatus;
  plan: TenantPlan;
  users: number;
  organizations: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTenantInput {
  name: string;
  code: string;
  domain: string;
  plan: TenantPlan;
  status: TenantStatus;
}

export interface UpdateTenantInput {
  name: string;
  code: string;
  domain: string;
  plan: TenantPlan;
  status: TenantStatus;
}

export interface TenantFilters {
  search?: string;
  status?: TenantStatus | "All";
  plan?: TenantPlan | "All";
}

export interface TenantStats {
  users: number;
  organizations: number;
  activeUsers: number;
  storage: number;
}
