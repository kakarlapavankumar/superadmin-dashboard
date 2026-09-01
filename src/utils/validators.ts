import type { CreateTenantInput } from "../types/tenant";

export const validateTenant = (
  data: CreateTenantInput,
): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.name.trim()) {
    errors.name = "Tenant name is required";
  }

  if (!data.code.trim()) {
    errors.code = "Tenant code is required";
  }

  if (!data.domain.trim()) {
    errors.domain = "Domain is required";
  }

  if (!data.plan.trim()) {
    errors.plan = "Plan is required";
  }

  return errors;
};
