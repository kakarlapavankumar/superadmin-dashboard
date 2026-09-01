import type {
  Organization,
  OrganizationFormData,
} from "../types/organization";

import { organizations as initialOrganizations } from "../mock/organizations";

const STORAGE_KEY = "onecloud-organizations";

const delay = (ms = 300) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

function loadOrganizations(): Organization[] {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(initialOrganizations)
    );

    return [...initialOrganizations];
  }

  try {
    const parsed = JSON.parse(stored);

    if (Array.isArray(parsed)) {
      return parsed;
    }

    return [...initialOrganizations];
  } catch {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(initialOrganizations)
    );

    return [...initialOrganizations];
  }
}

function saveOrganizations(data: Organization[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export async function getOrganizations(): Promise<Organization[]> {
  await delay();

  return loadOrganizations();
}

export async function getOrganization(
  id: string
): Promise<Organization> {
  await delay();

  const data = loadOrganizations();

  const organization = data.find((item) => item.id === id);

  if (!organization) {
    throw new Error("Organization not found");
  }

  return organization;
}

export async function createOrganization(
  formData: OrganizationFormData
): Promise<Organization> {
  await delay();

  const data = loadOrganizations();

  const exists = data.some(
    (organization) =>
      organization.code.toLowerCase() === formData.code.toLowerCase()
  );

  if (exists) {
    throw new Error("Organization code already exists");
  }

  const now = new Date().toISOString();

  const newOrganization: Organization = {
    id: crypto.randomUUID(),
    name: formData.name,
    code: formData.code,
    tenantId: formData.tenantId,
    description: formData.description,
    industry: formData.industry,
    location: formData.location,
    email: formData.email,
    phone: formData.phone,
    employees: Number(formData.employees),
    status: "Active",
    createdAt: now,
    updatedAt: now,
  };

  const updated = [...data, newOrganization];

  saveOrganizations(updated);

  return newOrganization;
}

export async function updateOrganization(
  id: string,
  formData: OrganizationFormData
): Promise<Organization> {
  await delay();

  const data = loadOrganizations();

  const index = data.findIndex(
    (organization) => organization.id === id
  );

  if (index === -1) {
    throw new Error("Organization not found");
  }

  const duplicateCode = data.some(
    (organization) =>
      organization.id !== id &&
      organization.code.toLowerCase() === formData.code.toLowerCase()
  );

  if (duplicateCode) {
    throw new Error("Organization code already exists");
  }

  const updatedOrganization: Organization = {
    ...data[index],
    name: formData.name,
    code: formData.code,
    tenantId: formData.tenantId,
    description: formData.description,
    industry: formData.industry,
    location: formData.location,
    email: formData.email,
    phone: formData.phone,
    employees: Number(formData.employees),
    updatedAt: new Date().toISOString(),
  };

  const updated = [...data];

  updated[index] = updatedOrganization;

  saveOrganizations(updated);

  return updatedOrganization;
}

export async function deleteOrganization(
  id: string
): Promise<void> {
  await delay();

  const data = loadOrganizations();

  const exists = data.some(
    (organization) => organization.id === id
  );

  if (!exists) {
    throw new Error("Organization not found");
  }

  const updated = data.filter(
    (organization) => organization.id !== id
  );

  saveOrganizations(updated);
}

export async function toggleOrganizationStatus(
  id: string
): Promise<Organization> {
  await delay();

  const data = loadOrganizations();

  const index = data.findIndex(
    (organization) => organization.id === id
  );

  if (index === -1) {
    throw new Error("Organization not found");
  }

  const organization = data[index];

  const updatedOrganization: Organization = {
    ...organization,
    status:
      organization.status === "Active"
        ? "Inactive"
        : "Active",
    updatedAt: new Date().toISOString(),
  };

  const updated = [...data];

  updated[index] = updatedOrganization;

  saveOrganizations(updated);

  return updatedOrganization;
}