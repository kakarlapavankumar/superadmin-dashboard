import type {
  CreateNotificationRequest,
  Notification,
  NotificationFilters,
} from "../types/notifications";

import { notifications } from "../mock/notifications";

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export interface NotificationResponse {
  data: Notification[];
  total: number;
}

export const notificationApi = {
  async getNotifications(
    filters: NotificationFilters = {},
  ): Promise<NotificationResponse> {
    await delay();

    let result = [...notifications];

    if (filters.search) {
      const search = filters.search.toLowerCase();

      result = result.filter(
        (notification) =>
          notification.title.toLowerCase().includes(search) ||
          notification.message.toLowerCase().includes(search) ||
          notification.id.toLowerCase().includes(search),
      );
    }

    if (filters.type && filters.type !== "all") {
      result = result.filter(
        (notification) => notification.type === filters.type,
      );
    }

    if (filters.priority && filters.priority !== "all") {
      result = result.filter(
        (notification) => notification.priority === filters.priority,
      );
    }

    if (filters.status && filters.status !== "all") {
      result = result.filter(
        (notification) => notification.status === filters.status,
      );
    }

    return {
      data: result,
      total: result.length,
    };
  },

  async getNotification(id: string): Promise<Notification> {
    await delay();

    const notification = notifications.find((item) => item.id === id);

    if (!notification) {
      throw new Error("Notification not found");
    }

    return notification;
  },

  async createNotification(
    payload: CreateNotificationRequest,
  ): Promise<Notification> {
    await delay();

    const notification: Notification = {
      id: `NTF-${String(notifications.length + 1).padStart(3, "0")}`,
      ...payload,
      status: "unread",
      createdAt: new Date().toISOString(),
      createdBy: "Super Admin",
    };

    notifications.unshift(notification);

    return notification;
  },

  async markAsRead(id: string): Promise<Notification> {
    await delay();

    const notification = notifications.find((item) => item.id === id);

    if (!notification) {
      throw new Error("Notification not found");
    }

    notification.status = "read";
    notification.readAt = new Date().toISOString();

    return notification;
  },

  async markAllAsRead(): Promise<void> {
    await delay();

    notifications.forEach((notification) => {
      notification.status = "read";
      notification.readAt = new Date().toISOString();
    });
  },

  async deleteNotification(id: string): Promise<void> {
    await delay();

    const index = notifications.findIndex(
      (notification) => notification.id === id,
    );

    if (index === -1) {
      throw new Error("Notification not found");
    }

    notifications.splice(index, 1);
  },
};
