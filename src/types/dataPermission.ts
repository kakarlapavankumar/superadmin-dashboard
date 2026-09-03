export type DataPermissionStatus = "Active" | "Inactive";

export type DataResource =
  | "Tenants"
  | "Organizations"
  | "Users"
  | "Roles"
  | "Permissions"
  | "Reports";

export type DataScope = "Global" | "Tenant" | "Organization" | "Own";

export type DataAccessLevel = "Read" | "ReadWrite";

export interface DataPermission {
  id: number;
  name: string;
  code: string;
  resource: DataResource;
  scope: DataScope;
  accessLevel: DataAccessLevel;
  description: string;
  status: DataPermissionStatus;
  assignedRoles: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDataPermissionInput {
  name: string;
  code: string;
  resource: DataResource;
  scope: DataScope;
  accessLevel: DataAccessLevel;
  description: string;
  status: DataPermissionStatus;
  assignedRoles?: number;
}

export interface UpdateDataPermissionInput {
  name: string;
  code: string;
  resource: DataResource;
  scope: DataScope;
  accessLevel: DataAccessLevel;
  description: string;
  status: DataPermissionStatus;
  assignedRoles?: number;
}

export interface DataPermissionFilters {
  search?: string;
  resource?: string;
  scope?: string;
  accessLevel?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface DataPermissionListResponse {
  data: DataPermission[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
