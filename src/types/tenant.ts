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
  status: TenantStatus;
  plan: TenantPlan;
  users?: number;
  organizations?: number;
}

export interface UpdateTenantInput {
  name: string;
  code: string;
  domain: string;
  status: TenantStatus;
  plan: TenantPlan;
}
