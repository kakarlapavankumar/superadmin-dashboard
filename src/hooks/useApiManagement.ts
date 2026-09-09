import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiManagementApi } from "../api/apiManagementApi";

import type {
  ApiKeyFilters,
  CreateApiKeyRequest,
} from "../types/apiManagement";

export const useApiManagementOverview = () => {
  return useQuery({
    queryKey: ["api-management", "overview"],
    queryFn: apiManagementApi.getOverview,
  });
};

export const useApiKeys = (filters?: ApiKeyFilters) => {
  return useQuery({
    queryKey: ["api-management", "keys", filters],
    queryFn: () => apiManagementApi.getApiKeys(filters),
  });
};

export const useApiKey = (id: string) => {
  return useQuery({
    queryKey: ["api-management", "key", id],
    queryFn: () => apiManagementApi.getApiKey(id),
    enabled: Boolean(id),
  });
};

export const useApiUsageMetrics = () => {
  return useQuery({
    queryKey: ["api-management", "usage"],
    queryFn: apiManagementApi.getUsageMetrics,
  });
};

export const useCreateApiKey = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateApiKeyRequest) =>
      apiManagementApi.createApiKey(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["api-management"],
      });
    },
  });
};

export const useRevokeApiKey = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiManagementApi.revokeApiKey(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["api-management"],
      });
    },
  });
};

export const useDeleteApiKey = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiManagementApi.deleteApiKey(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["api-management"],
      });
    },
  });
};
