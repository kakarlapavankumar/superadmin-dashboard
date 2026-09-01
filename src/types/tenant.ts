export interface Tenant {
  id: number;
  name: string;
  code: string;
  domain: string;
  status: "Active" | "Inactive";
  plan: string;
  users: number;
  organizations: number;
  createdAt: string;
  updatedAt?: string;
}

export interface TenantFormData {
  name: string;
  code: string;
  domain: string;
  status: "Active" | "Inactive";
  plan: string;
}

export type CreateTenantInput = TenantFormData;

export interface TenantStats {
  total: number;
  active: number;
  inactive: number;
}
