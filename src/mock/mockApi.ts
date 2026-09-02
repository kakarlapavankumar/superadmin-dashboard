import type {
  Tenant,
  CreateTenantInput,
  UpdateTenantInput,
} from "../types/tenant";

import { tenants } from "./tenants";

let mockTenants: Tenant[] = [...tenants];

export interface TenantStats {
  total: number;
  active: number;
  inactive: number;
}

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
  data: CreateTenantInput,
): Promise<Tenant> => {
  const newId =
    mockTenants.length > 0
      ? Math.max(...mockTenants.map((tenant) => tenant.id)) + 1
      : 1;

  const today = new Date().toISOString().split("T")[0];

  const newTenant: Tenant = {
    id: newId,
    name: data.name,
    code: data.code,
    domain: data.domain,
    status: data.status,
    plan: data.plan,
    users: data.users ?? 0,
    organizations: data.organizations ?? 0,
    createdAt: today,
    updatedAt: today,
  };

  mockTenants = [...mockTenants, newTenant];

  return { ...newTenant };
};

export const updateMockTenant = async (
  id: number,
  data: UpdateTenantInput,
): Promise<Tenant> => {
  const index = mockTenants.findIndex((tenant) => tenant.id === id);

  if (index === -1) {
    throw new Error("Tenant not found");
  }

  const today = new Date().toISOString().split("T")[0];

  const updatedTenant: Tenant = {
    ...mockTenants[index],

    name: data.name,
    code: data.code,
    domain: data.domain,
    status: data.status,
    plan: data.plan,

    updatedAt: today,
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

  const today = new Date().toISOString().split("T")[0];

  mockTenants[index] = {
    ...mockTenants[index],
    status,
    updatedAt: today,
  };

  return {
    ...mockTenants[index],
  };
};

export const resetMockTenants = async (): Promise<void> => {
  mockTenants = [...tenants];
};
