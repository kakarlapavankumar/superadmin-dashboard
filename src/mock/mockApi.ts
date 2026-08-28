import { tenants as initialTenants } from "./tenants";

export type TenantStatus = "Active" | "Inactive";

let tenantStore = [...initialTenants];

type TenantInput = Partial<(typeof initialTenants)[number]> &
  Record<string, unknown>;

function delay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getMockTenants() {
  await delay();

  return [...tenantStore];
}

export async function getMockTenant(id: string) {
  await delay();

  return tenantStore.find((tenant) => String(tenant.id) === String(id));
}

export async function createMockTenant(tenant: TenantInput) {
  await delay();

  const exists = tenantStore.some(
    (item) =>
      String("code" in item ? item.code : "").toLowerCase() ===
      String(tenant.code).toLowerCase(),
  );

  if (exists) {
    throw new Error("Tenant code already exists.");
  }

  const newTenant = {
    ...tenant,
    id: String(Date.now()),
    status: tenant.status || "Active",
    createdAt: new Date().toISOString(),
    users: tenant.users ?? 0,
  } as (typeof initialTenants)[number];

  tenantStore = [newTenant, ...tenantStore];

  return newTenant;
}

export async function updateMockTenant(id: string, updates: TenantInput) {
  await delay();

  const index = tenantStore.findIndex(
    (tenant) => String(tenant.id) === String(id),
  );

  if (index === -1) {
    throw new Error("Tenant not found.");
  }

  const duplicateCode = tenantStore.some(
    (tenant, tenantIndex) =>
      tenantIndex !== index &&
      String("code" in tenant ? tenant.code : "").toLowerCase() ===
        String(updates.code).toLowerCase(),
  );

  if (duplicateCode) {
    throw new Error("Tenant code already exists.");
  }

  tenantStore[index] = {
    ...tenantStore[index],
    ...updates,
  };

  return tenantStore[index];
}

export async function activateMockTenant(id: string) {
  await delay();

  const index = tenantStore.findIndex(
    (tenant) => String(tenant.id) === String(id),
  );

  if (index === -1) {
    throw new Error("Tenant not found.");
  }

  tenantStore[index] = {
    ...tenantStore[index],
    status: "Active",
  };

  return tenantStore[index];
}

export async function deactivateMockTenant(id: string) {
  await delay();

  const index = tenantStore.findIndex(
    (tenant) => String(tenant.id) === String(id),
  );

  if (index === -1) {
    throw new Error("Tenant not found.");
  }

  tenantStore[index] = {
    ...tenantStore[index],
    status: "Inactive",
  };

  return tenantStore[index];
}

export async function getMockTenantStats(id: string) {
  await delay();

  const tenant = tenantStore.find((item) => String(item.id) === String(id));

  if (!tenant) {
    throw new Error("Tenant not found.");
  }

  const users = Number(tenant.users ?? 0);

  return {
    users,
    organizations: Math.max(1, Math.ceil(users / 35)),
    activeUsers: Math.round(users * 0.87),
    storage: Math.min(95, Math.max(10, Math.round(users / 4))),
  };
}
