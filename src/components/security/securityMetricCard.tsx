interface Props {
  title: string;
  value: string | number;
  description: string;
  icon: string;
  trend?: string;
}

export default function SecurityMetricCard({
  title,
  value,
  description,
  icon,
  trend,
}: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>

          <h3 className="mt-2 text-2xl font-bold text-gray-900">{value}</h3>

          <p className="mt-1 text-xs text-gray-500">{description}</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-lg">
          {icon}
        </div>
      </div>

      {trend && (
        <div className="mt-4 text-xs font-medium text-green-600">{trend}</div>
      )}
    </div>
  );
}
