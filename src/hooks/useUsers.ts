import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  activateUser,
  deactivateUser,
  deleteUser,
} from "../api/userApi";

import type { CreateUserInput, UpdateUserInput } from "../types/user";

export interface UserFilters {
  search?: string;
  status?: string;
  role?: string;
  page?: number;
  limit?: number;
}

const USERS_KEY = ["users"];

export function useUsers(filters?: UserFilters) {
  return useQuery({
    queryKey: [...USERS_KEY, filters],
    queryFn: () => getUsers(filters),
  });
}

export function useUser(id: string | number | undefined) {
  const userId = id === undefined ? undefined : Number(id);

  return useQuery({
    queryKey: ["user", userId],

    queryFn: () => getUser(userId as number),

    enabled: userId !== undefined && Number.isFinite(userId),
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserInput) => createUser(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USERS_KEY,
      });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string | number;
      data: UpdateUserInput;
    }) => updateUser(Number(id), data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: USERS_KEY,
      });

      queryClient.invalidateQueries({
        queryKey: ["user", Number(variables.id)],
      });
    },
  });
}

export function useActivateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => activateUser(Number(id)),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: USERS_KEY,
      });

      queryClient.invalidateQueries({
        queryKey: ["user", Number(id)],
      });
    },
  });
}

export function useDeactivateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => deactivateUser(Number(id)),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: USERS_KEY,
      });

      queryClient.invalidateQueries({
        queryKey: ["user", Number(id)],
      });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => deleteUser(Number(id)),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USERS_KEY,
      });
    },
  });
}
