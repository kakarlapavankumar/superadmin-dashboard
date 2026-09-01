import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createOrganization,
  deleteOrganization,
  getOrganization,
  getOrganizations,
  toggleOrganizationStatus,
  updateOrganization,
} from "../api/organizationApi";

export const organizationKeys = {
  all: ["organizations"] as const,

  detail: (id: string) => ["organizations", id] as const,
};

export function useOrganizations() {
  return useQuery({
    queryKey: organizationKeys.all,
    queryFn: getOrganizations,
  });
}

export function useOrganization(id: string | undefined) {
  return useQuery({
    queryKey: organizationKeys.detail(id ?? ""),
    queryFn: () => getOrganization(id as string),
    enabled: Boolean(id),
  });
}

export function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof createOrganization>[0]) =>
      createOrganization(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: organizationKeys.all,
      });
    },
  });
}

export function useUpdateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Parameters<typeof updateOrganization>[1];
    }) => updateOrganization(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: organizationKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: organizationKeys.detail(variables.id),
      });
    },
  });
}

export function useDeleteOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrganization,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: organizationKeys.all,
      });
    },
  });
}

export function useToggleOrganizationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleOrganizationStatus,

    onSuccess: (organization) => {
      queryClient.invalidateQueries({
        queryKey: organizationKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: organizationKeys.detail(organization.id),
      });
    },
  });
}
