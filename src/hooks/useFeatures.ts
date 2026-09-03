import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createFeature,
  deleteFeature,
  getFeature,
  getFeatures,
  toggleFeature,
  updateFeature,
} from "../api/featureApi";

import type { CreateFeatureInput, UpdateFeatureInput } from "../types/feature";

export const featureKeys = {
  all: ["features"] as const,

  detail: (id: number) => ["features", id] as const,
};

export function useFeatures() {
  return useQuery({
    queryKey: featureKeys.all,
    queryFn: getFeatures,
  });
}

export function useFeature(id: number) {
  return useQuery({
    queryKey: featureKeys.detail(id),
    queryFn: () => getFeature(id),
    enabled: Number.isFinite(id),
  });
}

export function useCreateFeature() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFeatureInput) => createFeature(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: featureKeys.all,
      });
    },
  });
}

export function useUpdateFeature() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateFeatureInput }) =>
      updateFeature(id, data),

    onSuccess: (feature) => {
      queryClient.invalidateQueries({
        queryKey: featureKeys.all,
      });

      queryClient.setQueryData(featureKeys.detail(feature.id), feature);
    },
  });
}

export function useDeleteFeature() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFeature,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: featureKeys.all,
      });
    },
  });
}

export function useToggleFeature() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleFeature,

    onSuccess: (feature) => {
      queryClient.invalidateQueries({
        queryKey: featureKeys.all,
      });

      queryClient.setQueryData(featureKeys.detail(feature.id), feature);
    },
  });
}
