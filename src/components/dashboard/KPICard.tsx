interface KPICardProps {
  title: string;
  value: number;
  description?: string;
}

export default function KPICard({ title, value, description }: KPICardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <p className="text-gray-500 text-sm">{title}</p>

      <h2 className="text-3xl font-bold mt-2">{value.toLocaleString()}</h2>

      {description && (
        <p className="text-sm text-gray-500 mt-2">{description}</p>
      )}
    </div>
  );
}
