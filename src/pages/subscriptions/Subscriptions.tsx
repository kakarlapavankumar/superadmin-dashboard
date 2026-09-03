import { Link } from "react-router-dom";
import SubscriptionRow from "../../components/subscriptions/SubscriptionRow";
import Spinner from "../../components/Spinner";
import { useSubscriptions } from "../../hooks/useSubscriptions";

export default function Subscriptions() {
  const { data = [], isLoading, updateSubscription } = useSubscriptions();

  if (isLoading) {
    return <Spinner />;
  }

  const toggle = async (id: number, status: string) => {
    await updateSubscription({
      id,
      data: {
        status: status === "Active" ? "Inactive" : "Active",
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Subscriptions & Licenses
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage subscription plans and tenant licensing.
          </p>
        </div>

        <Link
          to="/subscriptions/create"
          className="rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white"
        >
          + Create Plan
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        <Stat title="Plans" value={data.length} />
        <Stat
          title="Active Plans"
          value={data.filter((x) => x.status === "Active").length}
        />
        <Stat
          title="Tenants"
          value={data.reduce((sum, x) => sum + x.tenantCount, 0)}
        />
        <Stat
          title="Enterprise"
          value={data.find((x) => x.name === "Enterprise")?.tenantCount ?? 0}
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr className="text-left text-sm text-slate-600">
                <th className="px-5 py-4">Plan</th>
                <th className="px-5 py-4">Price</th>
                <th className="px-5 py-4">Cycle</th>
                <th className="px-5 py-4">Users</th>
                <th className="px-5 py-4">Tenants</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((subscription) => (
                <SubscriptionRow
                  key={subscription.id}
                  subscription={subscription}
                  onToggle={() => toggle(subscription.id, subscription.status)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
