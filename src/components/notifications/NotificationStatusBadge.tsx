import type {
  NotificationPriority,
  NotificationStatus,
} from "../../types/notifications";

interface NotificationStatusBadgeProps {
  status?: NotificationStatus;
  priority?: NotificationPriority;
}

const NotificationStatusBadge = ({
  status,
  priority,
}: NotificationStatusBadgeProps) => {
  if (priority) {
    const priorityClasses: Record<NotificationPriority, string> = {
      low: "bg-gray-100 text-gray-700",
      medium: "bg-blue-100 text-blue-700",
      high: "bg-orange-100 text-orange-700",
      critical: "bg-red-100 text-red-700",
    };

    return (
      <span
        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${priorityClasses[priority]}`}
      >
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  }

  if (status) {
    return (
      <span
        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
          status === "read"
            ? "bg-gray-100 text-gray-600"
            : "bg-blue-100 text-blue-700"
        }`}
      >
        {status === "read" ? "Read" : "Unread"}
      </span>
    );
  }

  return null;
};

export default NotificationStatusBadge;
