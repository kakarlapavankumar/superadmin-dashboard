interface MonitoringMetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  status?: "normal" | "warning" | "critical";
}

const MonitoringMetricCard = ({
  title,
  value,
  description,
  status = "normal",
}: MonitoringMetricCardProps) => {
  const statusClasses = {
    normal: "text-gray-900",
    warning: "text-yellow-600",
    critical: "text-red-600",
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{title}</p>

      <p className={`mt-2 text-3xl font-bold ${statusClasses[status]}`}>
        {value}
      </p>

      {description && (
        <p className="mt-1 text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
};

export default MonitoringMetricCard;
