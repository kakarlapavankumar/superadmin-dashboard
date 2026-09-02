export type OrganizationStatus = "Active" | "Inactive";

export interface Organization {
  id: string;
  name: string;
  code: string;
  description: string;

  tenantId: number;
  tenantName: string;

  industry: string;
  location: string;
  email: string;
  phone: string;

  employees: number;
  status: OrganizationStatus;

  createdAt: string;
  updatedAt: string;
}

export interface OrganizationFormData {
  name: string;
  code: string;
  description: string;

  tenantId: number;
  tenantName: string;

  industry: string;
  location: string;
  email: string;
  phone: string;

  employees: number;
  status: OrganizationStatus;
}

export interface CreateOrganizationInput {
  name: string;
  code: string;
  description: string;

  tenantId: number;
  tenantName: string;

  industry: string;
  location: string;
  email: string;
  phone: string;

  employees?: number;
  status: OrganizationStatus;
}

export interface UpdateOrganizationInput {
  name: string;
  code: string;
  description: string;

  tenantId: number;
  tenantName: string;

  industry: string;
  location: string;
  email: string;
  phone: string;

  employees?: number;
  status: OrganizationStatus;
}
