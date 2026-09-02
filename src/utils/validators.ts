import type { CreateTenantInput, UpdateTenantInput } from "../types/tenant";

export interface ValidationErrors {
  name?: string;
  code?: string;
  domain?: string;
  plan?: string;
}

export const validateTenant = (
  data: CreateTenantInput | UpdateTenantInput,
): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.name.trim()) {
    errors.name = "Tenant name is required";
  }

  if (!data.code.trim()) {
    errors.code = "Tenant code is required";
  }

  if (!data.domain.trim()) {
    errors.domain = "Domain is required";
  }

  if (!data.plan) {
    errors.plan = "Plan is required";
  }

  return errors;
};

export const isValidTenant = (
  data: CreateTenantInput | UpdateTenantInput,
): boolean => {
  return Object.keys(validateTenant(data)).length === 0;
};
