export type AuditLogStatus = "success" | "failed";

export type AuditLogAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "LOGIN"
  | "LOGOUT"
  | "ACTIVATE"
  | "DEACTIVATE"
  | "EXPORT"
  | "VIEW"
  | "RESET_PASSWORD"
  | "CHANGE_PERMISSION";

export type AuditLogResource =
  | "Tenant"
  | "Organization"
  | "User"
  | "Role"
  | "Permission"
  | "Subscription"
  | "API Key"
  | "Security"
  | "Notification"
  | "Report";

export interface AuditLog {
  id: string;
  timestamp: string;

  userId: string;
  userName: string;
  userEmail: string;

  action: AuditLogAction;
  resource: AuditLogResource;
  resourceId: string;

  description: string;

  status: AuditLogStatus;

  ipAddress: string;
  location: string;

  userAgent: string;

  changes?: Record<string, unknown>;

  metadata?: Record<string, unknown>;
}
