import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
  activateRole,
  deactivateRole,
} from "../api/roleApi";

import type {
  CreateRoleInput,
  UpdateRoleInput,
  RoleFilters,
} from "../types/role";

/* ============================================================
   GET ROLES
   ============================================================ */

export function useRoles(filters: RoleFilters = {}) {
  return useQuery({
    queryKey: ["roles", filters],
    queryFn: () => getRoles(filters),
  });
}

/* ============================================================
   GET ROLE
   ============================================================ */

export function useRole(id: string | number | undefined) {
  const roleId = typeof id === "string" ? Number(id) : id;

  return useQuery({
    queryKey: ["role", roleId],

    queryFn: () => {
      if (roleId === undefined) {
        throw new Error("Role ID is required");
      }

      return getRole(roleId);
    },

    enabled: roleId !== undefined && Number.isFinite(roleId),
  });
}

/* ============================================================
   CREATE ROLE
   ============================================================ */

export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoleInput) => createRole(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });
    },
  });
}

/* ============================================================
   UPDATE ROLE
   ============================================================ */

export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateRoleInput }) =>
      updateRole(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });

      queryClient.invalidateQueries({
        queryKey: ["role", variables.id],
      });
    },
  });
}

/* ============================================================
   DELETE ROLE
   ============================================================ */

export function useDeleteRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteRole(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });
    },
  });
}

/* ============================================================
   ACTIVATE ROLE
   ============================================================ */

export function useActivateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => activateRole(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });

      queryClient.invalidateQueries({
        queryKey: ["role", id],
      });
    },
  });
}

/* ============================================================
   DEACTIVATE ROLE
   ============================================================ */

export function useDeactivateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deactivateRole(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });

      queryClient.invalidateQueries({
        queryKey: ["role", id],
      });
    },
  });
}
