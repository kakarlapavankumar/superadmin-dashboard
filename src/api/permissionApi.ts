import type {
  Permission,
  CreatePermissionInput,
  UpdatePermissionInput,
  PermissionFilters,
  PermissionListResponse,
} from "../types/permission";

import { permissions } from "../mock/permission";

let permissionData: Permission[] = [...permissions];

/* ============================================================
   GET PERMISSIONS
   ============================================================ */

export async function getPermissions(
  filters: PermissionFilters = {},
): Promise<PermissionListResponse> {
  const {
    search = "",
    module = "all",
    action = "all",
    status = "all",
    page = 1,
    limit = 10,
  } = filters;

  let result = [...permissionData];

  if (search.trim()) {
    const value = search.toLowerCase().trim();

    result = result.filter(
      (permission) =>
        permission.name.toLowerCase().includes(value) ||
        permission.code.toLowerCase().includes(value) ||
        permission.description.toLowerCase().includes(value),
    );
  }

  if (module !== "all") {
    result = result.filter((permission) => permission.module === module);
  }

  if (action !== "all") {
    result = result.filter((permission) => permission.action === action);
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

/* ============================================================
   GET PERMISSION
   ============================================================ */

export async function getPermission(id: number): Promise<Permission> {
  const permission = permissionData.find((item) => item.id === id);

  if (!permission) {
    throw new Error("Permission not found");
  }

  return {
    ...permission,
  };
}

/* ============================================================
   CREATE PERMISSION
   ============================================================ */

export async function createPermission(
  input: CreatePermissionInput,
): Promise<Permission> {
  const newId =
    permissionData.length > 0
      ? Math.max(...permissionData.map((permission) => permission.id)) + 1
      : 1;

  const today = new Date().toISOString().split("T")[0];

  const newPermission: Permission = {
    id: newId,
    name: input.name,
    code: input.code,
    description: input.description,
    module: input.module,
    action: input.action,
    status: input.status,
    roles: input.roles ?? 0,
    createdAt: today,
    updatedAt: today,
  };

  permissionData = [newPermission, ...permissionData];

  return {
    ...newPermission,
  };
}

/* ============================================================
   UPDATE PERMISSION
   ============================================================ */

export async function updatePermission(
  id: number,
  input: UpdatePermissionInput,
): Promise<Permission> {
  const index = permissionData.findIndex((permission) => permission.id === id);

  if (index === -1) {
    throw new Error("Permission not found");
  }

  const today = new Date().toISOString().split("T")[0];

  const updatedPermission: Permission = {
    ...permissionData[index],
    name: input.name,
    code: input.code,
    description: input.description,
    module: input.module,
    action: input.action,
    status: input.status,
    updatedAt: today,
  };

  permissionData[index] = updatedPermission;

  return {
    ...updatedPermission,
  };
}

/* ============================================================
   DELETE PERMISSION
   ============================================================ */

export async function deletePermission(id: number): Promise<void> {
  const exists = permissionData.some((permission) => permission.id === id);

  if (!exists) {
    throw new Error("Permission not found");
  }

  permissionData = permissionData.filter((permission) => permission.id !== id);
}

/* ============================================================
   ACTIVATE PERMISSION
   ============================================================ */

export async function activatePermission(id: number): Promise<Permission> {
  const permission = await getPermission(id);

  return updatePermission(id, {
    name: permission.name,
    code: permission.code,
    description: permission.description,
    module: permission.module,
    action: permission.action,
    status: "Active",
  });
}

/* ============================================================
   DEACTIVATE PERMISSION
   ============================================================ */

export async function deactivatePermission(id: number): Promise<Permission> {
  const permission = await getPermission(id);

  return updatePermission(id, {
    name: permission.name,
    code: permission.code,
    description: permission.description,
    module: permission.module,
    action: permission.action,
    status: "Inactive",
  });
}

/* ============================================================
   RESET
   ============================================================ */

export function resetPermissions(): void {
  permissionData = [...permissions];
}
