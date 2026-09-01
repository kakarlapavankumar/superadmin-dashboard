export type UserStatus = "Active" | "Inactive";

export type UserRole =
  | "Super Admin"
  | "Tenant Admin"
  | "Organization Admin"
  | "Manager"
  | "Employee";

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  tenant: string;
  organization: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: string;
  createdAt: string;
}
