import type { ApiEnvironment, ApiKeyStatus } from "../../types/apiManagement";

interface ApiStatusBadgeProps {
  status?: ApiKeyStatus;
  environment?: ApiEnvironment;
}

export default function ApiStatusBadge({
  status,
  environment,
}: ApiStatusBadgeProps) {
  if (environment) {
    const styles =
      environment === "production"
        ? "bg-purple-100 text-purple-700"
        : "bg-blue-100 text-blue-700";

    return (
      <span
        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles}`}
      >
        {environment === "production" ? "Production" : "Sandbox"}
      </span>
    );
  }

  if (!status) {
    return null;
  }

  const styles = {
    active: "bg-green-100 text-green-700",
    revoked: "bg-red-100 text-red-700",
    expired: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
