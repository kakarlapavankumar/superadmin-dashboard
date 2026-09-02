export type UserStatus = "Active" | "Inactive";

export type UserRole = "Super Admin" | "Admin" | "Manager" | "User";

export interface User {
  id: number;

  firstName: string;
  lastName: string;

  email: string;
  phone: string;

  role: UserRole;
  status: UserStatus;

  tenantId: number;
  tenantName: string;

  organizationId: string;
  organizationName: string;

  lastLogin: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface UserFormData {
  firstName: string;
  lastName: string;

  email: string;
  phone: string;

  role: UserRole;
  status: UserStatus;

  tenantId: number;
  tenantName: string;

  organizationId: string;
  organizationName: string;
}

export interface CreateUserInput {
  firstName: string;
  lastName: string;

  email: string;
  phone: string;

  role: UserRole;
  status: UserStatus;

  tenantId: number;
  tenantName: string;

  organizationId: string;
  organizationName: string;
}

export interface UpdateUserInput {
  firstName: string;
  lastName: string;

  email: string;
  phone: string;

  role: UserRole;
  status: UserStatus;

  tenantId: number;
  tenantName: string;

  organizationId: string;
  organizationName: string;
}

export interface UserListResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
