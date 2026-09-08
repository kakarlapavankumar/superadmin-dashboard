import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { notificationApi } from "../api/notificationApi";

import type {
  CreateNotificationRequest,
  NotificationFilters,
} from "../types/notifications";

export const useNotifications = (filters: NotificationFilters = {}) => {
  return useQuery({
    queryKey: ["notifications", filters],
    queryFn: () => notificationApi.getNotifications(filters),
  });
};

export const useNotification = (id?: string) => {
  return useQuery({
    queryKey: ["notification", id],
    queryFn: () => notificationApi.getNotification(id!),
    enabled: Boolean(id),
  });
};

export const useCreateNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateNotificationRequest) =>
      notificationApi.createNotification(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
};

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationApi.markAsRead(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
};

export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationApi.markAllAsRead(),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationApi.deleteNotification(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
};
