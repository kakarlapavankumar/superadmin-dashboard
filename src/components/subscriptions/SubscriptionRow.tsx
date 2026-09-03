import type { Subscription } from "../../types/subscription";
import SubscriptionStatusBadge from "./SubscriptionStatusBadge";

export default function SubscriptionRow({
  subscription,
  onToggle,
}: {
  subscription: Subscription;
  onToggle: () => void;
}) {
  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50">
      <td className="px-5 py-4">
        <div className="font-medium text-slate-900">{subscription.name}</div>
        <div className="text-xs text-slate-500">{subscription.code}</div>
      </td>

      <td className="px-5 py-4 text-sm">
        ₹{subscription.price.toLocaleString("en-IN")}
      </td>

      <td className="px-5 py-4 text-sm">{subscription.billingCycle}</td>

      <td className="px-5 py-4 text-sm">{subscription.maxUsers}</td>

      <td className="px-5 py-4 text-sm">{subscription.tenantCount}</td>

      <td className="px-5 py-4">
        <SubscriptionStatusBadge status={subscription.status} />
      </td>

      <td className="px-5 py-4">
        <button
          onClick={onToggle}
          className="rounded-md border px-3 py-1.5 text-sm"
        >
          {subscription.status === "Active" ? "Disable" : "Enable"}
        </button>
      </td>
    </tr>
  );
}
