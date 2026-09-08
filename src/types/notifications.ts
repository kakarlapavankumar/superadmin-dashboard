export type NotificationType =
  | "system"
  | "security"
  | "billing"
  | "tenant"
  | "maintenance"
  | "announcement";

export type NotificationPriority = "low" | "medium" | "high" | "critical";

export type NotificationStatus = "unread" | "read";

export type NotificationChannel = "in-app" | "email" | "sms" | "push";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  status: NotificationStatus;
  channel: NotificationChannel;
  recipientType: "all" | "tenant" | "user" | "admin";
  recipientName?: string;
  createdAt: string;
  readAt?: string;
  createdBy: string;
}

export interface CreateNotificationRequest {
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  channel: NotificationChannel;
  recipientType: "all" | "tenant" | "user" | "admin";
  recipientName?: string;
}

export interface NotificationFilters {
  search?: string;
  type?: NotificationType | "all";
  priority?: NotificationPriority | "all";
  status?: NotificationStatus | "all";
}
