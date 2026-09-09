import { useNavigate } from "react-router-dom";

import SupportPriorityBadge from "./SupportPriorityBadge";
import SupportStatusBadge from "./SupportStatusBadge";

import type { SupportTicket } from "../../types/support";

interface Props {
  ticket: SupportTicket;
}

export default function SupportTicketRow({ ticket }: Props) {
  const navigate = useNavigate();

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-6 py-4">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {ticket.ticketNumber}
          </p>

          <p className="mt-1 max-w-xs truncate text-sm text-gray-500">
            {ticket.subject}
          </p>
        </div>
      </td>

      <td className="px-6 py-4 text-sm text-gray-700">{ticket.tenantName}</td>

      <td className="px-6 py-4">
        <SupportPriorityBadge priority={ticket.priority} />
      </td>

      <td className="px-6 py-4">
        <SupportStatusBadge status={ticket.status} />
      </td>

      <td className="px-6 py-4 text-sm text-gray-600">
        {ticket.assignedTo ?? "Unassigned"}
      </td>

      <td className="px-6 py-4">
        <button
          type="button"
          onClick={() => navigate(`/support/${ticket.id}`)}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View
        </button>
      </td>
    </tr>
  );
}
