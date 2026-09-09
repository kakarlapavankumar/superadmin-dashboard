import { Link } from "react-router-dom";

import BackToDashboard from "../../components/BackToDashboard";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";
import BillingMetricCard from "../../components/billing/BillingMetricCard";
import BillingStatusCard from "../../components/billing/BillingStatusCard";

import { useBillingOverview, useRevenueMetrics } from "../../hooks/useBilling";

export default function Billing() {
  const overviewQuery = useBillingOverview();

  const revenueQuery = useRevenueMetrics();

  if (overviewQuery.isLoading || revenueQuery.isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (overviewQuery.isError || revenueQuery.isError) {
    return (
      <div className="p-6">
        <ErrorMessage message="Unable to load billing information." />
      </div>
    );
  }

  const overview = overviewQuery.data;

  if (!overview) {
    return (
      <div className="p-6">
        <ErrorMessage message="Billing overview is unavailable." />
      </div>
    );
  }

  const revenueMetrics = revenueQuery.data ?? [];

  const maxRevenue = Math.max(
    ...revenueMetrics.map((metric) => metric.revenue),
    1,
  );

  return (
    <div className="space-y-6 p-6">
      <BackToDashboard />

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing</h1>

          <p className="mt-1 text-sm text-gray-500">
            Monitor revenue, invoices and billing activity.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/billing/invoices"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Invoices
          </Link>

          <Link
            to="/billing/payment-history"
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            Payment History
          </Link>
        </div>
      </div>

      {/* Main metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <BillingMetricCard
          title="Total Revenue"
          value={`$${overview.totalRevenue.toLocaleString()}`}
        />

        <BillingMetricCard
          title="Monthly Revenue"
          value={`$${overview.monthlyRevenue.toLocaleString()}`}
        />

        <BillingMetricCard
          title="Outstanding"
          value={`$${overview.outstandingAmount.toLocaleString()}`}
        />

        <BillingMetricCard
          title="Overdue"
          value={`$${overview.overdueAmount.toLocaleString()}`}
        />
      </div>

      {/* Billing status */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <BillingStatusCard
          title="Paid Invoices"
          value={overview.paidInvoices}
          description="Successfully paid invoices"
        />

        <BillingStatusCard
          title="Pending Invoices"
          value={overview.pendingInvoices}
          description="Awaiting payment"
        />

        <BillingStatusCard
          title="Overdue Invoices"
          value={overview.overdueInvoices}
          description="Require attention"
        />

        <BillingStatusCard
          title="Active Subscriptions"
          value={overview.activeSubscriptions}
          description="Currently active"
        />
      </div>

      {/* Revenue chart */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Revenue Trend</h2>

          <p className="text-sm text-gray-500">Monthly revenue performance</p>
        </div>

        <div className="flex h-64 items-end gap-4 overflow-x-auto">
          {revenueMetrics.map((metric) => {
            const height = (metric.revenue / maxRevenue) * 100;

            return (
              <div
                key={metric.month}
                className="flex min-w-[60px] flex-1 flex-col items-center justify-end"
              >
                <span className="mb-2 text-xs text-gray-500">
                  ${(metric.revenue / 1000).toFixed(0)}k
                </span>

                <div
                  className="w-full max-w-[70px] rounded-t-md bg-blue-500"
                  style={{
                    height: `${Math.max(height, 5)}%`,
                  }}
                />

                <span className="mt-2 text-xs font-medium text-gray-600">
                  {metric.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
