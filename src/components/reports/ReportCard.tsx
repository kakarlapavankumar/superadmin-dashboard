import type { ReportSummary } from "../../types/reports";

interface ReportCardProps {
  report: ReportSummary;
}

export default function ReportCard({ report }: ReportCardProps) {
  const positive = report.trend === "up";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{report.category}</p>

          <h3 className="mt-1 text-lg font-semibold text-gray-900">
            {report.title}
          </h3>
        </div>

        <div className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
          {report.id}
        </div>
      </div>

      <p className="mt-4 text-2xl font-bold text-gray-900">{report.value}</p>

      <p className="mt-1 text-sm text-gray-500">{report.description}</p>

      <div
        className={`mt-4 text-sm font-medium ${
          positive ? "text-green-600" : "text-red-600"
        }`}
      >
        {report.change > 0 ? "+" : ""}
        {report.change}% from previous period
      </div>
    </div>
  );
}
