import { tenants } from "./tenants";
import {
  dashboardStats,
  platformHealth,
  growthData,
  activities,
} from "./dashboard";

import type { Tenant } from "../types/tenant";

type CreateTenantInput = Omit<
  Tenant,
  "id" | "users" | "organizations" | "activeUsers" | "storage" | "createdAt"
>;

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getMockDashboard() {
  await delay();

  return {
    stats: dashboardStats,
    health: platformHealth,
    growth: growthData,
    activities,
  };
}

export async function getMockTenants(): Promise<Tenant[]> {
  await delay();

  return [...tenants];
}

export async function getMockTenant(id: number): Promise<Tenant> {
  await delay();

  const tenant = tenants.find((item) => String(item.id) === String(id));

  if (!tenant) {
    throw new Error("Tenant not found");
  }

  return { ...tenant };
}

export async function createMockTenant(
  data: CreateTenantInput,
): Promise<Tenant> {
  await delay();

  const tenant: Tenant = {
    ...data,
    id: String(Date.now()),
    users: 0,
    organizations: 0,
    activeUsers: 0,
    storage: 0,
    createdAt: new Date().toISOString().split("T")[0],
  };

  tenants.push(tenant);

  return tenant;
}

export async function updateMockTenant(
  id: number,
  data: CreateTenantInput,
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

  return { ...tenants[index] };
}

export async function activateMockTenant(id: number) {
  await delay();

  const tenant = tenants.find((item) => String(item.id) === String(id));

  if (!tenant) {
    throw new Error("Tenant not found");
  }

  tenant.status = "Active";

  return { ...tenant };
}

export async function deactivateMockTenant(id: number) {
  await delay();

  const tenant = tenants.find((item) => String(item.id) === String(id));

  if (!tenant) {
    throw new Error("Tenant not found");
  }

  tenant.status = "Inactive";

  return { ...tenant };
}
