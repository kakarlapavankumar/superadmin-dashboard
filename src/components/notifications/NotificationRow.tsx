import type { Notification } from "../../types/notifications";

import NotificationStatusBadge from "./NotificationStatusBadge";

interface NotificationRowProps {
  notification: Notification;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationRow = ({
  notification,
  onMarkRead,
  onDelete,
}: NotificationRowProps) => {
  return (
    <tr
      className={`border-b border-gray-100 transition hover:bg-gray-50 ${
        notification.status === "unread" ? "bg-blue-50/30" : ""
      }`}
    >
      <td className="px-6 py-4">
        <div className="flex items-start gap-3">
          <div
            className={`mt-1 h-2.5 w-2.5 rounded-full ${
              notification.status === "unread" ? "bg-blue-600" : "bg-gray-300"
            }`}
          />

          <div>
            <p className="font-medium text-gray-900">{notification.title}</p>

            <p className="mt-1 max-w-md text-sm text-gray-500">
              {notification.message}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <span className="text-sm capitalize text-gray-700">
          {notification.type}
        </span>
      </td>

      <td className="px-6 py-4">
        <NotificationStatusBadge priority={notification.priority} />
      </td>

      <td className="px-6 py-4">
        <NotificationStatusBadge status={notification.status} />
      </td>

      <td className="px-6 py-4">
        <div>
          <p className="text-sm text-gray-700">{notification.channel}</p>

          <p className="text-xs text-gray-500">
            {notification.recipientName || notification.recipientType}
          </p>
        </div>
      </td>

      <td className="px-6 py-4 text-sm text-gray-500">
        {new Date(notification.createdAt).toLocaleString()}
      </td>

      <td className="px-6 py-4">
        <div className="flex gap-2">
          {notification.status === "unread" && (
            <button
              type="button"
              onClick={() => onMarkRead(notification.id)}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              Mark read
            </button>
          )}

          <button
            type="button"
            onClick={() => onDelete(notification.id)}
            className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default NotificationRow;
