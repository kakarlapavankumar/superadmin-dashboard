import type {
  Organization,
  CreateOrganizationInput,
  UpdateOrganizationInput,
} from "../types/organization";

import {
  getMockOrganizations,
  getMockOrganization,
  createMockOrganization,
  updateMockOrganization,
  deleteMockOrganization,
  toggleMockOrganizationStatus,
} from "../mock/organizations";

export const getOrganizations = async (): Promise<Organization[]> => {
  return Promise.resolve(getMockOrganizations());
};

export const getOrganization = async (
  id: string,
): Promise<Organization | undefined> => {
  return Promise.resolve(getMockOrganization(id));
};

export const createOrganization = async (
  data: CreateOrganizationInput,
): Promise<Organization> => {
  return Promise.resolve(createMockOrganization(data));
};

export const updateOrganization = async (
  id: string,
  data: UpdateOrganizationInput,
): Promise<Organization | undefined> => {
  return Promise.resolve(updateMockOrganization(id, data));
};

export const deleteOrganization = async (id: string): Promise<boolean> => {
  return Promise.resolve(deleteMockOrganization(id));
};

export const toggleOrganizationStatus = async (
  id: string,
): Promise<Organization | undefined> => {
  return Promise.resolve(toggleMockOrganizationStatus(id));
};
