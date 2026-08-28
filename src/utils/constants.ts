export const SUBSCRIPTION_PLANS = ["Basic", "Pro", "Enterprise"] as const;

export const TENANT_STATUSES = ["Active", "Inactive"] as const;

export const COUNTRIES = [
  "India",
  "United States",
  "United Kingdom",
  "Australia",
  "Canada",
  "Singapore",
] as const;

export const TIMEZONES = [
  "Asia/Kolkata",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Australia/Sydney",
  "Asia/Singapore",
] as const;

export const ITEMS_PER_PAGE = 5;

export const DEFAULT_COUNTRY = "India";

export const DEFAULT_TIMEZONE = "Asia/Kolkata";

export const DEFAULT_STATUS = "Active";

export const DEFAULT_SUBSCRIPTION = "Enterprise";
