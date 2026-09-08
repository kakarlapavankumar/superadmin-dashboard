import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import BackToDashboard from "../../components/BackToDashboard";

import { useCreateNotification } from "../../hooks/useNotifications";

import type {
  NotificationChannel,
  NotificationPriority,
  NotificationType,
} from "../../types/notifications";

const CreateNotification = () => {
  const navigate = useNavigate();

  const createNotification = useCreateNotification();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [type, setType] = useState<NotificationType>("system");

  const [priority, setPriority] = useState<NotificationPriority>("medium");

  const [channel, setChannel] = useState<NotificationChannel>("in-app");

  const [recipientType, setRecipientType] = useState<
    "all" | "tenant" | "user" | "admin"
  >("all");

  const [recipientName, setRecipientName] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !message.trim()) {
      return;
    }

    await createNotification.mutateAsync({
      title,
      message,
      type,
      priority,
      channel,
      recipientType,
      recipientName: recipientName.trim() || undefined,
    });

    navigate("/notifications");
  };

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Create Notification"
        description="Create and send a platform notification."
      />

      <BackToDashboard />

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Title
            </label>

            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter notification title"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Message
            </label>

            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Enter notification message"
              rows={5}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Type
              </label>

              <select
                value={type}
                onChange={(event) =>
                  setType(event.target.value as NotificationType)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
              >
                <option value="system">System</option>
                <option value="security">Security</option>
                <option value="billing">Billing</option>
                <option value="tenant">Tenant</option>
                <option value="maintenance">Maintenance</option>
                <option value="announcement">Announcement</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Priority
              </label>

              <select
                value={priority}
                onChange={(event) =>
                  setPriority(event.target.value as NotificationPriority)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Channel
              </label>

              <select
                value={channel}
                onChange={(event) =>
                  setChannel(event.target.value as NotificationChannel)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
              >
                <option value="in-app">In-App</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="push">Push</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Recipient
              </label>

              <select
                value={recipientType}
                onChange={(event) =>
                  setRecipientType(
                    event.target.value as "all" | "tenant" | "user" | "admin",
                  )
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
              >
                <option value="all">Everyone</option>
                <option value="admin">Administrators</option>
                <option value="tenant">Tenant</option>
                <option value="user">Specific User</option>
              </select>
            </div>
          </div>

          {recipientType !== "all" && (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Recipient Name
              </label>

              <input
                value={recipientName}
                onChange={(event) => setRecipientName(event.target.value)}
                placeholder="Enter recipient name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
            <button
              type="button"
              onClick={() => navigate("/notifications")}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={createNotification.isPending}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {createNotification.isPending
                ? "Creating..."
                : "Create Notification"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNotification;
