import { ArrowLeft, Save } from "lucide-react";

import { useState, type FormEvent } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useFeature, useUpdateFeature } from "../../hooks/useFeatures";

import type { FeatureStatus } from "../../types/feature";

export default function EditFeature() {
  const navigate = useNavigate();

  const { id } = useParams();

  const featureId = Number(id);

  const { data: feature, isLoading, isError, error } = useFeature(featureId);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-slate-500">Loading feature...</p>
      </div>
    );
  }

  if (isError || !feature) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h2 className="font-semibold text-red-800">Feature not found</h2>

        <p className="mt-1 text-sm text-red-600">
          {error instanceof Error
            ? error.message
            : "The requested feature could not be found."}
        </p>

        <button
          type="button"
          onClick={() => navigate("/features")}
          className="mt-4 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
        >
          Back to Features
        </button>
      </div>
    );
  }

  return <EditFeatureForm key={feature.id} feature={feature} />;
}

interface EditFeatureFormProps {
  feature: {
    id: number;
    name: string;
    key: string;
    description: string;
    status: FeatureStatus;
  };
}

function EditFeatureForm({ feature }: EditFeatureFormProps) {
  const navigate = useNavigate();

  const mutation = useUpdateFeature();

  const [name, setName] = useState(feature.name);

  const [key, setKey] = useState(feature.key);

  const [description, setDescription] = useState(feature.description);

  const [status, setStatus] = useState<FeatureStatus>(feature.status);

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");

    const trimmedName = name.trim();

    const trimmedKey = key.trim();

    const trimmedDescription = description.trim();

    if (!trimmedName) {
      setErrorMessage("Feature name is required.");
      return;
    }

    if (!trimmedKey) {
      setErrorMessage("Feature key is required.");
      return;
    }

    try {
      await mutation.mutateAsync({
        id: feature.id,
        data: {
          name: trimmedName,
          key: trimmedKey,
          description: trimmedDescription,
          status,
        },
      });

      navigate(`/features/${feature.id}`);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to update feature.",
      );
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Page Header */}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(`/features/${feature.id}`)}
          className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Feature</h1>

          <p className="mt-1 text-sm text-slate-500">
            Update the configuration of{" "}
            <span className="font-medium text-slate-700">{feature.name}</span>.
          </p>
        </div>
      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="space-y-6 p-6">
          {/* Error */}

          {errorMessage && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-700">{errorMessage}</p>
            </div>
          )}

          {/* Feature Name */}

          <div>
            <label
              htmlFor="feature-name"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Feature Name
            </label>

            <input
              id="feature-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Example: Advanced Analytics"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Feature Key */}

          <div>
            <label
              htmlFor="feature-key"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Feature Key
            </label>

            <input
              id="feature-key"
              type="text"
              value={key}
              onChange={(event) =>
                setKey(event.target.value.toLowerCase().replace(/\s+/g, "_"))
              }
              placeholder="advanced_analytics"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 font-mono text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-1.5 text-xs text-slate-400">
              Use lowercase letters, numbers and underscores.
            </p>
          </div>

          {/* Description */}

          <div>
            <label
              htmlFor="feature-description"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Description
            </label>

            <textarea
              id="feature-description"
              rows={5}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe what this feature provides..."
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Status */}

          <div>
            <label
              htmlFor="feature-status"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Status
            </label>

            <select
              id="feature-status"
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as FeatureStatus)
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="Active">Active</option>

              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Footer */}

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 p-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate(`/features/${feature.id}`)}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="h-4 w-4" />

            {mutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
