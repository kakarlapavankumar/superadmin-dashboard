import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getTenants,
  getTenant,
  getTenantStats,
  createTenant,
  updateTenant,
  deleteTenant,
  activateTenant,
  deactivateTenant,
} from "../api/tenantApi";

import type { TenantFormData } from "../types/tenant";

export const useTenants = () => {
  return useQuery({
    queryKey: ["tenants"],
    queryFn: getTenants,
  });
};

export const useTenant = (id: string | number | undefined) => {
  const tenantId = typeof id === "string" ? Number(id) : id;

  return useQuery({
    queryKey: ["tenant", tenantId],
    queryFn: () => getTenant(tenantId as number),
    enabled: tenantId !== undefined && Number.isFinite(tenantId),
  });
};

export const useTenantStats = () => {
  return useQuery({
    queryKey: ["tenant-stats"],
    queryFn: getTenantStats,
  });
};

export const useCreateTenant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TenantFormData) => createTenant(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tenants"],
      });

      queryClient.invalidateQueries({
        queryKey: ["tenant-stats"],
      });
    },
  });
};

export const useUpdateTenant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string | number;
      data: TenantFormData;
    }) => {
      const tenantId = typeof id === "string" ? Number(id) : id;

      return updateTenant(tenantId, data);
    },

    onSuccess: (_, variables) => {
      const tenantId =
        typeof variables.id === "string" ? Number(variables.id) : variables.id;

      queryClient.invalidateQueries({
        queryKey: ["tenants"],
      });

      queryClient.invalidateQueries({
        queryKey: ["tenant", tenantId],
      });

      queryClient.invalidateQueries({
        queryKey: ["tenant-stats"],
      });
    },
  });
};

export const useDeleteTenant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => {
      const tenantId = typeof id === "string" ? Number(id) : id;

      return deleteTenant(tenantId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tenants"],
      });

      queryClient.invalidateQueries({
        queryKey: ["tenant-stats"],
      });
    },
  });
};

export const useActivateTenant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => {
      const tenantId = typeof id === "string" ? Number(id) : id;

      return activateTenant(tenantId);
    },

    onSuccess: (_, id) => {
      const tenantId = typeof id === "string" ? Number(id) : id;

      queryClient.invalidateQueries({
        queryKey: ["tenants"],
      });

      queryClient.invalidateQueries({
        queryKey: ["tenant", tenantId],
      });

      queryClient.invalidateQueries({
        queryKey: ["tenant-stats"],
      });
    },
  });
};

export const useDeactivateTenant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => {
      const tenantId = typeof id === "string" ? Number(id) : id;

      return deactivateTenant(tenantId);
    },

    onSuccess: (_, id) => {
      const tenantId = typeof id === "string" ? Number(id) : id;

      queryClient.invalidateQueries({
        queryKey: ["tenants"],
      });

      queryClient.invalidateQueries({
        queryKey: ["tenant", tenantId],
      });

      queryClient.invalidateQueries({
        queryKey: ["tenant-stats"],
      });
    },
  });
};
