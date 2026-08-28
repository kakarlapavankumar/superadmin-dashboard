import {
  getMockTenants,
  getMockTenant,
  getMockTenantStats,
  createMockTenant,
  updateMockTenant,
  activateMockTenant,
  deactivateMockTenant,
} from "../mock/mockApi";

export async function getTenants() {
  return getMockTenants();
}

export async function getTenant(id: number | string) {
  return getMockTenant(String(id));
}

export async function getTenantStats(id: number | string) {
  return getMockTenantStats(String(id));
}

export async function createTenant(
  tenant: Parameters<typeof createMockTenant>[0],
) {
  return createMockTenant(tenant);
}

export async function updateTenant(
  id: number | string,
  tenant: Parameters<typeof updateMockTenant>[1],
) {
  return updateMockTenant(String(id), tenant);
}

export async function activateTenant(id: number | string) {
  return activateMockTenant(String(id));
}

export async function deactivateTenant(id: number | string) {
  return deactivateMockTenant(String(id));
}
