import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSubscription,
  getLicenses,
  getSubscription,
  getSubscriptions,
  updateSubscription,
} from "../api/subscriptionApi";
import type { Subscription } from "../types/subscription";

export const useSubscriptions = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["subscriptions"],
    queryFn: getSubscriptions,
  });

  const createMutation = useMutation({
    mutationFn: createSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subscriptions"],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Subscription> }) =>
      updateSubscription(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subscriptions"],
      });
    },
  });

  return {
    ...query,
    createSubscription: createMutation.mutateAsync,
    updateSubscription: updateMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
};

export const useSubscription = (id: number) =>
  useQuery({
    queryKey: ["subscription", id],
    queryFn: () => getSubscription(id),
    enabled: Boolean(id),
  });

export const useLicenses = () =>
  useQuery({
    queryKey: ["licenses"],
    queryFn: getLicenses,
  });
