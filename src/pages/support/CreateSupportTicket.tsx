import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ErrorMessage from "../../components/ErrorMessage";

import { useCreateSupportTicket } from "../../hooks/useSupport";

import type { SupportTicketPriority } from "../../types/support";

export default function CreateSupportTicket() {
  const navigate = useNavigate();

  const mutation = useCreateSupportTicket();

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [requesterName, setRequesterName] = useState("");
  const [requesterEmail, setRequesterEmail] = useState("");
  const [category, setCategory] = useState("General");
  const [priority, setPriority] = useState<SupportTicketPriority>("medium");

  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!subject.trim()) {
      setError("Subject is required.");
      return;
    }

    if (!description.trim()) {
      setError("Description is required.");
      return;
    }

    if (!tenantId.trim()) {
      setError("Tenant ID is required.");
      return;
    }

    if (!tenantName.trim()) {
      setError("Tenant name is required.");
      return;
    }

    if (!requesterName.trim()) {
      setError("Requester name is required.");
      return;
    }

    if (!requesterEmail.trim()) {
      setError("Requester email is required.");
      return;
    }

    mutation.mutate(
      {
        subject: subject.trim(),
        description: description.trim(),
        tenantId: tenantId.trim(),
        tenantName: tenantName.trim(),
        requesterName: requesterName.trim(),
        requesterEmail: requesterEmail.trim(),
        category,
        priority,
      },
      {
        onSuccess: (ticket) => {
          navigate(`/support/${ticket.id}`);
        },
        onError: () => {
          setError("Unable to create support ticket. Please try again.");
        },
      },
    );
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <button
        type="button"
        onClick={() => navigate("/support")}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-left"
          aria-hidden="true"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        Back to Support
      </button>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Create Support Ticket
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Create a support ticket for a tenant or platform issue.
        </p>
      </div>

      <div className="max-w-4xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {error && (
          <div className="mb-5">
            <ErrorMessage message={error} />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Subject
            </label>

            <input
              type="text"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder="Unable to access dashboard"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              rows={5}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe the issue..."
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Tenant ID
              </label>

              <input
                type="text"
                value={tenantId}
                onChange={(event) => setTenantId(event.target.value)}
                placeholder="TEN-001"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Tenant Name
              </label>

              <input
                type="text"
                value={tenantName}
                onChange={(event) => setTenantName(event.target.value)}
                placeholder="Acme Corporation"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Requester Name
              </label>

              <input
                type="text"
                value={requesterName}
                onChange={(event) => setRequesterName(event.target.value)}
                placeholder="John Smith"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Requester Email
              </label>

              <input
                type="email"
                value={requesterEmail}
                onChange={(event) => setRequesterEmail(event.target.value)}
                placeholder="john@example.com"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Category
              </label>

              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm"
              >
                <option value="General">General</option>
                <option value="Access">Access</option>
                <option value="API">API</option>
                <option value="Billing">Billing</option>
                <option value="Users">Users</option>
                <option value="Security">Security</option>
                <option value="Technical">Technical</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Priority
              </label>

              <select
                value={priority}
                onChange={(event) =>
                  setPriority(event.target.value as SupportTicketPriority)
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate("/support")}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {mutation.isPending ? "Creating..." : "Create Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
