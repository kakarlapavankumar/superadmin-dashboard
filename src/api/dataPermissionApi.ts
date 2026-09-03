import type {
  DataPermission,
  CreateDataPermissionInput,
  UpdateDataPermissionInput,
  DataPermissionFilters,
  DataPermissionListResponse,
} from "../types/dataPermission";

import { dataPermissions } from "../mock/dataPermissions";

let dataPermissionData: DataPermission[] = [...dataPermissions];

export async function getDataPermissions(
  filters: DataPermissionFilters = {},
): Promise<DataPermissionListResponse> {
  const {
    search = "",
    resource = "all",
    scope = "all",
    accessLevel = "all",
    status = "all",
    page = 1,
    limit = 10,
  } = filters;

  let result = [...dataPermissionData];

  if (search.trim()) {
    const value = search.toLowerCase().trim();

    result = result.filter(
      (permission) =>
        permission.name.toLowerCase().includes(value) ||
        permission.code.toLowerCase().includes(value) ||
        permission.description.toLowerCase().includes(value),
    );
  }

  if (resource !== "all") {
    result = result.filter((permission) => permission.resource === resource);
  }

  if (scope !== "all") {
    result = result.filter((permission) => permission.scope === scope);
  }

  if (accessLevel !== "all") {
    result = result.filter(
      (permission) => permission.accessLevel === accessLevel,
    );
  }

  if (status !== "all") {
    result = result.filter((permission) => permission.status === status);
  }

  const total = result.length;

  const totalPages = total === 0 ? 1 : Math.ceil(total / limit);

  const safePage = Math.min(Math.max(page, 1), totalPages);

  const start = (safePage - 1) * limit;

  const data = result.slice(start, start + limit);

  return {
    data,
    total,
    page: safePage,
    limit,
    totalPages,
  };
}

export async function getDataPermission(id: number): Promise<DataPermission> {
  const permission = dataPermissionData.find((item) => item.id === id);

  if (!permission) {
    throw new Error(`Data permission with ID ${id} not found.`);
  }

  return permission;
}

export async function createDataPermission(
  input: CreateDataPermissionInput,
): Promise<DataPermission> {
  const duplicate = dataPermissionData.some(
    (permission) => permission.code.toLowerCase() === input.code.toLowerCase(),
  );

  if (duplicate) {
    throw new Error("A data permission with this code already exists.");
  }

  const now = new Date().toISOString();

  const newId =
    dataPermissionData.length > 0
      ? Math.max(...dataPermissionData.map((item) => item.id)) + 1
      : 1;

  const newPermission: DataPermission = {
    id: newId,
    name: input.name.trim(),
    code: input.code.trim().toUpperCase(),
    resource: input.resource,
    scope: input.scope,
    accessLevel: input.accessLevel,
    description: input.description.trim(),
    status: input.status,
    assignedRoles: input.assignedRoles ?? 0,
    createdAt: now,
    updatedAt: now,
  };

  dataPermissionData = [newPermission, ...dataPermissionData];

  return newPermission;
}

export async function updateDataPermission(
  id: number,
  input: UpdateDataPermissionInput,
): Promise<DataPermission> {
  const index = dataPermissionData.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error(`Data permission with ID ${id} not found.`);
  }

  const duplicate = dataPermissionData.some(
    (permission) =>
      permission.id !== id &&
      permission.code.toLowerCase() === input.code.toLowerCase(),
  );

  if (duplicate) {
    throw new Error("A data permission with this code already exists.");
  }

  const existing = dataPermissionData[index];

  const updatedPermission: DataPermission = {
    ...existing,
    name: input.name.trim(),
    code: input.code.trim().toUpperCase(),
    resource: input.resource,
    scope: input.scope,
    accessLevel: input.accessLevel,
    description: input.description.trim(),
    status: input.status,
    assignedRoles: input.assignedRoles ?? existing.assignedRoles,
    updatedAt: new Date().toISOString(),
  };

  dataPermissionData[index] = updatedPermission;

  return updatedPermission;
}

export async function deleteDataPermission(id: number): Promise<void> {
  const exists = dataPermissionData.some((item) => item.id === id);

  if (!exists) {
    throw new Error(`Data permission with ID ${id} not found.`);
  }

  dataPermissionData = dataPermissionData.filter((item) => item.id !== id);
}

export async function activateDataPermission(
  id: number,
): Promise<DataPermission> {
  return updateStatus(id, "Active");
}

export async function deactivateDataPermission(
  id: number,
): Promise<DataPermission> {
  return updateStatus(id, "Inactive");
}

function updateStatus(
  id: number,
  status: DataPermission["status"],
): DataPermission {
  const index = dataPermissionData.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error(`Data permission with ID ${id} not found.`);
  }

  dataPermissionData[index] = {
    ...dataPermissionData[index],
    status,
    updatedAt: new Date().toISOString(),
  };

  return dataPermissionData[index];
}

export async function resetDataPermissions(): Promise<void> {
  dataPermissionData = [...dataPermissions];
}
