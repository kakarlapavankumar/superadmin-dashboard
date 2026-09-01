import type { Tenant, TenantFormData, TenantStats } from "../types/tenant";

import {
  getMockTenants,
  getMockTenant,
  getMockTenantStats,
  createMockTenant,
  updateMockTenant,
  deleteMockTenant,
  activateMockTenant,
  deactivateMockTenant,
} from "../mock/mockApi";

export const getTenants = async (): Promise<Tenant[]> => {
  return getMockTenants();
};

export const getTenant = async (id: number): Promise<Tenant> => {
  return getMockTenant(id);
};

export const getTenantStats = async (): Promise<TenantStats> => {
  return getMockTenantStats();
};

export const createTenant = async (data: TenantFormData): Promise<Tenant> => {
  return createMockTenant(data);
};

export const updateTenant = async (
  id: number,
  data: TenantFormData,
): Promise<Tenant> => {
  return updateMockTenant(id, data);
};

export const deleteTenant = async (id: number): Promise<void> => {
  return deleteMockTenant(id);
};

export const activateTenant = async (id: number): Promise<Tenant> => {
  return activateMockTenant(id);
};

export const deactivateTenant = async (id: number): Promise<Tenant> => {
  return deactivateMockTenant(id);
};
