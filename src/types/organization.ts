export type OrganizationStatus = "Active" | "Inactive";

export interface Organization {
  id: string;

  name: string;
  code: string;

  tenant: string;

  industry: string;
  location: string;

  email: string;
  phone: string;
  website: string;

  employees: number;

  description: string;

  status: OrganizationStatus;

  createdAt: string;
  updatedAt: string;
}

export interface OrganizationFormData {
  name: string;
  code: string;

  tenant: string;

  industry: string;
  location: string;

  email: string;
  phone: string;
  website: string;

  employees: number;

  description: string;

  status: OrganizationStatus;
}
