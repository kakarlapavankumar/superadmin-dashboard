import type { Organization, OrganizationFormData } from "../types/organization";

import {
  getMockOrganizations,
  getMockOrganization,
  createMockOrganization,
  updateMockOrganization,
  deleteMockOrganization,
  toggleMockOrganizationStatus,
} from "../mock/mockApi";

// ============================================================
// GET ALL ORGANIZATIONS
// ============================================================

export async function getOrganizations(): Promise<Organization[]> {
  return getMockOrganizations();
}

// ============================================================
// GET SINGLE ORGANIZATION
// ============================================================

export async function getOrganization(id: string): Promise<Organization> {
  return getMockOrganization(id);
}

// ============================================================
// CREATE ORGANIZATION
// ============================================================

export async function createOrganization(
  data: OrganizationFormData,
): Promise<Organization> {
  return createMockOrganization(data);
}

// ============================================================
// UPDATE ORGANIZATION
// ============================================================

export async function updateOrganization(
  id: string,
  data: OrganizationFormData,
): Promise<Organization> {
  return updateMockOrganization(id, data);
}

// ============================================================
// DELETE ORGANIZATION
// ============================================================

export async function deleteOrganization(id: string): Promise<void> {
  return deleteMockOrganization(id);
}

// ============================================================
// TOGGLE STATUS
// ============================================================

export async function toggleOrganizationStatus(
  id: string,
): Promise<Organization> {
  return toggleMockOrganizationStatus(id);
}
