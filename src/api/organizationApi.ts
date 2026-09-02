import type {
  Organization,
  CreateOrganizationInput,
  UpdateOrganizationInput,
} from "../types/organization";

import { organizations } from "../mock/organizations";

let organizationData: Organization[] = [...organizations];

export interface OrganizationFilters {
  search?: string;
  status?: string;
  tenantId?: number | string;
  page?: number;
  limit?: number;
}

export interface OrganizationListResponse {
  data: Organization[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/* --------------------------------
   GET ORGANIZATIONS
--------------------------------- */

export async function getOrganizations(
  filters: OrganizationFilters = {},
): Promise<OrganizationListResponse> {
  const {
    search = "",
    status = "all",
    tenantId = "all",
    page = 1,
    limit = 10,
  } = filters;

  let result = [...organizationData];

  /* Search */

  if (search.trim()) {
    const value = search.toLowerCase().trim();

    result = result.filter(
      (organization) =>
        organization.name.toLowerCase().includes(value) ||
        organization.code.toLowerCase().includes(value) ||
        organization.tenantName.toLowerCase().includes(value) ||
        organization.industry.toLowerCase().includes(value) ||
        organization.location.toLowerCase().includes(value),
    );
  }

  /* Status */

  if (status !== "all") {
    result = result.filter((organization) => organization.status === status);
  }

  /* Tenant */

  if (tenantId !== "all") {
    const numericTenantId = Number(tenantId);

    result = result.filter(
      (organization) => organization.tenantId === numericTenantId,
    );
  }

  /* Pagination */

  const total = result.length;

  const totalPages = total === 0 ? 1 : Math.ceil(total / limit);

  const safePage = Math.min(Math.max(page, 1), totalPages);

  const startIndex = (safePage - 1) * limit;

  const data = result.slice(startIndex, startIndex + limit);

  return {
    data,
    total,
    page: safePage,
    limit,
    totalPages,
  };
}

/* --------------------------------
   GET SINGLE ORGANIZATION
--------------------------------- */

export async function getOrganization(
  id: string,
): Promise<Organization | undefined> {
  return organizationData.find((organization) => organization.id === id);
}

/* --------------------------------
   CREATE ORGANIZATION
--------------------------------- */

export async function createOrganization(
  input: CreateOrganizationInput,
): Promise<Organization> {
  const newNumber = organizationData.length + 1;

  const today = new Date().toISOString().split("T")[0];

  const newOrganization: Organization = {
    id: `ORG-${String(newNumber).padStart(3, "0")}`,

    name: input.name,

    code: input.code,

    description: input.description,

    tenantId: Number(input.tenantId),

    tenantName: input.tenantName,

    industry: input.industry,

    location: input.location,

    email: input.email,

    phone: input.phone,

    employees: input.employees ?? 0,

    status: input.status,

    createdAt: today,

    updatedAt: today,
  };

  organizationData.push(newOrganization);

  return newOrganization;
}

/* --------------------------------
   UPDATE ORGANIZATION
--------------------------------- */

export async function updateOrganization(
  id: string,
  input: UpdateOrganizationInput,
): Promise<Organization> {
  const index = organizationData.findIndex(
    (organization) => organization.id === id,
  );

  if (index === -1) {
    throw new Error("Organization not found");
  }

  const today = new Date().toISOString().split("T")[0];

  const updatedOrganization: Organization = {
    ...organizationData[index],

    name: input.name,

    code: input.code,

    description: input.description,

    tenantId: Number(input.tenantId),

    tenantName: input.tenantName,

    industry: input.industry,

    location: input.location,

    email: input.email,

    phone: input.phone,

    employees: input.employees ?? 0,

    status: input.status,

    updatedAt: today,
  };

  organizationData[index] = updatedOrganization;

  return updatedOrganization;
}

/* --------------------------------
   DELETE ORGANIZATION
--------------------------------- */

export async function deleteOrganization(id: string): Promise<void> {
  const exists = organizationData.some(
    (organization) => organization.id === id,
  );

  if (!exists) {
    throw new Error("Organization not found");
  }

  organizationData = organizationData.filter(
    (organization) => organization.id !== id,
  );
}

/* --------------------------------
   ACTIVATE ORGANIZATION
--------------------------------- */

export async function activateOrganization(id: string): Promise<Organization> {
  const index = organizationData.findIndex(
    (organization) => organization.id === id,
  );

  if (index === -1) {
    throw new Error("Organization not found");
  }

  const today = new Date().toISOString().split("T")[0];

  organizationData[index] = {
    ...organizationData[index],

    status: "Active",

    updatedAt: today,
  };

  return organizationData[index];
}

/* --------------------------------
   DEACTIVATE ORGANIZATION
--------------------------------- */

export async function deactivateOrganization(
  id: string,
): Promise<Organization> {
  const index = organizationData.findIndex(
    (organization) => organization.id === id,
  );

  if (index === -1) {
    throw new Error("Organization not found");
  }

  const today = new Date().toISOString().split("T")[0];

  organizationData[index] = {
    ...organizationData[index],

    status: "Inactive",

    updatedAt: today,
  };

  return organizationData[index];
}

/* --------------------------------
   TOGGLE STATUS
--------------------------------- */

export async function toggleOrganizationStatus(
  id: string,
): Promise<Organization> {
  const index = organizationData.findIndex(
    (organization) => organization.id === id,
  );

  if (index === -1) {
    throw new Error("Organization not found");
  }

  const organization = organizationData[index];

  const today = new Date().toISOString().split("T")[0];

  organizationData[index] = {
    ...organization,

    status: organization.status === "Active" ? "Inactive" : "Active",

    updatedAt: today,
  };

  return organizationData[index];
}

/* --------------------------------
   RESET DATA
--------------------------------- */

export async function resetOrganizations(): Promise<void> {
  organizationData = [...organizations];
}
