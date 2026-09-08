import type { MonitoringIncident } from "../../types/monitoring";

interface IncidentRowProps {
  incident: MonitoringIncident;
}

const IncidentRow = ({ incident }: IncidentRowProps) => {
  const severityClasses = {
    low: "bg-gray-100 text-gray-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-orange-100 text-orange-700",
    critical: "bg-red-100 text-red-700",
  };

  const statusClasses = {
    investigating: "bg-red-100 text-red-700",
    identified: "bg-orange-100 text-orange-700",
    monitoring: "bg-blue-100 text-blue-700",
    resolved: "bg-green-100 text-green-700",
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-6 py-4">
        <p className="font-medium text-gray-900">{incident.title}</p>

        <p className="mt-1 text-sm text-gray-500">{incident.description}</p>
      </td>

      <td className="px-6 py-4 text-sm text-gray-700">{incident.service}</td>

      <td className="px-6 py-4">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${severityClasses[incident.severity]}`}
        >
          <span className="capitalize">{incident.severity}</span>
        </span>
      </td>

      <td className="px-6 py-4">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses[incident.status]}`}
        >
          <span className="capitalize">{incident.status}</span>
        </span>
      </td>

      <td className="px-6 py-4 text-sm text-gray-500">
        {new Date(incident.startedAt).toLocaleString()}
      </td>
    </tr>
  );
};

export default IncidentRow;
