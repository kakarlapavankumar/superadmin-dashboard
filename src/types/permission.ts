export type PermissionStatus = "Active" | "Inactive";

export type PermissionAction = "View" | "Create" | "Edit" | "Delete" | "Manage";

export type PermissionModule =
  | "Dashboard"
  | "Tenants"
  | "Organizations"
  | "Users"
  | "Roles"
  | "Permissions";

export interface Permission {
  id: number;
  name: string;
  code: string;
  description: string;
  module: PermissionModule;
  action: PermissionAction;
  status: PermissionStatus;
  roles: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePermissionInput {
  name: string;
  code: string;
  description: string;
  module: PermissionModule;
  action: PermissionAction;
  status: PermissionStatus;
  roles?: number;
}

export interface UpdatePermissionInput {
  name: string;
  code: string;
  description: string;
  module: PermissionModule;
  action: PermissionAction;
  status: PermissionStatus;
}

export interface PermissionFormData {
  name: string;
  code: string;
  description: string;
  module: PermissionModule;
  action: PermissionAction;
  status: PermissionStatus;
}

export interface PermissionFilters {
  search?: string;
  module?: string;
  action?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface PermissionListResponse {
  data: Permission[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
