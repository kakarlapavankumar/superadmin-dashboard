export type TenantStatus = "Active" | "Inactive";

export type Subscription = "Basic" | "Pro" | "Enterprise";

export interface Tenant {
  id: string;
  tenantCode: string;
  tenantName: string;
  adminName: string;
  adminEmail: string;
  phone: string;
  subscription: Subscription;
  country: string;
  timeZone: string;
  status: TenantStatus;
  users: number;
  organizations: number;
  activeUsers: number;
  storage: number;
  createdAt: string;
}

export interface CreateTenantInput {
  tenantName: string;
  tenantCode: string;
  adminName: string;
  adminEmail: string;
  phone: string;
  subscription: Subscription;
  country: string;
  timeZone: string;
  status: TenantStatus;
}

export type UpdateTenantInput = CreateTenantInput;
