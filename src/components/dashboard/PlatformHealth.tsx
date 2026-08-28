interface PlatformHealthItem {
  name: string;
  status: string;
}

interface PlatformHealthProps {
  health?: PlatformHealthItem[];
}

function PlatformHealth({ health = [] }: PlatformHealthProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Platform Health
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Current status of platform services
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {health.map((item) => {
          const isHealthy =
            item.status === "Healthy" ||
            item.status === "Connected" ||
            item.status === "Running";

          return (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4"
            >
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {item.name}
                </p>

                <p className="mt-1 text-xs text-slate-400">Platform service</p>
              </div>

              <div
                className={`flex items-center gap-2 text-sm font-semibold ${
                  isHealthy ? "text-emerald-600" : "text-amber-600"
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    isHealthy ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />

                {item.status}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PlatformHealth;
