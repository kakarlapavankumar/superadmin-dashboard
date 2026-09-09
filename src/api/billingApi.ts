import {
  mockBillingOverview,
  mockInvoices,
  mockPayments,
  mockRevenueMetrics,
} from "../mock/billing";

import type {
  BillingOverview,
  Invoice,
  Payment,
  RevenueMetric,
} from "../types/billing";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const billingApi = {
  async getOverview(): Promise<BillingOverview> {
    await delay(500);

    return mockBillingOverview;
  },

  async getInvoices(): Promise<Invoice[]> {
    await delay(500);

    return [...mockInvoices];
  },

  async getPayments(): Promise<Payment[]> {
    await delay(500);

    return [...mockPayments];
  },

  async getRevenueMetrics(): Promise<RevenueMetric[]> {
    await delay(500);

    return [...mockRevenueMetrics];
  },
};
