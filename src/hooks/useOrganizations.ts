import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getOrganizations,
  getOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization,
  activateOrganization,
  deactivateOrganization,
  toggleOrganizationStatus,
} from "../api/organizationApi";

import type {
  CreateOrganizationInput,
  UpdateOrganizationInput,
} from "../types/organization";

import type { OrganizationFilters } from "../api/organizationApi";

const ORGANIZATIONS_KEY = ["organizations"];

/* --------------------------------
   GET ORGANIZATIONS
--------------------------------- */

export function useOrganizations(filters?: OrganizationFilters) {
  return useQuery({
    queryKey: [...ORGANIZATIONS_KEY, filters],

    queryFn: () => getOrganizations(filters),
  });
}

/* --------------------------------
   GET ORGANIZATION
--------------------------------- */

export function useOrganization(id: string | undefined) {
  return useQuery({
    queryKey: ["organization", id],

    queryFn: () => getOrganization(id as string),

    enabled: Boolean(id),
  });
}

/* --------------------------------
   CREATE
--------------------------------- */

export function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrganizationInput) => createOrganization(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ORGANIZATIONS_KEY,
      });
    },
  });
}

/* --------------------------------
   UPDATE
--------------------------------- */

export function useUpdateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOrganizationInput }) =>
      updateOrganization(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ORGANIZATIONS_KEY,
      });

      queryClient.invalidateQueries({
        queryKey: ["organization", variables.id],
      });
    },
  });
}

/* --------------------------------
   DELETE
--------------------------------- */

export function useDeleteOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteOrganization(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ORGANIZATIONS_KEY,
      });
    },
  });
}

/* --------------------------------
   ACTIVATE
--------------------------------- */

export function useActivateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => activateOrganization(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ORGANIZATIONS_KEY,
      });

      queryClient.invalidateQueries({
        queryKey: ["organization", id],
      });
    },
  });
}

/* --------------------------------
   DEACTIVATE
--------------------------------- */

export function useDeactivateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deactivateOrganization(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ORGANIZATIONS_KEY,
      });

      queryClient.invalidateQueries({
        queryKey: ["organization", id],
      });
    },
  });
}

/* --------------------------------
   TOGGLE
--------------------------------- */

export function useToggleOrganizationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleOrganizationStatus(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ORGANIZATIONS_KEY,
      });

      queryClient.invalidateQueries({
        queryKey: ["organization", id],
      });
    },
  });
}
