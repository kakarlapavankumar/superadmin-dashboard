import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BackToDashboard from "../../components/BackToDashboard";
import ErrorMessage from "../../components/ErrorMessage";

import { useCreateApiKey } from "../../hooks/useApiManagement";

import type { ApiEnvironment } from "../../types/apiManagement";

export default function CreateApiKey() {
  const navigate = useNavigate();

  const createMutation = useCreateApiKey();

  const [name, setName] = useState("");
  const [environment, setEnvironment] = useState<ApiEnvironment>("production");
  const [owner, setOwner] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [rateLimit, setRateLimit] = useState("500");
  const [expiresAt, setExpiresAt] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("API key name is required.");
      return;
    }

    if (!owner.trim()) {
      setError("Owner name is required.");
      return;
    }

    if (!ownerEmail.trim()) {
      setError("Owner email is required.");
      return;
    }

    const parsedRateLimit = Number(rateLimit);

    if (!Number.isFinite(parsedRateLimit) || parsedRateLimit <= 0) {
      setError("Rate limit must be greater than zero.");
      return;
    }

    createMutation.mutate(
      {
        name: name.trim(),
        environment,
        owner: owner.trim(),
        ownerEmail: ownerEmail.trim(),
        rateLimit: parsedRateLimit,
        expiresAt: expiresAt || undefined,
      },
      {
        onSuccess: () => {
          navigate("/api-management");
        },
        onError: () => {
          setError("Unable to create API key. Please try again.");
        },
      },
    );
  };

  return (
    <div className="space-y-6 p-6">
      <BackToDashboard />

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create API Key</h1>

        <p className="mt-1 text-sm text-gray-500">
          Create credentials for accessing platform APIs.
        </p>
      </div>

      <div className="max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {error && (
          <div className="mb-5">
            <ErrorMessage message={error} />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              API Key Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Production Integration"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Environment
            </label>

            <select
              value={environment}
              onChange={(event) =>
                setEnvironment(event.target.value as ApiEnvironment)
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
            >
              <option value="production">Production</option>

              <option value="sandbox">Sandbox</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Owner
              </label>

              <input
                type="text"
                value={owner}
                onChange={(event) => setOwner(event.target.value)}
                placeholder="John Smith"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Owner Email
              </label>

              <input
                type="email"
                value={ownerEmail}
                onChange={(event) => setOwnerEmail(event.target.value)}
                placeholder="john@example.com"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Rate Limit
              </label>

              <input
                type="number"
                min="1"
                value={rateLimit}
                onChange={(event) => setRateLimit(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
              />

              <p className="mt-1 text-xs text-gray-500">
                Maximum requests per minute.
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Expiration Date
              </label>

              <input
                type="date"
                value={expiresAt}
                onChange={(event) => setExpiresAt(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate("/api-management")}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={createMutation.isPending}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {createMutation.isPending ? "Creating..." : "Create API Key"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
