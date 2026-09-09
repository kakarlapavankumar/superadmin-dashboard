export type BillingStatus = "active" | "past_due" | "cancelled";

export type InvoiceStatus = "paid" | "pending" | "overdue" | "cancelled";

export type PaymentStatus = "successful" | "failed" | "refunded";

export interface BillingOverview {
  totalRevenue: number;
  monthlyRevenue: number;
  outstandingAmount: number;
  overdueAmount: number;
  paidInvoices: number;
  pendingInvoices: number;
  overdueInvoices: number;
  activeSubscriptions: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  tenantName: string;
  tenantId: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
}

export interface Payment {
  id: string;
  transactionId: string;
  invoiceNumber: string;
  tenantName: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod: string;
  createdAt: string;
}

export interface RevenueMetric {
  month: string;
  revenue: number;
  payments: number;
}
