import { tenants } from "./tenants";
import { organizations } from "./organizations";

import { dashboardStats, platformHealth, activities } from "./dashboard";

import type {
  Tenant,
  TenantStats,
  CreateTenantRequest,
  UpdateTenantRequest,
} from "../types/tenant";

import type { Organization, OrganizationFormData } from "../types/organization";

// ============================================================
// COMMON DELAY
// ============================================================

const delay = (ms = 300) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

// ============================================================
// DASHBOARD
// ============================================================

export async function getMockDashboard() {
  await delay();

  return {
    stats: dashboardStats,
    health: platformHealth,
    activities,
  };
}

// ============================================================
// TENANT MANAGEMENT
// ============================================================

// GET ALL TENANTS

export async function getMockTenants(): Promise<Tenant[]> {
  await delay();

  return [...tenants];
}

// GET TENANT

export async function getMockTenant(id: string): Promise<Tenant> {
  await delay();

  const tenant = tenants.find((item) => String(item.id) === String(id));

  if (!tenant) {
    throw new Error("Tenant not found");
  }

  return {
    ...tenant,
  };
}

// TENANT STATISTICS

export async function getMockTenantStats(): Promise<TenantStats> {
  await delay();

  const total = tenants.length;

  const active = tenants.filter((tenant) => tenant.status === "Active").length;

  const inactive = tenants.filter(
    (tenant) => tenant.status === "Inactive",
  ).length;

  const totalUsers = tenants.reduce(
    (sum, tenant) => sum + Number(tenant.users || 0),
    0,
  );

  const activeUsers = tenants.reduce(
    (sum, tenant) => sum + Number(tenant.activeUsers || 0),
    0,
  );

  const totalOrganizations = tenants.reduce(
    (sum, tenant) => sum + Number(tenant.organizations || 0),
    0,
  );

  const totalStorage = tenants.reduce(
    (sum, tenant) => sum + Number(tenant.storage || 0),
    0,
  );

  return {
    total,
    active,
    inactive,
    totalUsers,
    activeUsers,
    totalOrganizations,
    totalStorage,
  };
}

// CREATE TENANT

export async function createMockTenant(
  data: CreateTenantRequest,
): Promise<Tenant> {
  await delay();

  const newTenant: Tenant = {
    id: String(Date.now()),

    ...data,

    users: 0,
    organizations: 0,
    activeUsers: 0,
    storage: 0,

    createdAt: new Date().toISOString().split("T")[0],
  };

  tenants.push(newTenant);

  return {
    ...newTenant,
  };
}

// UPDATE TENANT

export async function updateMockTenant(
  id: string,
  data: UpdateTenantRequest,
): Promise<Tenant> {
  await delay();

  const index = tenants.findIndex((item) => String(item.id) === String(id));

  if (index === -1) {
    throw new Error("Tenant not found");
  }

  tenants[index] = {
    ...tenants[index],
    ...data,
  };

  return {
    ...tenants[index],
  };
}

// ACTIVATE TENANT

export async function activateMockTenant(id: string): Promise<Tenant> {
  await delay();

  const tenant = tenants.find((item) => String(item.id) === String(id));

  if (!tenant) {
    throw new Error("Tenant not found");
  }

  tenant.status = "Active";

  return {
    ...tenant,
  };
}

// DEACTIVATE TENANT

export async function deactivateMockTenant(id: string): Promise<Tenant> {
  await delay();

  const tenant = tenants.find((item) => String(item.id) === String(id));

  if (!tenant) {
    throw new Error("Tenant not found");
  }

  tenant.status = "Inactive";

  return {
    ...tenant,
  };
}

// DELETE TENANT

export async function deleteMockTenant(id: string): Promise<void> {
  await delay();

  const index = tenants.findIndex((item) => String(item.id) === String(id));

  if (index === -1) {
    throw new Error("Tenant not found");
  }

  tenants.splice(index, 1);
}

// ============================================================
// ORGANIZATION MANAGEMENT
// ============================================================

// GET ALL ORGANIZATIONS

export async function getMockOrganizations(): Promise<Organization[]> {
  await delay();

  return [...organizations];
}

// GET SINGLE ORGANIZATION

export async function getMockOrganization(id: string): Promise<Organization> {
  await delay();

  const organization = organizations.find(
    (item) => String(item.id) === String(id),
  );

  if (!organization) {
    throw new Error("Organization not found");
  }

  return {
    ...organization,
  };
}

// CREATE ORGANIZATION

export async function createMockOrganization(
  data: OrganizationFormData,
): Promise<Organization> {
  await delay();

  const today = new Date().toISOString().split("T")[0];

  const newOrganization: Organization = {
    id: `ORG-${Date.now()}`,

    ...data,

    createdAt: today,
    updatedAt: today,
  };

  organizations.unshift(newOrganization);

  return {
    ...newOrganization,
  };
}

// UPDATE ORGANIZATION

export async function updateMockOrganization(
  id: string,
  data: OrganizationFormData,
): Promise<Organization> {
  await delay();

  const index = organizations.findIndex(
    (item) => String(item.id) === String(id),
  );

  if (index === -1) {
    throw new Error("Organization not found");
  }

  const updatedOrganization: Organization = {
    ...organizations[index],

    ...data,

    updatedAt: new Date().toISOString().split("T")[0],
  };

  organizations[index] = updatedOrganization;

  return {
    ...updatedOrganization,
  };
}

// DELETE ORGANIZATION

export async function deleteMockOrganization(id: string): Promise<void> {
  await delay();

  const index = organizations.findIndex(
    (item) => String(item.id) === String(id),
  );

  if (index === -1) {
    throw new Error("Organization not found");
  }

  organizations.splice(index, 1);
}

// TOGGLE ORGANIZATION STATUS

export async function toggleMockOrganizationStatus(
  id: string,
): Promise<Organization> {
  await delay();

  const index = organizations.findIndex(
    (item) => String(item.id) === String(id),
  );

  if (index === -1) {
    throw new Error("Organization not found");
  }

  organizations[index] = {
    ...organizations[index],

    status: organizations[index].status === "Active" ? "Inactive" : "Active",

    updatedAt: new Date().toISOString().split("T")[0],
  };

  return {
    ...organizations[index],
  };
}
