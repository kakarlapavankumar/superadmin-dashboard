import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getTenants,
  getTenant,
  createTenant,
  updateTenant,
  activateTenant,
  deactivateTenant,
} from "../api/tenantApi";

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
    enabled: Boolean(id),
  });
}

export function useCreateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof createTenant>[0]) =>
      createTenant(data),

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
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Parameters<typeof updateTenant>[1];
    }) => updateTenant(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tenants"],
      });

      queryClient.invalidateQueries({
        queryKey: ["tenant", variables.id],
      });
    },
  });
}

export function useActivateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: activateTenant,

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
    mutationFn: deactivateTenant,

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
