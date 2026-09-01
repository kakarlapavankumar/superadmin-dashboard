import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getTenants,
  getTenant,
  getTenantStats,
  createTenant,
  updateTenant,
  activateTenant,
  deactivateTenant,
  deleteTenant,
} from "../api/tenantApi";

// ============================================================
// GET ALL TENANTS
// ============================================================

export function useTenants() {
  return useQuery({
    queryKey: ["tenants"],
    queryFn: getTenants,
  });
}

// ============================================================
// GET TENANT
// ============================================================

export function useTenant(id?: string) {
  return useQuery({
    queryKey: ["tenant", id],
    queryFn: () => getTenant(id!),
    enabled: Boolean(id),
  });
}

// ============================================================
// TENANT STATS
// ============================================================

export function useTenantStats() {
  return useQuery({
    queryKey: ["tenant-stats"],
    queryFn: getTenantStats,
  });
}

// ============================================================
// CREATE
// ============================================================

export function useCreateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTenant,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tenants"],
      });

      queryClient.invalidateQueries({
        queryKey: ["tenant-stats"],
      });
    },
  });
}

// ============================================================
// UPDATE
// ============================================================

export function useUpdateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Parameters<typeof updateTenant>[1];
    }) => updateTenant(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tenants"],
      });

      queryClient.invalidateQueries({
        queryKey: ["tenant", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["tenant-stats"],
      });
    },
  });
}

// ============================================================
// ACTIVATE
// ============================================================

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

      queryClient.invalidateQueries({
        queryKey: ["tenant-stats"],
      });
    },
  });
}

// ============================================================
// DEACTIVATE
// ============================================================

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

      queryClient.invalidateQueries({
        queryKey: ["tenant-stats"],
      });
    },
  });
}

// ============================================================
// DELETE
// ============================================================

export function useDeleteTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTenant,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tenants"],
      });

      queryClient.invalidateQueries({
        queryKey: ["tenant-stats"],
      });
    },
  });
}
