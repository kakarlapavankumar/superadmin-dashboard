import {
  Activity,
  BarChart3,
  Building2,
  ShieldCheck,
  Users,
} from "lucide-react";

import LoginForm from "../../components/auth/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* ========================= */}
        {/* Left Side                  */}
        {/* ========================= */}

        <div className="relative hidden overflow-hidden bg-slate-900 lg:flex">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative flex w-full flex-col justify-between p-12 xl:p-16">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>

              <div>
                <p className="text-lg font-bold text-white">Super Admin</p>

                <p className="text-xs text-slate-400">Management Portal</p>
              </div>
            </div>

            {/* Content */}
            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />

                <span className="text-xs font-medium text-slate-300">
                  Platform Administration
                </span>
              </div>

              <h2 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
                Manage your entire platform from one place.
              </h2>

              <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
                Monitor tenants, users, organizations, subscriptions, security,
                and platform activity through a centralized administration
                portal.
              </p>

              {/* Features */}
              <div className="mt-10 grid grid-cols-2 gap-4">
                <FeatureCard
                  icon={<Building2 />}
                  title="Tenant Management"
                  description="Manage all platform tenants"
                />

                <FeatureCard
                  icon={<Users />}
                  title="User Management"
                  description="Control users and access"
                />

                <FeatureCard
                  icon={<BarChart3 />}
                  title="Global Analytics"
                  description="Monitor platform performance"
                />

                <FeatureCard
                  icon={<Activity />}
                  title="Security & Audit"
                  description="Track platform activity"
                />
              </div>
            </div>

            {/* Footer */}
            <p className="text-xs text-slate-500">
              © 2026 Super Admin Portal. All rights reserved.
            </p>
          </div>
        </div>

        {/* ========================= */}
        {/* Right Side                 */}
        {/* ========================= */}

        <div className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-12">
          <div className="w-full max-w-md">
            {/* Mobile Brand */}
            <div className="mb-8 flex justify-center lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900">
                  <ShieldCheck className="h-6 w-6 text-white" />
                </div>

                <div>
                  <p className="font-bold text-slate-900">Super Admin</p>

                  <p className="text-xs text-slate-500">Management Portal</p>
                </div>
              </div>
            </div>

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="mb-3 h-5 w-5 text-slate-300">{icon}</div>

      <p className="text-sm font-semibold text-white">{title}</p>

      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </div>
  );
}
