interface Props {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
}

export default function SecurityCard({ title, value, subtitle, icon }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>

          {subtitle && <p className="mt-1 text-xs text-gray-500">{subtitle}</p>}
        </div>

        {icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
