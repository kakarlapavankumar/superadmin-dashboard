import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";

import { useState, type FormEvent } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { getDemoCredentials } from "../../auth/authService";

import { useAuth } from "../../auth/useAuth";

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const demoCredentials = getDemoCredentials();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setError("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsSubmitting(true);

    const result = login(trimmedEmail, password);

    if (!result.success) {
      setError(result.message ?? "Unable to sign in. Please try again.");

      setIsSubmitting(false);
      return;
    }

    const state = location.state as { from?: string } | null | undefined;

    const destination =
      state?.from && state.from !== "/login" ? state.from : "/dashboard";

    navigate(destination, {
      replace: true,
    });

    setIsSubmitting(false);
  };

  const fillDemoCredentials = () => {
    setEmail(demoCredentials.email);

    setPassword(demoCredentials.password);

    setError("");
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900">
            <ShieldCheck className="h-7 w-7 text-white" />
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to your Super Admin Portal
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email Address
            </label>

            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Sign In */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-blue-900">
              Demo Credentials
            </p>

            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900"
            >
              Use Demo Login
            </button>
          </div>

          <div className="space-y-1 text-xs text-blue-800">
            <p>
              <span className="font-medium">Email:</span>{" "}
              {demoCredentials.email}
            </p>

            <p>
              <span className="font-medium">Password:</span>{" "}
              {demoCredentials.password}
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-slate-400">
          Super Admin Portal
        </p>
      </div>
    </div>
  );
}
