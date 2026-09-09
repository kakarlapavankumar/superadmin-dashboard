import LoginForm from "../../components/auth/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side */}
        <div className="relative hidden overflow-hidden lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-950" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 text-white">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-xl font-bold backdrop-blur">
                  SA
                </div>

                <div>
                  <p className="text-lg font-semibold">Super Admin Portal</p>

                  <p className="text-sm text-blue-200">
                    Platform Administration
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
                Centralized Control
              </p>

              <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
                Manage your entire platform from one place.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-slate-300">
                Monitor tenants, users, organizations, security, billing,
                subscriptions, API management and platform operations through a
                single Super Admin Portal.
              </p>

              <div className="mt-8 grid max-w-lg grid-cols-2 gap-3">
                <Feature
                  title="Tenant Management"
                  description="Manage platform tenants"
                />

                <Feature title="Security" description="Protect your platform" />

                <Feature
                  title="Analytics"
                  description="Monitor platform usage"
                />

                <Feature
                  title="Operations"
                  description="Control platform services"
                />
              </div>
            </div>

            <p className="text-sm text-slate-400">© 2026 Super Admin Portal</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
                SA
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  Super Admin Portal
                </p>

                <p className="text-sm text-slate-500">
                  Platform Administration
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
              <div className="mb-8">
                <p className="text-sm font-semibold text-blue-600">
                  Welcome back
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  Sign in
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Sign in to access the Super Admin Portal.
                </p>
              </div>

              <LoginForm />
            </div>

            <p className="mt-6 text-center text-xs text-slate-400">
              Authorized Super Administrators only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FeatureProps {
  title: string;
  description: string;
}

function Feature({ title, description }: FeatureProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur">
      <p className="text-sm font-semibold text-white">{title}</p>

      <p className="mt-1 text-xs text-blue-100">{description}</p>
    </div>
  );
}
