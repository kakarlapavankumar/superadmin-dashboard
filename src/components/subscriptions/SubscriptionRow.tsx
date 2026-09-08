import { Eye, Pencil, Power, Trash2 } from "lucide-react";

import type { Subscription } from "../../types/subscription";

import SubscriptionStatusBadge from "./SubscriptionStatusBadge";

interface Props {
  subscription: Subscription;

  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: () => void;

  isUpdating?: boolean;
}

export default function SubscriptionRow({
  subscription,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
  isUpdating = false,
}: Props) {
  const utilization =
    subscription.maxUsers > 0
      ? Math.round((subscription.usedUsers / subscription.maxUsers) * 100)
      : 0;

  return (
    <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
      <td className="px-5 py-4">
        <div>
          <p className="font-semibold text-slate-800">
            {subscription.tenantName}
          </p>

          <p className="text-xs text-slate-400">
            Subscription #{subscription.id}
          </p>
        </div>
      </td>

      <td className="px-5 py-4">
        <span className="font-medium text-slate-700">{subscription.plan}</span>
      </td>

      <td className="px-5 py-4">
        <SubscriptionStatusBadge status={subscription.status} />
      </td>

      <td className="px-5 py-4">
        <div>
          <p className="text-sm font-medium text-slate-700">
            {subscription.usedUsers} / {subscription.maxUsers}
          </p>

          <div className="mt-1 h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-indigo-500"
              style={{
                width: `${Math.min(utilization, 100)}%`,
              }}
            />
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <div>
          <p className="font-semibold text-slate-800">
            ${subscription.price.toLocaleString()}
          </p>

          <p className="text-xs text-slate-400">{subscription.billingCycle}</p>
        </div>
      </td>

      <td className="px-5 py-4 text-sm text-slate-600">
        {subscription.nextBillingDate}
      </td>

      <td className="px-5 py-4">
        <span
          className={
            subscription.autoRenew ? "text-emerald-600" : "text-slate-400"
          }
        >
          {subscription.autoRenew ? "Enabled" : "Disabled"}
        </span>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-1">
          <button
            onClick={onView}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
            title="View"
          >
            <Eye size={17} />
          </button>

          <button
            onClick={onEdit}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
            title="Edit"
          >
            <Pencil size={17} />
          </button>

          <button
            onClick={onStatusChange}
            disabled={isUpdating}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-indigo-600 disabled:opacity-50"
            title="Change Status"
          >
            <Power size={17} />
          </button>

          <button
            onClick={onDelete}
            className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
            title="Delete"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </td>
    </tr>
  );
}
