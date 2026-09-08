export type SecurityStatus = "secure" | "warning" | "critical";

export type SecurityEventType =
  | "login"
  | "logout"
  | "failed_login"
  | "password_change"
  | "mfa"
  | "api_key"
  | "permission"
  | "security_setting";

export type SecurityEventSeverity = "low" | "medium" | "high" | "critical";

export interface SecurityOverview {
  securityScore: number;
  activeSessions: number;
  failedLogins24h: number;
  suspiciousActivities: number;
  mfaEnabledUsers: number;
  totalUsers: number;
  activeApiKeys: number;
  expiredApiKeys: number;
}

export interface SecuritySetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: "authentication" | "access" | "api" | "session";
  lastUpdated: string;
}

export interface SecurityEvent {
  id: string;
  type: SecurityEventType;
  severity: SecurityEventSeverity;
  title: string;
  description: string;
  userId?: string;
  userName?: string;
  email?: string;
  ipAddress?: string;
  location?: string;
  timestamp: string;
  resolved: boolean;
}

export interface ActiveSession {
  id: string;
  userId: string;
  userName: string;
  email: string;
  device: string;
  browser: string;
  ipAddress: string;
  location: string;
  lastActivity: string;
  current: boolean;
}
