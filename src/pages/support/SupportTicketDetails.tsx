import { useParams } from "react-router-dom";

import BackToDashboard from "../../components/BackToDashboard";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";
import SupportPriorityBadge from "../../components/support/SupportPriorityBadge";
import SupportStatusBadge from "../../components/support/SupportStatusBadge";

import {
  useSupportTicket,
  useUpdateSupportTicketStatus,
} from "../../hooks/useSupport";

export default function SupportTicketDetails() {
  const { id } = useParams<{ id: string }>();

  const ticketQuery = useSupportTicket(id);
  const updateStatusMutation = useUpdateSupportTicketStatus();

  /*
   * Loading state
   */
  if (ticketQuery.isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  /*
   * Error state
   */
  if (ticketQuery.isError) {
    return (
      <div className="space-y-6 p-4 sm:p-6">
        <BackToDashboard />

        <ErrorMessage message="Unable to load support ticket." />
      </div>
    );
  }

  const ticket = ticketQuery.data;

  /*
   * Ticket not found
   */
  if (!ticket) {
    return (
      <div className="space-y-6 p-4 sm:p-6">
        <BackToDashboard />

        <ErrorMessage message="Support ticket was not found." />
      </div>
    );
  }

  /*
   * Main page
   */
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Back Button */}
      <div>
        <BackToDashboard />
      </div>

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-medium text-blue-600">
            {ticket.ticketNumber}
          </p>

          <h1 className="mt-1 text-2xl font-bold text-gray-900">
            {ticket.subject}
          </h1>
        </div>

        <div className="flex flex-wrap gap-2">
          <SupportPriorityBadge priority={ticket.priority} />

          <SupportStatusBadge status={ticket.status} />
        </div>
      </div>

      {/* Ticket Information */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Issue Description */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Issue Description
            </h2>

            <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-gray-600">
              {ticket.description}
            </p>
          </div>
        </div>

        {/* Customer Information */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Customer Information
          </h2>

          <div className="mt-5 space-y-4">
            {/* Tenant */}
            <div>
              <p className="text-xs font-medium text-gray-500">Tenant</p>

              <p className="mt-1 text-sm font-medium text-gray-900">
                {ticket.tenantName}
              </p>
            </div>

            {/* Tenant ID */}
            <div>
              <p className="text-xs font-medium text-gray-500">Tenant ID</p>

              <p className="mt-1 text-sm font-medium text-gray-900">
                {ticket.tenantId}
              </p>
            </div>

            {/* Requester */}
            <div>
              <p className="text-xs font-medium text-gray-500">Requester</p>

              <p className="mt-1 text-sm font-medium text-gray-900">
                {ticket.requesterName}
              </p>
            </div>

            {/* Email */}
            <div>
              <p className="text-xs font-medium text-gray-500">Email</p>

              <p className="mt-1 break-all text-sm text-gray-700">
                {ticket.requesterEmail}
              </p>
            </div>

            {/* Category */}
            <div>
              <p className="text-xs font-medium text-gray-500">Category</p>

              <p className="mt-1 text-sm font-medium capitalize text-gray-900">
                {ticket.category}
              </p>
            </div>

            {/* Assigned To */}
            <div>
              <p className="text-xs font-medium text-gray-500">Assigned To</p>

              <p className="mt-1 text-sm font-medium text-gray-900">
                {ticket.assignedTo ?? "Unassigned"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Management */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Ticket Management
        </h2>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
          <select
            value={ticket.status}
            disabled={updateStatusMutation.isPending}
            onChange={(event) => {
              updateStatusMutation.mutate({
                id: ticket.id,
                status: event.target.value as
                  | "open"
                  | "in_progress"
                  | "pending"
                  | "resolved"
                  | "closed",
              });
            }}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="open">Open</option>

            <option value="in_progress">In Progress</option>

            <option value="pending">Pending</option>

            <option value="resolved">Resolved</option>

            <option value="closed">Closed</option>
          </select>

          {updateStatusMutation.isPending && (
            <span className="text-sm text-gray-500">Updating status...</span>
          )}
        </div>
      </div>

      {/* Ticket Timeline */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Ticket Timeline</h2>

        <div className="mt-5 space-y-5">
          {/* Created */}
          <div className="border-l-2 border-blue-200 pl-4">
            <p className="text-sm font-medium text-gray-900">Ticket Created</p>

            <p className="mt-1 text-xs text-gray-500">{ticket.createdAt}</p>
          </div>

          {/* Updated */}
          <div className="border-l-2 border-gray-200 pl-4">
            <p className="text-sm font-medium text-gray-900">Last Updated</p>

            <p className="mt-1 text-xs text-gray-500">{ticket.updatedAt}</p>
          </div>

          {/* Resolved */}
          {ticket.resolvedAt && (
            <div className="border-l-2 border-green-200 pl-4">
              <p className="text-sm font-medium text-gray-900">
                Ticket Resolved
              </p>

              <p className="mt-1 text-xs text-gray-500">{ticket.resolvedAt}</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Back Button */}
      <div>
        <BackToDashboard />
      </div>
    </div>
  );
}
