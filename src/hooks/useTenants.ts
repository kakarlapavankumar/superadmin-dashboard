import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  activateTenant,
  createTenant,
  deactivateTenant,
  getTenant,
  getTenantStats,
  getTenants,
  updateTenant,
} from "../api/tenantApi";

import type { CreateTenantInput, UpdateTenantInput } from "../types/tenant";

export function useTenants() {
  return useQuery({
    queryKey: ["tenants"],
    queryFn: getTenants,
  });
}

export function useTenant(id: number) {
  return useQuery({
    queryKey: ["tenant", id],
    queryFn: () => getTenant(id),
    enabled: Number.isFinite(id),
  });
}

export function useTenantStats(id: number) {
  return useQuery({
    queryKey: ["tenant-stats", id],
    queryFn: () => getTenantStats(),
    enabled: Number.isFinite(id),
  });
}

export function useCreateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTenantInput) => createTenant(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tenants"],
      });
    },
  });
}

export function useUpdateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTenantInput }) =>
      updateTenant(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tenants"],
      });

      queryClient.invalidateQueries({
        queryKey: ["tenant", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["tenant-stats", variables.id],
      });
    },
  });
}

export function useActivateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => activateTenant(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["tenants"],
      });

      queryClient.invalidateQueries({
        queryKey: ["tenant", id],
      });
    },
  });
}

export function useDeactivateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deactivateTenant(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["tenants"],
      });

      queryClient.invalidateQueries({
        queryKey: ["tenant", id],
      });
    },
  });
}
