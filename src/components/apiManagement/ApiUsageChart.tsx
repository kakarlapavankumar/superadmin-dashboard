import type { ApiUsageMetric } from "../../types/apiManagement";

interface ApiUsageChartProps {
  metrics: ApiUsageMetric[];
}

export default function ApiUsageChart({ metrics }: ApiUsageChartProps) {
  if (metrics.length === 0) {
    return (
      <div className="flex h-72 items-center justify-center text-sm text-gray-500">
        No usage data available.
      </div>
    );
  }

  const maxRequests = Math.max(...metrics.map((metric) => metric.requests), 1);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">API Requests</h3>

        <p className="text-sm text-gray-500">
          Requests received during the selected period
        </p>
      </div>

      <div className="flex h-64 items-end gap-3 overflow-x-auto">
        {metrics.map((metric) => {
          const height = (metric.requests / maxRequests) * 100;

          return (
            <div
              key={metric.timestamp}
              className="flex min-w-[42px] flex-1 flex-col items-center justify-end"
            >
              <span className="mb-2 text-[10px] text-gray-500">
                {(metric.requests / 1000).toFixed(1)}k
              </span>

              <div
                className="w-full rounded-t-md bg-blue-500 transition-all hover:bg-blue-600"
                style={{
                  height: `${Math.max(height, 5)}%`,
                }}
              />

              <span className="mt-2 text-xs text-gray-500">
                {metric.timestamp}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
