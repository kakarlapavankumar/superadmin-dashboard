export type ApiKeyStatus = "active" | "revoked" | "expired";

export type ApiEnvironment = "production" | "sandbox";

export interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  environment: ApiEnvironment;
  status: ApiKeyStatus;
  owner: string;
  ownerEmail: string;
  createdAt: string;
  lastUsedAt?: string;
  expiresAt?: string;
  requestCount: number;
  rateLimit: number;
}

export interface ApiManagementOverview {
  totalApiKeys: number;
  activeApiKeys: number;
  revokedApiKeys: number;
  expiredApiKeys: number;
  requestsToday: number;
  requestsThisMonth: number;
  averageResponseTime: number;
  errorRate: number;
}

export interface ApiUsageMetric {
  timestamp: string;
  requests: number;
  successfulRequests: number;
  failedRequests: number;
  responseTime: number;
}

export interface ApiKeyFilters {
  search?: string;
  status?: ApiKeyStatus | "all";
  environment?: ApiEnvironment | "all";
}

export interface CreateApiKeyRequest {
  name: string;
  environment: ApiEnvironment;
  owner: string;
  ownerEmail: string;
  rateLimit: number;
  expiresAt?: string;
}
