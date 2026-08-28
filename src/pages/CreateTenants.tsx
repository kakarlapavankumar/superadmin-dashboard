import { useNavigate } from "react-router-dom";
import type { ComponentProps } from "react";

import TenantForm from "../components/tenants/TenantForm";

import { useCreateTenant, useTenants } from "../hooks/useTenants";

type CreateTenantInput = Parameters<
  NonNullable<ComponentProps<typeof TenantForm>["onSubmit"]>
>[0];

export default function CreateTenant() {
  const navigate = useNavigate();

  const { data: tenants = [] } = useTenants();

  const mutation = useCreateTenant();
  type CreateTenantMutationInput = Parameters<typeof mutation.mutate>[0];

  function handleSubmit(data: CreateTenantInput) {
    const payload: CreateTenantMutationInput = {
      ...data,
      status: data.status as CreateTenantMutationInput["status"],
      tenantCode: data.code,
      tenantName: data.name,
      timeZone: data.timezone,
      subscription:
        data.subscription as CreateTenantMutationInput["subscription"],
    };

    mutation.mutate(payload, {
      onSuccess: () => {
        navigate("/tenants");
      },
    });
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Create New Tenant</h1>

      <TenantForm
        existingCodes={tenants.map((tenant) => tenant.tenantCode)}
        submitText="Create Tenant"
        onSubmit={handleSubmit}
        loading={mutation.isPending}
      />
    </div>
  );
}
