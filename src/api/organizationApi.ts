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
  tenantId?: string;
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

  if (search.trim()) {
    const value = search.toLowerCase();

    result = result.filter(
      (organization) =>
        organization.name.toLowerCase().includes(value) ||
        organization.code.toLowerCase().includes(value) ||
        organization.tenantName.toLowerCase().includes(value),
    );
  }

  if (status !== "all") {
    result = result.filter((organization) => organization.status === status);
  }

  if (tenantId !== "all") {
    result = result.filter(
      (organization) => organization.tenantId === tenantId,
    );
  }

  const total = result.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * limit;

  return {
    data: result.slice(start, start + limit),
    total,
    page: safePage,
    limit,
    totalPages,
  };
}

export async function getOrganization(
  id: string,
): Promise<Organization | undefined> {
  return organizationData.find((organization) => organization.id === id);
}

export async function createOrganization(
  input: CreateOrganizationInput,
): Promise<Organization> {
  const newOrganization: Organization = {
    id: `ORG-${String(organizationData.length + 1).padStart(3, "0")}`,
    name: input.name,
    code: input.code,
    description: input.description,
    tenantId: input.tenantId,
    tenantName: input.tenantName,
    industry: input.industry,
    location: input.location,
    email: input.email,
    phone: input.phone,
    employees: input.employees ?? 0,
    status: input.status,
    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: new Date().toISOString().split("T")[0],
  };

  organizationData.push(newOrganization);

  return newOrganization;
}

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

  const updatedOrganization: Organization = {
    ...organizationData[index],
    ...input,
    updatedAt: new Date().toISOString().split("T")[0],
  };

  organizationData[index] = updatedOrganization;

  return updatedOrganization;
}

export async function deleteOrganization(id: string): Promise<void> {
  organizationData = organizationData.filter(
    (organization) => organization.id !== id,
  );
}

export async function toggleOrganizationStatus(
  id: string,
): Promise<Organization> {
  const organization = organizationData.find((item) => item.id === id);

  if (!organization) {
    throw new Error("Organization not found");
  }

  organization.status =
    organization.status === "Active" ? "Inactive" : "Active";

  organization.updatedAt = new Date().toISOString().split("T")[0];

  return organization;
}
