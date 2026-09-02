export type RoleStatus = "Active" | "Inactive";

export type Permission =
  | "dashboard.view"
  | "tenants.view"
  | "tenants.create"
  | "tenants.edit"
  | "tenants.delete"
  | "organizations.view"
  | "organizations.create"
  | "organizations.edit"
  | "organizations.delete"
  | "users.view"
  | "users.create"
  | "users.edit"
  | "users.delete"
  | "roles.view"
  | "roles.create"
  | "roles.edit"
  | "roles.delete";

export interface Role {
  id: number;
  name: string;
  code: string;
  description: string;
  status: RoleStatus;
  permissions: Permission[];
  users: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoleInput {
  name: string;
  code: string;
  description: string;
  status: RoleStatus;
  permissions: Permission[];
  users?: number;
}

export interface UpdateRoleInput {
  name: string;
  code: string;
  description: string;
  status: RoleStatus;
  permissions: Permission[];
}

export interface RoleFormData {
  name: string;
  code: string;
  description: string;
  status: RoleStatus;
  permissions: Permission[];
}

export interface RoleFilters {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface RoleListResponse {
  data: Role[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
