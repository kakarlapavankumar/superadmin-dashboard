import type {
  ApiKey,
  ApiKeyFilters,
  ApiManagementOverview,
  ApiUsageMetric,
  CreateApiKeyRequest,
} from "../types/apiManagement";

import {
  mockApiKeys,
  mockApiManagementOverview,
  mockApiUsageMetrics,
} from "../mock/apiManagement";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let apiKeys = [...mockApiKeys];

export const apiManagementApi = {
  async getOverview(): Promise<ApiManagementOverview> {
    await delay(500);

    return mockApiManagementOverview;
  },

  async getApiKeys(filters?: ApiKeyFilters): Promise<ApiKey[]> {
    await delay(500);

    let result = [...apiKeys];

    if (filters?.search) {
      const search = filters.search.toLowerCase();

      result = result.filter(
        (apiKey) =>
          apiKey.name.toLowerCase().includes(search) ||
          apiKey.owner.toLowerCase().includes(search) ||
          apiKey.ownerEmail.toLowerCase().includes(search) ||
          apiKey.keyPrefix.toLowerCase().includes(search),
      );
    }

    if (filters?.status && filters.status !== "all") {
      result = result.filter((apiKey) => apiKey.status === filters.status);
    }

    if (filters?.environment && filters.environment !== "all") {
      result = result.filter(
        (apiKey) => apiKey.environment === filters.environment,
      );
    }

    return result;
  },

  async getApiKey(id: string): Promise<ApiKey | undefined> {
    await delay(400);

    return apiKeys.find((apiKey) => apiKey.id === id);
  },

  async createApiKey(payload: CreateApiKeyRequest): Promise<ApiKey> {
    await delay(600);

    const newApiKey: ApiKey = {
      id: `api_${Date.now()}`,
      name: payload.name,
      keyPrefix:
        payload.environment === "production"
          ? `sk_live_${Math.random().toString(36).substring(2, 6)}`
          : `sk_test_${Math.random().toString(36).substring(2, 6)}`,
      environment: payload.environment,
      status: "active",
      owner: payload.owner,
      ownerEmail: payload.ownerEmail,
      createdAt: new Date().toISOString(),
      expiresAt: payload.expiresAt,
      requestCount: 0,
      rateLimit: payload.rateLimit,
    };

    apiKeys = [newApiKey, ...apiKeys];

    return newApiKey;
  },

  async revokeApiKey(id: string): Promise<void> {
    await delay(500);

    apiKeys = apiKeys.map((apiKey) =>
      apiKey.id === id
        ? {
            ...apiKey,
            status: "revoked",
          }
        : apiKey,
    );
  },

  async deleteApiKey(id: string): Promise<void> {
    await delay(500);

    apiKeys = apiKeys.filter((apiKey) => apiKey.id !== id);
  },

  async getUsageMetrics(): Promise<ApiUsageMetric[]> {
    await delay(500);

    return mockApiUsageMetrics;
  },
};
