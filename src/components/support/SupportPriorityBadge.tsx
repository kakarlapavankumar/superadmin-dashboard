import type { SupportTicketPriority } from "../../types/support";

interface Props {
  priority: SupportTicketPriority;
}

const styles: Record<SupportTicketPriority, string> = {
  low: "bg-gray-100 text-gray-700",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-orange-100 text-orange-700",
  critical: "bg-red-100 text-red-700",
};

export default function SupportPriorityBadge({ priority }: Props) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}
