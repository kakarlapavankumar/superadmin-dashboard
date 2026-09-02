import type {
  Tenant,
  CreateTenantInput,
  UpdateTenantInput,
} from "../types/tenant";

import { tenants } from "../mock/tenants";

let tenantData: Tenant[] = [...tenants];

export interface TenantFilters {
  search?: string;
  status?: string;
  plan?: string;
  page?: number;
  limit?: number;
}

export interface TenantListResponse {
  data: Tenant[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/* --------------------------------
   GET ALL TENANTS
--------------------------------- */

export const getTenants = async (
  filters: TenantFilters = {},
): Promise<TenantListResponse> => {
  const {
    search = "",
    status = "all",
    plan = "all",
    page = 1,
    limit = 10,
  } = filters;

  let result = [...tenantData];

  /* Search */

  if (search.trim()) {
    const value = search.toLowerCase().trim();

    result = result.filter(
      (tenant) =>
        tenant.name.toLowerCase().includes(value) ||
        tenant.code.toLowerCase().includes(value) ||
        tenant.domain.toLowerCase().includes(value),
    );
  }

  /* Status Filter */

  if (status !== "all") {
    result = result.filter((tenant) => tenant.status === status);
  }

  /* Plan Filter */

  if (plan !== "all") {
    result = result.filter((tenant) => tenant.plan === plan);
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
};

/* --------------------------------
   GET SINGLE TENANT
--------------------------------- */

export const getTenant = async (id: number): Promise<Tenant | undefined> => {
  return tenantData.find((tenant) => tenant.id === id);
};

/* --------------------------------
   CREATE TENANT
--------------------------------- */

export const createTenant = async (
  input: CreateTenantInput,
): Promise<Tenant> => {
  const newId =
    tenantData.length > 0
      ? Math.max(...tenantData.map((tenant) => tenant.id)) + 1
      : 1;

  const today = new Date().toISOString().split("T")[0];

  const newTenant: Tenant = {
    id: newId,

    name: input.name,

    code: input.code,

    domain: input.domain,

    status: input.status,

    plan: input.plan,

    users: input.users ?? 0,

    organizations: input.organizations ?? 0,

    createdAt: today,

    updatedAt: today,
  };

  tenantData.push(newTenant);

  return newTenant;
};

/* --------------------------------
   UPDATE TENANT
--------------------------------- */

export const updateTenant = async (
  id: number,
  input: UpdateTenantInput,
): Promise<Tenant> => {
  const index = tenantData.findIndex((tenant) => tenant.id === id);

  if (index === -1) {
    throw new Error("Tenant not found");
  }

  const today = new Date().toISOString().split("T")[0];

  const updatedTenant: Tenant = {
    ...tenantData[index],

    name: input.name,

    code: input.code,

    domain: input.domain,

    status: input.status,

    plan: input.plan,

    updatedAt: today,
  };

  tenantData[index] = updatedTenant;

  return updatedTenant;
};

/* --------------------------------
   ACTIVATE TENANT
--------------------------------- */

export const activateTenant = async (id: number): Promise<Tenant> => {
  const index = tenantData.findIndex((tenant) => tenant.id === id);

  if (index === -1) {
    throw new Error("Tenant not found");
  }

  const today = new Date().toISOString().split("T")[0];

  tenantData[index] = {
    ...tenantData[index],

    status: "Active",

    updatedAt: today,
  };

  return tenantData[index];
};

/* --------------------------------
   DEACTIVATE TENANT
--------------------------------- */

export const deactivateTenant = async (id: number): Promise<Tenant> => {
  const index = tenantData.findIndex((tenant) => tenant.id === id);

  if (index === -1) {
    throw new Error("Tenant not found");
  }

  const today = new Date().toISOString().split("T")[0];

  tenantData[index] = {
    ...tenantData[index],

    status: "Inactive",

    updatedAt: today,
  };

  return tenantData[index];
};

/* --------------------------------
   TOGGLE TENANT STATUS
--------------------------------- */

export const toggleTenantStatus = async (id: number): Promise<Tenant> => {
  const index = tenantData.findIndex((tenant) => tenant.id === id);

  if (index === -1) {
    throw new Error("Tenant not found");
  }

  const today = new Date().toISOString().split("T")[0];

  const currentTenant = tenantData[index];

  tenantData[index] = {
    ...currentTenant,

    status: currentTenant.status === "Active" ? "Inactive" : "Active",

    updatedAt: today,
  };

  return tenantData[index];
};

/* --------------------------------
   DELETE TENANT
--------------------------------- */

export const deleteTenant = async (id: number): Promise<void> => {
  const exists = tenantData.some((tenant) => tenant.id === id);

  if (!exists) {
    throw new Error("Tenant not found");
  }

  tenantData = tenantData.filter((tenant) => tenant.id !== id);
};

/* --------------------------------
   RESET TENANTS
--------------------------------- */

export const resetTenants = async (): Promise<void> => {
  tenantData = [...tenants];
};
