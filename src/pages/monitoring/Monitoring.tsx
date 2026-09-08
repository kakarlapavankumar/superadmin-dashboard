import BackToDashboard from "../../components/BackToDashboard";
import ErrorMessage from "../../components/ErrorMessage";
import PageHeader from "../../components/PageHeader";
import Spinner from "../../components/Spinner";

import MonitoringMetricCard from "../../components/monitoring/MonitoringMetricCard";
import ServiceHealthRow from "../../components/monitoring/ServiceHealthRow";
import IncidentRow from "../../components/monitoring/IncidentRow";
import HealthStatusBadge from "../../components/monitoring/HealthStatusBadge";

import {
  useMonitoringIncidents,
  useMonitoringMetrics,
  useMonitoringOverview,
  useMonitoringServices,
} from "../../hooks/useMonitoring";

const Monitoring = () => {
  const overviewQuery = useMonitoringOverview();
  const servicesQuery = useMonitoringServices();
  const metricsQuery = useMonitoringMetrics();
  const incidentsQuery = useMonitoringIncidents();

  /*
   * Loading state
   */
  if (
    overviewQuery.isLoading ||
    servicesQuery.isLoading ||
    metricsQuery.isLoading ||
    incidentsQuery.isLoading
  ) {
    return (
      <div className="p-6">
        <Spinner />
      </div>
    );
  }

  /*
   * Error state
   */
  if (
    overviewQuery.isError ||
    servicesQuery.isError ||
    metricsQuery.isError ||
    incidentsQuery.isError
  ) {
    return (
      <div className="p-6">
        <ErrorMessage message="Failed to load monitoring data." />

        <button
          type="button"
          onClick={() => {
            overviewQuery.refetch();
            servicesQuery.refetch();
            metricsQuery.refetch();
            incidentsQuery.refetch();
          }}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  /*
   * IMPORTANT:
   * React Query data is technically optional.
   * We explicitly guard against undefined here.
   */
  const overview = overviewQuery.data;

  if (!overview) {
    return (
      <div className="p-6">
        <ErrorMessage message="Monitoring overview data is unavailable." />

        <button
          type="button"
          onClick={() => overviewQuery.refetch()}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  const services = servicesQuery.data ?? [];
  const metrics = metricsQuery.data ?? [];
  const incidents = incidentsQuery.data ?? [];

  const latestMetric =
    metrics.length > 0 ? metrics[metrics.length - 1] : undefined;

  /*
   * Refresh all monitoring data
   */
  const handleRefresh = () => {
    overviewQuery.refetch();
    servicesQuery.refetch();
    metricsQuery.refetch();
    incidentsQuery.refetch();
  };

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <PageHeader
        title="Monitoring"
        description="Monitor platform health, services, infrastructure and incidents."
      />

      <BackToDashboard />

      {/* Platform Status */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Platform Status</p>

            <div className="mt-2 flex items-center gap-3">
              <HealthStatusBadge status={overview.platformStatus} />

              <span className="text-sm text-gray-500">
                Last updated just now
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={
              overviewQuery.isFetching ||
              servicesQuery.isFetching ||
              metricsQuery.isFetching ||
              incidentsQuery.isFetching
            }
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {overviewQuery.isFetching ||
            servicesQuery.isFetching ||
            metricsQuery.isFetching ||
            incidentsQuery.isFetching
              ? "Refreshing..."
              : "Refresh"}
          </button>
        </div>
      </div>

      {/* Monitoring Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MonitoringMetricCard
          title="Uptime"
          value={`${overview.uptime}%`}
          description="Platform availability"
        />

        <MonitoringMetricCard
          title="CPU Usage"
          value={`${overview.cpuUsage}%`}
          description="Current server CPU usage"
          status={
            overview.cpuUsage > 80
              ? "critical"
              : overview.cpuUsage > 65
                ? "warning"
                : "normal"
          }
        />

        <MonitoringMetricCard
          title="Memory Usage"
          value={`${overview.memoryUsage}%`}
          description="Current memory utilization"
          status={
            overview.memoryUsage > 85
              ? "critical"
              : overview.memoryUsage > 70
                ? "warning"
                : "normal"
          }
        />

        <MonitoringMetricCard
          title="Storage Usage"
          value={`${overview.storageUsage}%`}
          description="Current storage utilization"
          status={
            overview.storageUsage > 90
              ? "critical"
              : overview.storageUsage > 75
                ? "warning"
                : "normal"
          }
        />

        <MonitoringMetricCard
          title="API Response"
          value={`${overview.apiResponseTime} ms`}
          description="Average response time"
          status={
            overview.apiResponseTime > 500
              ? "critical"
              : overview.apiResponseTime > 300
                ? "warning"
                : "normal"
          }
        />

        <MonitoringMetricCard
          title="Requests / Minute"
          value={overview.requestsPerMinute.toLocaleString()}
          description="Current platform traffic"
        />

        <MonitoringMetricCard
          title="Error Rate"
          value={`${overview.errorRate}%`}
          description="API error percentage"
          status={
            overview.errorRate > 5
              ? "critical"
              : overview.errorRate > 2
                ? "warning"
                : "normal"
          }
        />

        <MonitoringMetricCard
          title="Active Users"
          value={overview.activeUsers.toLocaleString()}
          description="Currently active users"
        />
      </div>

      {/* Resource Utilization */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Resource Utilization
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Current infrastructure resource usage.
          </p>
        </div>

        <div className="space-y-6">
          {/* CPU */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">CPU</span>

              <span className="text-sm font-medium text-gray-600">
                {overview.cpuUsage}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500"
                style={{
                  width: `${Math.min(overview.cpuUsage, 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Memory */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Memory</span>

              <span className="text-sm font-medium text-gray-600">
                {overview.memoryUsage}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500"
                style={{
                  width: `${Math.min(overview.memoryUsage, 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Storage */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Storage</span>

              <span className="text-sm font-medium text-gray-600">
                {overview.storageUsage}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500"
                style={{
                  width: `${Math.min(overview.storageUsage, 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Latest Metrics */}
      {latestMetric && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Latest Requests</p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {latestMetric.requests.toLocaleString()}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Requests at {latestMetric.timestamp}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Latest Errors</p>

            <p className="mt-2 text-2xl font-bold text-red-600">
              {latestMetric.errors}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Errors at {latestMetric.timestamp}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Response Time</p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {latestMetric.responseTime} ms
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Latest recorded response
            </p>
          </div>
        </div>
      )}

      {/* Service Health */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Service Health
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {overview.servicesOnline} of {overview.servicesTotal} services
                operational.
              </p>
            </div>

            <HealthStatusBadge
              status={
                overview.servicesOnline === overview.servicesTotal
                  ? "healthy"
                  : overview.servicesOnline > overview.servicesTotal / 2
                    ? "warning"
                    : "critical"
              }
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {services.length === 0 ? (
            <div className="p-8 text-center">
              <p className="font-medium text-gray-900">
                No service data available
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Service health information is currently unavailable.
              </p>
            </div>
          ) : (
            <table className="min-w-[800px] w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Service
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Uptime
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Response
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Last Checked
                  </th>
                </tr>
              </thead>

              <tbody>
                {services.map((service) => (
                  <ServiceHealthRow key={service.id} service={service} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Incidents
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Recent platform incidents and service events.
              </p>
            </div>

            <span className="text-sm text-gray-500">
              {incidents.length} incident
              {incidents.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          {incidents.length === 0 ? (
            <div className="p-8 text-center">
              <p className="font-medium text-gray-900">No incidents</p>

              <p className="mt-1 text-sm text-gray-500">
                All systems are operating normally.
              </p>
            </div>
          ) : (
            <table className="min-w-[900px] w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Incident
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Service
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Severity
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Started
                  </th>
                </tr>
              </thead>

              <tbody>
                {incidents.map((incident) => (
                  <IncidentRow key={incident.id} incident={incident} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
