import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getSubscriptions,
  getSubscription,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  updateSubscriptionStatus,
  toggleAutoRenew,
} from "../api/subscriptionApi";

import type {
  CreateSubscriptionInput,
  UpdateSubscriptionInput,
  SubscriptionStatus,
} from "../types/subscription";

export const subscriptionKeys = {
  all: ["subscriptions"] as const,

  detail: (id: number) => ["subscriptions", id] as const,
};

export function useSubscriptions() {
  return useQuery({
    queryKey: subscriptionKeys.all,
    queryFn: getSubscriptions,
  });
}

export function useSubscription(id: number) {
  return useQuery({
    queryKey: subscriptionKeys.detail(id),
    queryFn: () => getSubscription(id),
    enabled: Boolean(id),
  });
}

export function useCreateSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSubscriptionInput) =>
      createSubscription(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: subscriptionKeys.all,
      });
    },
  });
}

export function useUpdateSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateSubscriptionInput;
    }) => updateSubscription(id, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: subscriptionKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: subscriptionKeys.detail(variables.id),
      });
    },
  });
}

export function useDeleteSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSubscription,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: subscriptionKeys.all,
      });
    },
  });
}

export function useUpdateSubscriptionStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: SubscriptionStatus }) =>
      updateSubscriptionStatus(id, status),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: subscriptionKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: subscriptionKeys.detail(variables.id),
      });
    },
  });
}

export function useToggleAutoRenew() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleAutoRenew,

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: subscriptionKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: subscriptionKeys.detail(id),
      });
    },
  });
}
