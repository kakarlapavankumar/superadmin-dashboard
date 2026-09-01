export interface Organization {
  id: string;
  name: string;
  tenantId: string;
  tenant: string;
  industry: string;
  location: string;
  email: string;
  phone: string;
  employees: number;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt?: string;
}

export interface CreateOrganizationInput {
  name: string;
  tenantId: string;
  tenant: string;
  industry: string;
  location: string;
  email: string;
  phone: string;
  employees: number;
  status?: "Active" | "Inactive";
}

export interface UpdateOrganizationInput {
  name?: string;
  tenantId?: string;
  tenant?: string;
  industry?: string;
  location?: string;
  email?: string;
  phone?: string;
  employees?: number;
  status?: "Active" | "Inactive";
}