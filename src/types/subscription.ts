export type SubscriptionStatus = "Active" | "Inactive" | "Trial" | "Expired";

export type BillingCycle = "Monthly" | "Yearly";

export interface Subscription {
  id: number;
  name: string;
  code: string;
  description: string;
  price: number;
  billingCycle: BillingCycle;
  maxUsers: number;
  storageGB: number;
  apiLimit: number;
  features: string[];
  status: SubscriptionStatus;
  tenantCount: number;
  createdAt: string;
}

export interface License {
  id: number;
  licenseKey: string;
  tenantName: string;
  planName: string;
  startDate: string;
  endDate: string;
  maxUsers: number;
  usedUsers: number;
  status: "Active" | "Expired" | "Suspended";
}
