import { useQuery } from "@tanstack/react-query";

import { billingApi } from "../api/billingApi";

export const useBillingOverview = () => {
  return useQuery({
    queryKey: ["billing", "overview"],
    queryFn: billingApi.getOverview,
  });
};

export const useInvoices = () => {
  return useQuery({
    queryKey: ["billing", "invoices"],
    queryFn: billingApi.getInvoices,
  });
};

export const usePaymentHistory = () => {
  return useQuery({
    queryKey: ["billing", "payments"],
    queryFn: billingApi.getPayments,
  });
};

export const useRevenueMetrics = () => {
  return useQuery({
    queryKey: ["billing", "revenue"],
    queryFn: billingApi.getRevenueMetrics,
  });
};
