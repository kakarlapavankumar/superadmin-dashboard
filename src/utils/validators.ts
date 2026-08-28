import type { CreateTenantInput } from "../types/tenant";

export interface ValidationErrors {
  tenantName?: string;
  tenantCode?: string;
  adminName?: string;
  adminEmail?: string;
  phone?: string;
  subscription?: string;
}

export function validateTenant(
  data: CreateTenantInput,
  existingCodes: string[],
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.tenantName.trim()) {
    errors.tenantName = "Tenant name is required";
  }

  if (!data.tenantCode.trim()) {
    errors.tenantCode = "Tenant code is required";
  } else if (
    existingCodes.some(
      (code) => code.toLowerCase() === data.tenantCode.trim().toLowerCase(),
    )
  ) {
    errors.tenantCode = "Tenant code already exists";
  }

  if (!data.adminName.trim()) {
    errors.adminName = "Admin name is required";
  }

  if (!data.adminEmail.trim()) {
    errors.adminEmail = "Admin email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.adminEmail)) {
    errors.adminEmail = "Enter a valid email address";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required";
  }

  if (!data.subscription) {
    errors.subscription = "Subscription is required";
  }

  return errors;
}
