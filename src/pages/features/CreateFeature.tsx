import { ArrowLeft, Layers3, Save } from "lucide-react";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useCreateFeature } from "../../hooks/useFeatures";

import type { FeatureStatus } from "../../types/feature";

export default function CreateFeature() {
  const navigate = useNavigate();

  const mutation = useCreateFeature();

  const [name, setName] = useState("");

  const [key, setKey] = useState("");

  const [description, setDescription] = useState("");

  const [status, setStatus] = useState<FeatureStatus>("Active");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Feature name is required.");
      return;
    }

    if (!key.trim()) {
      setErrorMessage("Feature key is required.");
      return;
    }

    try {
      await mutation.mutateAsync({
        name: name.trim(),
        key: key.trim(),
        description: description.trim(),
        status,
      });

      navigate("/features");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to create feature.",
      );
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/features")}
          className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 hover:bg-slate-50"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">Create Feature</h1>

          <p className="mt-1 text-sm text-slate-500">
            Add a new platform feature.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="border-b border-slate-100 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3">
              <Layers3 className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Feature Information
              </h2>

              <p className="text-sm text-slate-500">
                Enter the details for this feature.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5 p-6">
          {errorMessage && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Feature Name
            </label>

            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Example: Advanced Analytics"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Feature Key
            </label>

            <input
              value={key}
              onChange={(event) =>
                setKey(event.target.value.toLowerCase().replace(/\s+/g, "_"))
              }
              placeholder="advanced_analytics"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 font-mono text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-1.5 text-xs text-slate-400">
              Use a unique machine-readable key.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe what this feature provides..."
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Status
            </label>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as FeatureStatus)
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="Active">Active</option>

              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 p-6">
          <button
            type="button"
            onClick={() => navigate("/features")}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />

            {mutation.isPending ? "Creating..." : "Create Feature"}
          </button>
        </div>
      </form>
    </div>
  );
}
