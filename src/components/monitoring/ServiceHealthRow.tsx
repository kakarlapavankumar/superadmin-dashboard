import type { ServiceHealth } from "../../types/monitoring";

import HealthStatusBadge from "./HealthStatusBadge";

interface ServiceHealthRowProps {
  service: ServiceHealth;
}

const ServiceHealthRow = ({ service }: ServiceHealthRowProps) => {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-6 py-4">
        <div>
          <p className="font-medium text-gray-900">{service.name}</p>

          <p className="mt-1 text-xs text-gray-500">{service.description}</p>
        </div>
      </td>

      <td className="px-6 py-4">
        <HealthStatusBadge status={service.status} />
      </td>

      <td className="px-6 py-4 text-sm text-gray-700">{service.uptime}%</td>

      <td className="px-6 py-4 text-sm text-gray-700">
        {service.responseTime} ms
      </td>

      <td className="px-6 py-4 text-sm text-gray-500">
        {new Date(service.lastChecked).toLocaleTimeString()}
      </td>
    </tr>
  );
};

export default ServiceHealthRow;
