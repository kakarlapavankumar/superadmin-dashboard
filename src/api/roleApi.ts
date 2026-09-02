import type {
  Role,
  CreateRoleInput,
  UpdateRoleInput,
  RoleFilters,
  RoleListResponse,
} from "../types/role";

import { roles } from "../mock/roles";

let roleData: Role[] = [...roles];

/* ============================================================
   GET ROLES
   ============================================================ */

export async function getRoles(
  filters: RoleFilters = {},
): Promise<RoleListResponse> {
  const { search = "", status = "all", page = 1, limit = 10 } = filters;

  let result = [...roleData];

  if (search.trim()) {
    const value = search.toLowerCase().trim();

    result = result.filter(
      (role) =>
        role.name.toLowerCase().includes(value) ||
        role.code.toLowerCase().includes(value) ||
        role.description.toLowerCase().includes(value),
    );
  }

  if (status !== "all") {
    result = result.filter((role) => role.status === status);
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
   GET ROLE
   ============================================================ */

export async function getRole(id: number): Promise<Role> {
  const role = roleData.find((item) => item.id === id);

  if (!role) {
    throw new Error("Role not found");
  }

  return { ...role };
}

/* ============================================================
   CREATE ROLE
   ============================================================ */

export async function createRole(input: CreateRoleInput): Promise<Role> {
  const newId =
    roleData.length > 0 ? Math.max(...roleData.map((role) => role.id)) + 1 : 1;

  const today = new Date().toISOString().split("T")[0];

  const newRole: Role = {
    id: newId,
    name: input.name,
    code: input.code,
    description: input.description,
    status: input.status,
    permissions: input.permissions,
    users: input.users ?? 0,
    createdAt: today,
    updatedAt: today,
  };

  roleData = [newRole, ...roleData];

  return { ...newRole };
}

/* ============================================================
   UPDATE ROLE
   ============================================================ */

export async function updateRole(
  id: number,
  input: UpdateRoleInput,
): Promise<Role> {
  const index = roleData.findIndex((role) => role.id === id);

  if (index === -1) {
    throw new Error("Role not found");
  }

  const today = new Date().toISOString().split("T")[0];

  const updatedRole: Role = {
    ...roleData[index],
    name: input.name,
    code: input.code,
    description: input.description,
    status: input.status,
    permissions: input.permissions,
    updatedAt: today,
  };

  roleData[index] = updatedRole;

  return { ...updatedRole };
}

/* ============================================================
   DELETE ROLE
   ============================================================ */

export async function deleteRole(id: number): Promise<void> {
  const exists = roleData.some((role) => role.id === id);

  if (!exists) {
    throw new Error("Role not found");
  }

  roleData = roleData.filter((role) => role.id !== id);
}

/* ============================================================
   ACTIVATE ROLE
   ============================================================ */

export async function activateRole(id: number): Promise<Role> {
  const role = await getRole(id);

  return updateRole(id, {
    name: role.name,
    code: role.code,
    description: role.description,
    status: "Active",
    permissions: role.permissions,
  });
}

/* ============================================================
   DEACTIVATE ROLE
   ============================================================ */

export async function deactivateRole(id: number): Promise<Role> {
  const role = await getRole(id);

  return updateRole(id, {
    name: role.name,
    code: role.code,
    description: role.description,
    status: "Inactive",
    permissions: role.permissions,
  });
}

/* ============================================================
   RESET
   ============================================================ */

export function resetRoles(): void {
  roleData = [...roles];
}
