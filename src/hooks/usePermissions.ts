import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getPermissions,
  getPermission,
  createPermission,
  updatePermission,
  deletePermission,
  activatePermission,
  deactivatePermission,
} from "../api/permissionApi";

import type {
  CreatePermissionInput,
  UpdatePermissionInput,
  PermissionFilters,
} from "../types/permission";

/* ============================================================
   GET PERMISSIONS
   ============================================================ */

export function usePermissions(filters: PermissionFilters = {}) {
  return useQuery({
    queryKey: ["permissions", filters],

    queryFn: () => getPermissions(filters),
  });
}

/* ============================================================
   GET PERMISSION
   ============================================================ */

export function usePermission(id: string | number | undefined) {
  const permissionId = typeof id === "string" ? Number(id) : id;

  return useQuery({
    queryKey: ["permission", permissionId],

    queryFn: () => {
      if (permissionId === undefined) {
        throw new Error("Permission ID is required");
      }

      return getPermission(permissionId);
    },

    enabled: permissionId !== undefined && Number.isFinite(permissionId),
  });
}

/* ============================================================
   CREATE
   ============================================================ */

export function useCreatePermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePermissionInput) => createPermission(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["permissions"],
      });
    },
  });
}

/* ============================================================
   UPDATE
   ============================================================ */

export function useUpdatePermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePermissionInput }) =>
      updatePermission(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["permissions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["permission", variables.id],
      });
    },
  });
}

/* ============================================================
   DELETE
   ============================================================ */

export function useDeletePermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePermission(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["permissions"],
      });
    },
  });
}

/* ============================================================
   ACTIVATE
   ============================================================ */

export function useActivatePermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => activatePermission(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["permissions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["permission", id],
      });
    },
  });
}

/* ============================================================
   DEACTIVATE
   ============================================================ */

export function useDeactivatePermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deactivatePermission(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["permissions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["permission", id],
      });
    },
  });
}
