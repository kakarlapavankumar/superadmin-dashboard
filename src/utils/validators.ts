import type { CreateTenantInput } from "../types/tenant";

export interface ValidationErrors {
  name?: string;
  code?: string;
  domain?: string;
  plan?: string;
  status?: string;
}

export function validateTenant(values: CreateTenantInput): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!values.name.trim()) {
    errors.name = "Tenant name is required";
  }

  if (!values.code.trim()) {
    errors.code = "Tenant code is required";
  } else if (!/^[A-Z0-9_-]+$/i.test(values.code)) {
    errors.code = "Tenant code can contain only letters, numbers, _ and -";
  }

  if (!values.domain.trim()) {
    errors.domain = "Domain is required";
  } else if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.domain)) {
    errors.domain = "Enter a valid domain";
  }

  if (!values.plan) {
    errors.plan = "Plan is required";
  }

  if (!values.status) {
    errors.status = "Status is required";
  }

  return errors;
}

export function isTenantFormValid(errors: ValidationErrors): boolean {
  return Object.keys(errors).length === 0;
}
