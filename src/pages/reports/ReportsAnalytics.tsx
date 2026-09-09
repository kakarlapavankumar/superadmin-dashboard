import BackToDashboard from "../../components/BackToDashboard";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";

import ReportCard from "../../components/reports/ReportCard";
import RevenueChart from "../../components/reports/RevenueChart";
import UsageChart from "../../components/reports/UsageChart";

import {
  useReportsOverview,
  useRevenueReports,
  useUsageReports,
  useReportSummaries,
} from "../../hooks/useReports";

export default function ReportsAnalytics() {
  const overviewQuery = useReportsOverview();
  const revenueQuery = useRevenueReports();
  const usageQuery = useUsageReports();
  const summariesQuery = useReportSummaries();

  const loading =
    overviewQuery.isLoading ||
    revenueQuery.isLoading ||
    usageQuery.isLoading ||
    summariesQuery.isLoading;

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (
    overviewQuery.isError ||
    revenueQuery.isError ||
    usageQuery.isError ||
    summariesQuery.isError
  ) {
    return (
      <div className="space-y-6 p-4 sm:p-6">
        <BackToDashboard />

        <ErrorMessage message="Unable to load reports and analytics." />
      </div>
    );
  }

  const overview = overviewQuery.data;
  const revenue = revenueQuery.data ?? [];
  const usage = usageQuery.data ?? [];
  const summaries = summariesQuery.data ?? [];

  if (!overview) {
    return (
      <div className="space-y-6 p-4 sm:p-6">
        <BackToDashboard />

        <ErrorMessage message="Reports overview is unavailable." />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <BackToDashboard />

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Reports & Analytics
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Monitor platform performance, revenue, usage, tenants, users, and
          subscriptions.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            ${overview.totalRevenue.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-green-600">
            Platform lifetime revenue
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Monthly Revenue</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            ${overview.monthlyRevenue.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-green-600">Current month</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Active Tenants</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {overview.activeTenants}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Out of {overview.totalTenants} tenants
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Active Users</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {overview.activeUsers.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Out of {overview.totalUsers.toLocaleString()} users
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Subscriptions</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {overview.activeSubscriptions}
          </p>
          <p className="mt-1 text-xs text-gray-500">Active subscriptions</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">API Requests</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {overview.totalApiRequests.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-gray-500">Total requests</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Avg Response Time</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {overview.averageResponseTime} ms
          </p>
          <p className="mt-1 text-xs text-green-600">Platform performance</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Error Rate</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {overview.errorRate}%
          </p>
          <p className="mt-1 text-xs text-green-600">API error rate</p>
        </div>
      </div>

      {/* Report Summary */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Key Reports</h2>

          <p className="mt-1 text-sm text-gray-500">
            Important platform performance indicators.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summaries.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <RevenueChart data={revenue} />

        <UsageChart data={usage} />
      </div>

      {/* Report Information */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Analytics Summary
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Tenant Utilization</p>

            <p className="mt-2 text-xl font-bold text-gray-900">
              {((overview.activeTenants / overview.totalTenants) * 100).toFixed(
                1,
              )}
              %
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">User Activity</p>

            <p className="mt-2 text-xl font-bold text-gray-900">
              {((overview.activeUsers / overview.totalUsers) * 100).toFixed(1)}%
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Subscription Activation</p>

            <p className="mt-2 text-xl font-bold text-gray-900">
              {(
                (overview.activeSubscriptions / overview.totalSubscriptions) *
                100
              ).toFixed(1)}
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
