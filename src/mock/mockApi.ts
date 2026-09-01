import type { Tenant, TenantFormData, TenantStats } from "../types/tenant";

import { tenants } from "./tenants";

let mockTenants: Tenant[] = [...tenants];

export const getMockTenants = async (): Promise<Tenant[]> => {
  return [...mockTenants];
};

export const getMockTenant = async (id: number): Promise<Tenant> => {
  const tenant = mockTenants.find((item) => item.id === id);

  if (!tenant) {
    throw new Error("Tenant not found");
  }

  return { ...tenant };
};

export const getMockTenantStats = async (): Promise<TenantStats> => {
  return {
    total: mockTenants.length,
    active: mockTenants.filter((tenant) => tenant.status === "Active").length,
    inactive: mockTenants.filter((tenant) => tenant.status === "Inactive")
      .length,
  };
};

export const createMockTenant = async (
  data: TenantFormData,
): Promise<Tenant> => {
  const newTenant: Tenant = {
    id:
      mockTenants.length > 0
        ? Math.max(...mockTenants.map((tenant) => tenant.id)) + 1
        : 1,

    ...data,

    users: 0,
    organizations: 0,

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString(),
  };

  mockTenants = [...mockTenants, newTenant];

  return { ...newTenant };
};

export const updateMockTenant = async (
  id: number,
  data: TenantFormData,
): Promise<Tenant> => {
  const index = mockTenants.findIndex((tenant) => tenant.id === id);

  if (index === -1) {
    throw new Error("Tenant not found");
  }

  const updatedTenant: Tenant = {
    ...mockTenants[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  mockTenants[index] = updatedTenant;

  return { ...updatedTenant };
};

export const deleteMockTenant = async (id: number): Promise<void> => {
  const exists = mockTenants.some((tenant) => tenant.id === id);

  if (!exists) {
    throw new Error("Tenant not found");
  }

  mockTenants = mockTenants.filter((tenant) => tenant.id !== id);
};

export const activateMockTenant = async (id: number): Promise<Tenant> => {
  return updateTenantStatus(id, "Active");
};

export const deactivateMockTenant = async (id: number): Promise<Tenant> => {
  return updateTenantStatus(id, "Inactive");
};

const updateTenantStatus = async (
  id: number,
  status: "Active" | "Inactive",
): Promise<Tenant> => {
  const index = mockTenants.findIndex((tenant) => tenant.id === id);

  if (index === -1) {
    throw new Error("Tenant not found");
  }

  mockTenants[index] = {
    ...mockTenants[index],
    status,
    updatedAt: new Date().toISOString(),
  };

  return {
    ...mockTenants[index],
  };
};
