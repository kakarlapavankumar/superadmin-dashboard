import type {
  Organization,
  CreateOrganizationInput,
  UpdateOrganizationInput,
} from "../types/organization";

export const organizations: Organization[] = [
  {
    id: "1",
    name: "OneCloud Technologies",
    tenantId: "tenant-001",
    tenant: "OneCloud Technologies",
    industry: "Technology",
    location: "Hyderabad, India",
    email: "admin@onecloud.com",
    phone: "+91 9876543210",
    employees: 250,
    status: "Active",
    createdAt: "2026-01-10",
    updatedAt: "2026-08-20",
  },
  {
    id: "2",
    name: "Acme Corporation",
    tenantId: "tenant-002",
    tenant: "Acme Corporation",
    industry: "Software",
    location: "Bangalore, India",
    email: "admin@acme.com",
    phone: "+91 9876543211",
    employees: 180,
    status: "Active",
    createdAt: "2026-01-15",
    updatedAt: "2026-08-21",
  },
  {
    id: "3",
    name: "Global Solutions",
    tenantId: "tenant-003",
    tenant: "Global Solutions",
    industry: "Consulting",
    location: "Mumbai, India",
    email: "contact@globalsolutions.com",
    phone: "+91 9876543212",
    employees: 120,
    status: "Inactive",
    createdAt: "2026-02-05",
    updatedAt: "2026-08-15",
  },
  {
    id: "4",
    name: "TechNova Systems",
    tenantId: "tenant-004",
    tenant: "TechNova Systems",
    industry: "Information Technology",
    location: "Chennai, India",
    email: "info@technova.com",
    phone: "+91 9876543213",
    employees: 320,
    status: "Active",
    createdAt: "2026-02-18",
    updatedAt: "2026-08-22",
  },
  {
    id: "5",
    name: "Innovate Labs",
    tenantId: "tenant-005",
    tenant: "Innovate Labs",
    industry: "Research & Development",
    location: "Pune, India",
    email: "hello@innovatelabs.com",
    phone: "+91 9876543214",
    employees: 95,
    status: "Active",
    createdAt: "2026-03-01",
    updatedAt: "2026-08-18",
  },
  {
    id: "6",
    name: "CloudWorks",
    tenantId: "tenant-006",
    tenant: "CloudWorks",
    industry: "Cloud Computing",
    location: "Delhi, India",
    email: "admin@cloudworks.com",
    phone: "+91 9876543215",
    employees: 210,
    status: "Inactive",
    createdAt: "2026-03-12",
    updatedAt: "2026-08-10",
  },
];

export const getMockOrganizations = (): Organization[] => {
  return organizations;
};

export const getMockOrganization = (
  id: string
): Organization | undefined => {
  return organizations.find(
    (organization) => organization.id === id
  );
};

export const createMockOrganization = (
  data: CreateOrganizationInput
): Organization => {
  const newOrganization: Organization = {
    id: crypto.randomUUID(),
    name: data.name,
    tenantId: data.tenantId,
    tenant: data.tenant,
    industry: data.industry,
    location: data.location,
    email: data.email,
    phone: data.phone,
    employees: data.employees,
    status: data.status ?? "Active",
    createdAt: new Date().toISOString(),
  };

  organizations.push(newOrganization);

  return newOrganization;
};

export const updateMockOrganization = (
  id: string,
  data: UpdateOrganizationInput
): Organization | undefined => {
  const index = organizations.findIndex(
    (organization) => organization.id === id
  );

  if (index === -1) {
    return undefined;
  }

  organizations[index] = {
    ...organizations[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  return organizations[index];
};

export const deleteMockOrganization = (
  id: string
): boolean => {
  const index = organizations.findIndex(
    (organization) => organization.id === id
  );

  if (index === -1) {
    return false;
  }

  organizations.splice(index, 1);

  return true;
};

export const toggleMockOrganizationStatus = (
  id: string
): Organization | undefined => {
  const organization = organizations.find(
    (organization) => organization.id === id
  );

  if (!organization) {
    return undefined;
  }

  organization.status =
    organization.status === "Active"
      ? "Inactive"
      : "Active";

  organization.updatedAt = new Date().toISOString();

  return organization;
};