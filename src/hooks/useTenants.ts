import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getTenants,
  getTenant,
  createTenant,
  updateTenant,
  activateTenant,
  deactivateTenant,
  deleteTenant,
} from "../api/tenantApi";

import type { CreateTenantInput, UpdateTenantInput } from "../types/tenant";

export interface TenantFilters {
  search?: string;
  status?: string;
  plan?: string;
  page?: number;
  limit?: number;
}

const TENANTS_KEY = ["tenants"];

export function useTenants(filters?: TenantFilters) {
  return useQuery({
    queryKey: [...TENANTS_KEY, filters],
    queryFn: () => getTenants(filters),
  });
}

export function useTenant(id: string | number | undefined) {
  const tenantId = id === undefined ? undefined : Number(id);

  return useQuery({
    queryKey: ["tenant", tenantId],
    queryFn: () => getTenant(tenantId as number),
    enabled: tenantId !== undefined && Number.isFinite(tenantId),
  });
}

export function useCreateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTenantInput) => createTenant(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TENANTS_KEY,
      });
    },
  });
}

export function useUpdateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string | number;
      data: UpdateTenantInput;
    }) => updateTenant(Number(id), data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: TENANTS_KEY,
      });

      queryClient.invalidateQueries({
        queryKey: ["tenant", Number(variables.id)],
      });
    },
  });
}

export function useActivateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => activateTenant(Number(id)),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: TENANTS_KEY,
      });

      queryClient.invalidateQueries({
        queryKey: ["tenant", Number(id)],
      });
    },
  });
}

export function useDeactivateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => deactivateTenant(Number(id)),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: TENANTS_KEY,
      });

      queryClient.invalidateQueries({
        queryKey: ["tenant", Number(id)],
      });
    },
  });
}

export function useDeleteTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => deleteTenant(Number(id)),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TENANTS_KEY,
      });
    },
  });
}
