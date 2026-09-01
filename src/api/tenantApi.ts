import type {
  Tenant,
  TenantStats,
  CreateTenantRequest,
  UpdateTenantRequest,
} from "../types/tenant";

import {
  getMockTenants,
  getMockTenant,
  getMockTenantStats,
  createMockTenant,
  updateMockTenant,
  activateMockTenant,
  deactivateMockTenant,
  deleteMockTenant,
} from "../mock/mockApi";

// ============================================================
// GET ALL TENANTS
// ============================================================

export async function getTenants(): Promise<Tenant[]> {
  return getMockTenants();
}

// ============================================================
// GET TENANT
// ============================================================

export async function getTenant(id: string): Promise<Tenant> {
  return getMockTenant(id);
}

// ============================================================
// GET TENANT STATS
// ============================================================

export async function getTenantStats(): Promise<TenantStats> {
  return getMockTenantStats();
}

// ============================================================
// CREATE TENANT
// ============================================================

export async function createTenant(data: CreateTenantRequest): Promise<Tenant> {
  return createMockTenant(data);
}

// ============================================================
// UPDATE TENANT
// ============================================================

export async function updateTenant(
  id: string,
  data: UpdateTenantRequest,
): Promise<Tenant> {
  return updateMockTenant(id, data);
}

// ============================================================
// ACTIVATE
// ============================================================

export async function activateTenant(id: string): Promise<Tenant> {
  return activateMockTenant(id);
}

// ============================================================
// DEACTIVATE
// ============================================================

export async function deactivateTenant(id: string): Promise<Tenant> {
  return deactivateMockTenant(id);
}

// ============================================================
// DELETE
// ============================================================

export async function deleteTenant(id: string): Promise<void> {
  return deleteMockTenant(id);
}
