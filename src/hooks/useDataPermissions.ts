import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getDataPermissions,
  getDataPermission,
  createDataPermission,
  updateDataPermission,
  deleteDataPermission,
  activateDataPermission,
  deactivateDataPermission,
} from "../api/dataPermissionApi";

import type {
  CreateDataPermissionInput,
  UpdateDataPermissionInput,
  DataPermissionFilters,
} from "../types/dataPermission";

export function useDataPermissions(filters: DataPermissionFilters = {}) {
  return useQuery({
    queryKey: ["dataPermissions", filters],
    queryFn: () => getDataPermissions(filters),
  });
}

export function useDataPermission(id: string | number | undefined) {
  const permissionId = typeof id === "string" ? Number(id) : id;

  return useQuery({
    queryKey: ["dataPermission", permissionId],

    queryFn: () => {
      if (permissionId === undefined || !Number.isFinite(permissionId)) {
        throw new Error("Data permission ID is required.");
      }

      return getDataPermission(permissionId);
    },

    enabled: permissionId !== undefined && Number.isFinite(permissionId),
  });
}

export function useCreateDataPermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDataPermissionInput) => createDataPermission(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dataPermissions"],
      });
    },
  });
}

export function useUpdateDataPermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateDataPermissionInput;
    }) => updateDataPermission(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["dataPermissions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dataPermission", variables.id],
      });
    },
  });
}

export function useDeleteDataPermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteDataPermission(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dataPermissions"],
      });
    },
  });
}

export function useActivateDataPermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => activateDataPermission(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["dataPermissions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dataPermission", id],
      });
    },
  });
}

export function useDeactivateDataPermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deactivateDataPermission(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["dataPermissions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dataPermission", id],
      });
    },
  });
}
