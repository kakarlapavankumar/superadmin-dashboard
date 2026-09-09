import { useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import BackToDashboard from "../../components/BackToDashboard";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";

import SupportStatsCard from "../../components/support/SupportStatusCard";
import SupportTicketRow from "../../components/support/SupportTicketRow";

import { useSupportOverview, useSupportTickets } from "../../hooks/useSupport";

export default function Support() {
  const navigate = useNavigate();

  const overviewQuery = useSupportOverview();
  const ticketsQuery = useSupportTickets();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");

  const overview = overviewQuery.data;
  const tickets = useMemo(() => ticketsQuery.data ?? [], [ticketsQuery.data]);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const searchMatch =
        ticket.ticketNumber.toLowerCase().includes(search.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
        ticket.tenantName.toLowerCase().includes(search.toLowerCase());

      const statusMatch = status === "all" || ticket.status === status;

      const priorityMatch = priority === "all" || ticket.priority === priority;

      return searchMatch && statusMatch && priorityMatch;
    });
  }, [tickets, search, status, priority]);

  if (overviewQuery.isLoading || ticketsQuery.isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (overviewQuery.isError || ticketsQuery.isError) {
    return (
      <div className="space-y-6 p-4 sm:p-6">
        <BackToDashboard />

        <ErrorMessage message="Unable to load support data." />
      </div>
    );
  }

  if (!overview) {
    return (
      <div className="space-y-6 p-4 sm:p-6">
        <BackToDashboard />

        <ErrorMessage message="Support overview is unavailable." />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <BackToDashboard />

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support</h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage customer support tickets and issues.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/support/create")}
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Create Ticket
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SupportStatsCard
          title="Total Tickets"
          value={overview.totalTickets}
          description="All support tickets"
        />

        <SupportStatsCard
          title="Open Tickets"
          value={overview.openTickets}
          description="Waiting for support"
        />

        <SupportStatsCard
          title="In Progress"
          value={overview.inProgressTickets}
          description="Currently being handled"
        />

        <SupportStatsCard
          title="Critical Tickets"
          value={overview.criticalTickets}
          description="Require immediate attention"
        />

        <SupportStatsCard
          title="Pending"
          value={overview.pendingTickets}
          description="Waiting for customer"
        />

        <SupportStatsCard
          title="Resolved"
          value={overview.resolvedTickets}
          description="Successfully resolved"
        />

        <SupportStatsCard
          title="Closed"
          value={overview.closedTickets}
          description="Completed tickets"
        />

        <SupportStatsCard
          title="Avg Resolution"
          value={`${overview.averageResolutionTime} hrs`}
          description="Average resolution time"
        />
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search tickets..."
            className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      {/* Ticket Table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="font-semibold text-gray-900">Support Tickets</h2>

          <p className="mt-1 text-sm text-gray-500">
            {filteredTickets.length} tickets found
          </p>
        </div>

        <div className="overflow-x-auto">
          {filteredTickets.length === 0 ? (
            <div className="px-6 py-12 text-center text-sm text-gray-500">
              No support tickets found.
            </div>
          ) : (
            <table className="min-w-[900px] w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-xs font-semibold uppercase text-gray-500">
                  <th className="px-6 py-3">Ticket</th>
                  <th className="px-6 py-3">Tenant</th>
                  <th className="px-6 py-3">Priority</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Assigned To</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredTickets.map((ticket) => (
                  <SupportTicketRow key={ticket.id} ticket={ticket} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
