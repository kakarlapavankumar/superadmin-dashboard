import { useNavigate, useParams } from "react-router-dom";

import TenantForm from "../components/tenants/TenantForm";

import { useTenant, useTenants, useUpdateTenant } from "../hooks/useTenants";

import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

export default function EditTenant() {
  const { id } = useParams();

  const navigate = useNavigate();

  const tenantId = Number(id);

  const { data: tenant, isLoading, isError } = useTenant(tenantId);

  const { data: tenants = [] } = useTenants();

  const mutation = useUpdateTenant();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !tenant) {
    return <ErrorMessage message="Tenant not found" />;
  }

  const existingCodes = tenants
    .filter((item) => item.id !== tenant.id)
    .map((item) => item.tenantCode);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Edit Tenant</h1>

      <TenantForm
        initialData={tenant}
        existingCodes={existingCodes}
        submitText="Update Tenant"
        onSubmit={(data) => {
          mutation.mutate(
            {
              id: Number(tenant.id),
              data: {
                ...tenant,
                ...data,
                subscription: data.subscription as typeof tenant.subscription,
                status: data.status as never,
              },
            },
            {
              onSuccess: () => {
                navigate(`/tenants/${tenant.id}`);
              },
            },
          );
        }}
        loading={mutation.isPending}
      />
    </div>
  );
}
