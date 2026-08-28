import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface GrowthData {
  month: string;
  tenants: number;
}

interface Props {
  data: GrowthData[];
}

export default function TenantGrowthChart({ data }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="font-bold text-lg mb-5">Tenant Growth</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="tenants"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
