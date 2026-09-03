import {
  ArrowLeft,
  CalendarDays,
  Edit3,
  Layers3,
  Power,
  Users,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import FeatureStatusBadge from "../../components/features/FeatureStatusBadge";

import { useFeature, useToggleFeature } from "../../hooks/useFeatures";

export default function FeatureDetails() {
  const navigate = useNavigate();

  const { id } = useParams();

  const featureId = Number(id);

  const { data: feature, isLoading, isError } = useFeature(featureId);

  const toggleMutation = useToggleFeature();

  if (isLoading) {
    return (
      <div className="p-10 text-center text-sm text-slate-500">
        Loading feature details...
      </div>
    );
  }

  if (isError || !feature) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h2 className="font-semibold text-red-800">Feature not found</h2>

        <button
          type="button"
          onClick={() => navigate("/features")}
          className="mt-4 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-700"
        >
          Back to Features
        </button>
      </div>
    );
  }

  const handleToggle = async () => {
    await toggleMutation.mutateAsync(feature.id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/features")}
            className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 hover:bg-slate-50"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {feature.name}
            </h1>

            <p className="mt-1 font-mono text-sm text-slate-500">
              {feature.key}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate(`/features/${feature.id}/edit`)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Edit3 className="h-4 w-4" />
            Edit
          </button>

          <button
            type="button"
            disabled={toggleMutation.isPending}
            onClick={handleToggle}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Power className="h-4 w-4" />

            {feature.status === "Active" ? "Deactivate" : "Activate"}
          </button>
        </div>
      </div>

      {/* Main Information */}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-50 p-3">
                  <Layers3 className="h-5 w-5 text-blue-600" />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Feature Information
                  </h2>

                  <p className="text-sm text-slate-500">
                    Configuration details
                  </p>
                </div>
              </div>

              <FeatureStatusBadge status={feature.status} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Description
              </p>

              <p className="mt-2 leading-7 text-slate-600">
                {feature.description || "No description provided."}
              </p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Feature Key
                </p>

                <code className="mt-2 block rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  {feature.key}
                </code>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Feature ID
                </p>

                <p className="mt-2 text-sm font-medium text-slate-700">
                  #{feature.id}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Usage */}

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-purple-50 p-3">
                <Users className="h-5 w-5 text-purple-600" />
              </div>

              <div>
                <p className="text-sm text-slate-500">Tenant Usage</p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {feature.tenantCount}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Tenants currently using this feature.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-50 p-3">
                <CalendarDays className="h-5 w-5 text-emerald-600" />
              </div>

              <div>
                <p className="text-sm text-slate-500">Created</p>

                <p className="mt-1 font-semibold text-slate-900">
                  {feature.createdAt}
                </p>
              </div>
            </div>

            <div className="mt-5 border-t border-slate-100 pt-5">
              <p className="text-sm text-slate-500">Last Updated</p>

              <p className="mt-1 font-semibold text-slate-900">
                {feature.updatedAt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
