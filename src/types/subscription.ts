export type SubscriptionStatus =
  | "Active"
  | "Trial"
  | "Suspended"
  | "Cancelled"
  | "Expired";

export type BillingCycle = "Monthly" | "Quarterly" | "Annual";

export type PaymentStatus = "Paid" | "Pending" | "Failed";

export type PlanType = "Basic" | "Professional" | "Enterprise";

export interface Subscription {
  id: number;

  tenantId: number;
  tenantName: string;

  plan: PlanType;

  status: SubscriptionStatus;

  billingCycle: BillingCycle;

  price: number;

  maxUsers: number;
  usedUsers: number;

  storageLimit: number;
  usedStorage: number;

  apiLimit: number;
  usedApiCalls: number;

  startDate: string;
  endDate: string;

  nextBillingDate: string;

  autoRenew: boolean;

  paymentStatus: PaymentStatus;

  createdAt: string;
  updatedAt: string;
}

export interface CreateSubscriptionInput {
  tenantId: number;
  tenantName: string;

  plan: PlanType;

  status: SubscriptionStatus;

  billingCycle: BillingCycle;

  price: number;

  maxUsers: number;

  storageLimit: number;

  apiLimit: number;

  startDate: string;

  endDate: string;

  nextBillingDate: string;

  autoRenew: boolean;

  paymentStatus: PaymentStatus;
}

export interface UpdateSubscriptionInput {
  tenantId?: number;
  tenantName?: string;

  plan?: PlanType;

  status?: SubscriptionStatus;

  billingCycle?: BillingCycle;

  price?: number;

  maxUsers?: number;

  storageLimit?: number;

  apiLimit?: number;

  startDate?: string;

  endDate?: string;

  nextBillingDate?: string;

  autoRenew?: boolean;

  paymentStatus?: PaymentStatus;
}
