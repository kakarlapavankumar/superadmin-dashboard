interface CreateTenantInput {
  name: string;
  code: string;
  adminName: string;
  adminEmail: string;
  subscription: string;
}

export interface ValidationErrors {
  name?: string;
  code?: string;
  adminName?: string;
  adminEmail?: string;
  subscription?: string;
}

export function validateTenant(
  data: CreateTenantInput,
  existingCodes: string[],
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.name.trim()) {
    errors.name = "Tenant name is required";
  }

  if (!data.code.trim()) {
    errors.code = "Tenant code is required";
  } else if (
    existingCodes.some((code) => code.toLowerCase() === data.code.toLowerCase())
  ) {
    errors.code = "Tenant code must be unique";
  }

  if (!data.adminName.trim()) {
    errors.adminName = "Admin name is required";
  }

  if (!data.adminEmail.trim()) {
    errors.adminEmail = "Admin email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.adminEmail)) {
    errors.adminEmail = "Enter a valid email address";
  }

  if (!data.subscription) {
    errors.subscription = "Subscription is required";
  }

  return errors;
}
