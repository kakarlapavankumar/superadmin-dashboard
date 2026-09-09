import { Link } from "react-router-dom";

import BackToDashboard from "../../components/BackToDashboard";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";
import ApiKeyRow from "../../components/apiManagement/ApiKeyRow";
import ApiMetricCard from "../../components/apiManagement/ApiMetricCard";

import {
  useApiKeys,
  useApiManagementOverview,
  useDeleteApiKey,
  useRevokeApiKey,
} from "../../hooks/useApiManagement";

import { useState } from "react";

import type { ApiEnvironment, ApiKeyStatus } from "../../types/apiManagement";

export default function ApiManagement() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ApiKeyStatus | "all">("all");
  const [environment, setEnvironment] = useState<ApiEnvironment | "all">("all");

  const overviewQuery = useApiManagementOverview();

  const apiKeysQuery = useApiKeys({
    search,
    status,
    environment,
  });

  const revokeMutation = useRevokeApiKey();
  const deleteMutation = useDeleteApiKey();

  const handleRevoke = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to revoke this API key?",
    );

    if (!confirmed) {
      return;
    }

    revokeMutation.mutate(id);
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this API key?",
    );

    if (!confirmed) {
      return;
    }

    deleteMutation.mutate(id);
  };

  if (overviewQuery.isLoading || apiKeysQuery.isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (overviewQuery.isError || apiKeysQuery.isError) {
    return (
      <div className="p-6">
        <ErrorMessage message="Unable to load API management data." />
      </div>
    );
  }

  const overview = overviewQuery.data;

  if (!overview) {
    return (
      <div className="p-6">
        <ErrorMessage message="API management overview is unavailable." />
      </div>
    );
  }

  const apiKeys = apiKeysQuery.data ?? [];

  return (
    <div className="space-y-6 p-6">
      <BackToDashboard />

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">API Management</h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage API keys, access credentials and usage.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/api-management/usage"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            View Usage
          </Link>

          <Link
            to="/api-management/create"
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            + Create API Key
          </Link>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ApiMetricCard title="Total API Keys" value={overview.totalApiKeys} />

        <ApiMetricCard title="Active API Keys" value={overview.activeApiKeys} />

        <ApiMetricCard
          title="Requests Today"
          value={overview.requestsToday.toLocaleString()}
        />

        <ApiMetricCard title="Error Rate" value={`${overview.errorRate}%`} />
      </div>

      {/* Additional metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ApiMetricCard
          title="Requests This Month"
          value={overview.requestsThisMonth.toLocaleString()}
        />

        <ApiMetricCard
          title="Average Response"
          value={`${overview.averageResponseTime} ms`}
        />

        <ApiMetricCard title="Revoked Keys" value={overview.revokedApiKeys} />

        <ApiMetricCard title="Expired Keys" value={overview.expiredApiKeys} />
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Search
            </label>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search API keys..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Status
            </label>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as ApiKeyStatus | "all")
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="revoked">Revoked</option>
              <option value="expired">Expired</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Environment
            </label>

            <select
              value={environment}
              onChange={(event) =>
                setEnvironment(event.target.value as ApiEnvironment | "all")
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
            >
              <option value="all">All Environments</option>

              <option value="production">Production</option>

              <option value="sandbox">Sandbox</option>
            </select>
          </div>
        </div>
      </div>

      {/* API Keys */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">API Keys</h2>

          <p className="text-sm text-gray-500">
            Manage platform API credentials.
          </p>
        </div>

        {apiKeys.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm text-gray-500">No API keys found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[1000px] w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-xs font-semibold uppercase text-gray-500">
                  <th className="px-4 py-3">API Key</th>

                  <th className="px-4 py-3">Environment</th>

                  <th className="px-4 py-3">Status</th>

                  <th className="px-4 py-3">Owner</th>

                  <th className="px-4 py-3">Requests</th>

                  <th className="px-4 py-3">Last Used</th>

                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {apiKeys.map((apiKey) => (
                  <ApiKeyRow
                    key={apiKey.id}
                    apiKey={apiKey}
                    onRevoke={handleRevoke}
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
}
