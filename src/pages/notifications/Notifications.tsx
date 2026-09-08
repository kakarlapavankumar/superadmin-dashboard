import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import BackToDashboard from "../../components/BackToDashboard";
import Spinner from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";

import NotificationRow from "../../components/notifications/NotificationRow";

import {
  useDeleteNotification,
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useNotifications,
} from "../../hooks/useNotifications";

import type {
  NotificationFilters,
  NotificationPriority,
  NotificationStatus,
  NotificationType,
} from "../../types/notifications";

const Notifications = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<NotificationType | "all">("all");
  const [priority, setPriority] = useState<NotificationPriority | "all">("all");
  const [status, setStatus] = useState<NotificationStatus | "all">("all");

  const filters: NotificationFilters = useMemo(
    () => ({
      search,
      type,
      priority,
      status,
    }),
    [search, type, priority, status],
  );

  const { data, isLoading, isError, refetch } = useNotifications(filters);

  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();
  const deleteNotification = useDeleteNotification();

  const notifications = data?.data ?? [];

  const unreadCount = notifications.filter(
    (item) => item.status === "unread",
  ).length;

  const handleMarkRead = async (id: string) => {
    await markRead.mutateAsync(id);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this notification?",
    );

    if (!confirmed) {
      return;
    }

    await deleteNotification.mutateAsync(id);
  };

  const handleMarkAllRead = async () => {
    await markAllRead.mutateAsync();
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <ErrorMessage message="Failed to load notifications." />

        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Notifications"
        description="Manage platform notifications and alerts."
      />

      <BackToDashboard />

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Notifications</p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {data?.total ?? 0}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Unread</p>

          <p className="mt-2 text-3xl font-bold text-blue-600">{unreadCount}</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Critical</p>

          <p className="mt-2 text-3xl font-bold text-red-600">
            {
              notifications.filter((item) => item.priority === "critical")
                .length
            }
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Security Alerts</p>

          <p className="mt-2 text-3xl font-bold text-orange-600">
            {notifications.filter((item) => item.type === "security").length}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <Link
            to="/notifications/create"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            + Create Notification
          </Link>

          <button
            type="button"
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Mark All Read
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search notifications..."
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <select
            value={type}
            onChange={(event) =>
              setType(event.target.value as NotificationType | "all")
            }
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
          >
            <option value="all">All Types</option>
            <option value="system">System</option>
            <option value="security">Security</option>
            <option value="billing">Billing</option>
            <option value="tenant">Tenant</option>
            <option value="maintenance">Maintenance</option>
            <option value="announcement">Announcement</option>
          </select>

          <select
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value as NotificationPriority | "all")
            }
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as NotificationStatus | "all")
            }
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {notifications.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-lg font-medium text-gray-900">
              No notifications found
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Try changing your filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                    Notification
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                    Type
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                    Priority
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                    Status
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                    Delivery
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                    Created
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {notifications.map((notification) => (
                  <NotificationRow
                    key={notification.id}
                    notification={notification}
                    onMarkRead={handleMarkRead}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
