interface BillingStatusCardProps {
  title: string;
  value: string | number;
  description: string;
}

export default function BillingStatusCard({
  title,
  value,
  description,
}: BillingStatusCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>

        <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
      </div>

      <p className="mt-3 text-2xl font-bold text-gray-900">{value}</p>

      <p className="mt-1 text-xs text-gray-500">{description}</p>
    </div>
  );
}
