import {
  getMockTenants,
  getMockTenant,
  createMockTenant,
  updateMockTenant,
  activateMockTenant,
  deactivateMockTenant,
} from "../mock/mockApi";

export async function getTenants() {
  return getMockTenants();
}

export async function getTenant(id: number) {
  return getMockTenant(id);
}

export async function createTenant(
  data: Parameters<typeof createMockTenant>[0],
) {
  return createMockTenant(data);
}

export async function updateTenant(
  id: number,
  data: Parameters<typeof updateMockTenant>[1],
) {
  return updateMockTenant(id, data);
}

export async function activateTenant(id: number) {
  return activateMockTenant(id);
}

export async function deactivateTenant(id: number) {
  return deactivateMockTenant(id);
}
