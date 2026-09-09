import { Link } from "react-router-dom";

import BackToDashboard from "../../components/BackToDashboard";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";
import ApiUsageChart from "../../components/apiManagement/ApiUsageChart";
import ApiMetricCard from "../../components/apiManagement/ApiMetricCard";

import {
  useApiManagementOverview,
  useApiUsageMetrics,
} from "../../hooks/useApiManagement";

export default function ApiUsage() {
  const overviewQuery = useApiManagementOverview();

  const metricsQuery = useApiUsageMetrics();

  if (overviewQuery.isLoading || metricsQuery.isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (overviewQuery.isError || metricsQuery.isError) {
    return (
      <div className="p-6">
        <ErrorMessage message="Unable to load API usage data." />
      </div>
    );
  }

  const overview = overviewQuery.data;

  if (!overview) {
    return (
      <div className="p-6">
        <ErrorMessage message="API usage overview is unavailable." />
      </div>
    );
  }

  const metrics = metricsQuery.data ?? [];

  return (
    <div className="space-y-6 p-6">
      <BackToDashboard />

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">API Usage</h1>

          <p className="mt-1 text-sm text-gray-500">
            Monitor API requests and performance.
          </p>
        </div>

        <Link
          to="/api-management"
          className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          API Management
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ApiMetricCard
          title="Requests Today"
          value={overview.requestsToday.toLocaleString()}
        />

        <ApiMetricCard
          title="Monthly Requests"
          value={overview.requestsThisMonth.toLocaleString()}
        />

        <ApiMetricCard
          title="Avg Response Time"
          value={`${overview.averageResponseTime} ms`}
        />

        <ApiMetricCard title="Error Rate" value={`${overview.errorRate}%`} />
      </div>

      <ApiUsageChart metrics={metrics} />

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="font-semibold text-gray-900">Usage Details</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs font-semibold uppercase text-gray-500">
                <th className="px-6 py-3">Time</th>

                <th className="px-6 py-3">Requests</th>

                <th className="px-6 py-3">Successful</th>

                <th className="px-6 py-3">Failed</th>

                <th className="px-6 py-3">Response Time</th>
              </tr>
            </thead>

            <tbody>
              {metrics.map((metric) => (
                <tr key={metric.timestamp} className="border-b border-gray-100">
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {metric.timestamp}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {metric.requests.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-sm text-green-600">
                    {metric.successfulRequests.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-sm text-red-600">
                    {metric.failedRequests.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {metric.responseTime} ms
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
