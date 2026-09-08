import type { HealthStatus } from "../../types/monitoring";

interface HealthStatusBadgeProps {
  status: HealthStatus;
}

const HealthStatusBadge = ({ status }: HealthStatusBadgeProps) => {
  const classes: Record<HealthStatus, string> = {
    healthy: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    critical: "bg-red-100 text-red-700",
    offline: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${classes[status]}`}
    >
      <span className="capitalize">{status}</span>
    </span>
  );
};

export default HealthStatusBadge;
