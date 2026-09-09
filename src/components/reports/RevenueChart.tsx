import type { RevenueReport } from "../../types/reports";

interface RevenueChartProps {
  data: RevenueReport[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const maxRevenue = Math.max(...data.map((item) => item.revenue), 1);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Revenue Analytics
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Monthly platform revenue performance.
        </p>
      </div>

      <div className="flex h-64 items-end gap-3 sm:gap-6">
        {data.map((item) => {
          const height = (item.revenue / maxRevenue) * 100;

          return (
            <div
              key={item.month}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <span className="text-xs font-medium text-gray-600">
                ${(item.revenue / 1000).toFixed(0)}K
              </span>

              <div className="flex h-48 w-full items-end">
                <div
                  className="w-full rounded-t-lg bg-blue-500 transition-all hover:bg-blue-600"
                  style={{ height: `${height}%` }}
                  title={`${item.month}: $${item.revenue.toLocaleString()}`}
                />
              </div>

              <span className="text-xs text-gray-500">{item.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
