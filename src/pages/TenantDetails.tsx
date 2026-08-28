import { Link, useParams } from "react-router-dom";

import {
  useActivateTenant,
  useDeactivateTenant,
  useTenant,
} from "../hooks/useTenants";

import ErrorMessage from "../components/ErrorMessage";
import Button from "../components/Button";
import Spinner from "../components/Spinner";

import TenantStatusBadge from "../components/tenants/TenantStatusBadge";
import TenantStats from "../components/tenants/TenantStats";

export default function TenantDetails() {
  const { id } = useParams();

  const tenantId = Number(id);

  const { data: tenant, isLoading, isError } = useTenant(tenantId);

  const activateMutation = useActivateTenant();

  const deactivateMutation = useDeactivateTenant();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !tenant) {
    return <ErrorMessage message="Tenant not found" />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">{tenant.tenantName}</h1>

            <div className="mt-3">
              <TenantStatusBadge status={tenant.status} />
            </div>
          </div>

          <div className="flex gap-3">
            <Link to={`/tenants/${tenant.id}/edit`}>
              <Button>Edit Tenant</Button>
            </Link>

            {tenant.status === "Active" ? (
              <Button
                variant="danger"
                onClick={() => deactivateMutation.mutate(Number(tenant.id))}
              >
                Deactivate
              </Button>
            ) : (
              <Button
                onClick={() => activateMutation.mutate(Number(tenant.id))}
              >
                Activate
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-5">Tenant Information</h2>

        <div className="grid md:grid-cols-2 gap-5">
          <p>
            <strong>Admin:</strong> {tenant.adminName}
          </p>

          <p>
            <strong>Email:</strong> {tenant.adminEmail}
          </p>

          <p>
            <strong>Phone:</strong> {tenant.phone}
          </p>

          <p>
            <strong>Created:</strong> {tenant.createdAt}
          </p>

          <p>
            <strong>Plan:</strong> {tenant.subscription}
          </p>

          <p>
            <strong>Country:</strong> {tenant.country}
          </p>

          <p>
            <strong>Timezone:</strong> {tenant.timeZone}
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Statistics</h2>

        <TenantStats tenant={tenant} />
      </div>
    </div>
  );
}
