import {
  useActiveSessions,
  useResolveSecurityEvent,
  useSecurityEvents,
  useSecurityOverview,
  useSecuritySettings,
  useTerminateSession,
  useUpdateSecuritySetting,
} from "../../hooks/usesecurity";

import SecurityMetricCard from "../../components/security/securityMetricCard";
import SecuritySettingRow from "../../components/security/SecuritySettingRow";
import SecurityEventRow from "../../components/security/SecurityEventRow";

import Spinner from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";
import PageHeader from "../../components/PageHeader";
import BackToDashboard from "../../components/BackToDashboard";

export default function Security() {
  const overview = useSecurityOverview();
  const settings = useSecuritySettings();
  const events = useSecurityEvents();
  const sessions = useActiveSessions();

  const updateSetting = useUpdateSecuritySetting();
  const resolveEvent = useResolveSecurityEvent();
  const terminateSession = useTerminateSession();

  const isLoading =
    overview.isLoading ||
    settings.isLoading ||
    events.isLoading ||
    sessions.isLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (
    overview.isError ||
    settings.isError ||
    events.isError ||
    sessions.isError
  ) {
    return (
      <div className="p-6">
        <ErrorMessage message="Failed to load security information." />
      </div>
    );
  }

  const data = overview.data;

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Security"
        description="Monitor platform security, authentication, access and security events."
      />

      <BackToDashboard />

      {/* Security Score */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Overall Security Score
            </p>

            <div className="mt-2 flex items-end gap-2">
              <span className="text-5xl font-bold text-gray-900">
                {data.securityScore}
              </span>

              <span className="mb-2 text-gray-400">/ 100</span>
            </div>

            <p className="mt-2 text-sm text-green-600">
              Your platform security is in good condition.
            </p>
          </div>

          <div className="h-28 w-28">
            <div className="flex h-full w-full items-center justify-center rounded-full border-[10px] border-gray-900">
              <span className="text-2xl font-bold">{data.securityScore}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SecurityMetricCard
          title="Active Sessions"
          value={data.activeSessions}
          description="Currently active sessions"
          icon="🖥️"
        />

        <SecurityMetricCard
          title="Failed Logins"
          value={data.failedLogins24h}
          description="Last 24 hours"
          icon="🔐"
        />

        <SecurityMetricCard
          title="Suspicious Activity"
          value={data.suspiciousActivities}
          description="Requires attention"
          icon="⚠️"
        />

        <SecurityMetricCard
          title="MFA Adoption"
          value={`${Math.round(
            (data.mfaEnabledUsers / data.totalUsers) * 100,
          )}%`}
          description={`${data.mfaEnabledUsers.toLocaleString()} users`}
          icon="🛡️"
        />
      </div>

      {/* Settings */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Security Settings
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Configure security policies for the platform.
          </p>
        </div>

        <div>
          {settings.data?.map((setting) => (
            <SecuritySettingRow
              key={setting.id}
              setting={setting}
              loading={updateSetting.isPending}
              onToggle={(id, enabled) => updateSetting.mutate({ id, enabled })}
            />
          ))}
        </div>
      </div>

      {/* Security Events */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Security Events
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Recent security-related activities.
          </p>
        </div>

        {events.data?.length ? (
          events.data.map((event) => (
            <SecurityEventRow
              key={event.id}
              event={event}
              loading={resolveEvent.isPending}
              onResolve={(id) => resolveEvent.mutate(id)}
            />
          ))
        ) : (
          <p className="py-8 text-center text-sm text-gray-500">
            No security events found.
          </p>
        )}
      </div>

      {/* Active Sessions */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Active Sessions
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Review currently active administrator sessions.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead>
              <tr className="border-b border-gray-200 text-xs uppercase text-gray-500">
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Device</th>
                <th className="px-4 py-3">IP Address</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {sessions.data?.map((session) => (
                <tr key={session.id} className="border-b border-gray-100">
                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-900">
                      {session.userName}
                    </div>

                    <div className="text-xs text-gray-500">{session.email}</div>
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-600">
                    {session.device}
                    <div className="text-xs text-gray-400">
                      {session.browser}
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-600">
                    {session.ipAddress}
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-600">
                    {session.location}
                  </td>

                  <td className="px-4 py-4">
                    {session.current ? (
                      <span className="text-xs font-medium text-green-600">
                        Current session
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => terminateSession.mutate(session.id)}
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        Terminate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
