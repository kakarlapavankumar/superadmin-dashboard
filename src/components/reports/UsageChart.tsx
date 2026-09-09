import type { UsageReport } from "../../types/reports";

interface UsageChartProps {
  data: UsageReport[];
}

export default function UsageChart({ data }: UsageChartProps) {
  const maxRequests = Math.max(...data.map((item) => item.apiRequests), 1);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Platform Usage</h2>

        <p className="mt-1 text-sm text-gray-500">
          API requests and active user activity.
        </p>
      </div>

      <div className="space-y-5">
        {data.map((item) => {
          const width = (item.apiRequests / maxRequests) * 100;

          return (
            <div key={item.month}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {item.month}
                </span>

                <span className="text-sm text-gray-500">
                  {item.apiRequests.toLocaleString()} requests
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-indigo-500"
                  style={{ width: `${width}%` }}
                />
              </div>

              <div className="mt-1 text-xs text-gray-400">
                {item.activeUsers.toLocaleString()} active users
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
