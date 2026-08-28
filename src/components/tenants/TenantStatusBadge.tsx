import type { TenantStatus } from "../../types/tenant";

interface Props {
  status: TenantStatus;
}

export default function TenantStatusBadge({ status }: Props) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        status === "Active"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {status}
    </span>
  );
}
