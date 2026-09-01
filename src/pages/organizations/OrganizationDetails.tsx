import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  MapPin,
  Users,
  Briefcase,
  Pencil,
  Power,
} from "lucide-react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getOrganization,
  toggleOrganizationStatus,
} from "../../api/organizationApi";

const OrganizationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: organization,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["organization", id],
    queryFn: () => getOrganization(id as string),
    enabled: Boolean(id),
  });

  const statusMutation = useMutation({
    mutationFn: () =>
      toggleOrganizationStatus(id as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organization", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["organizations"],
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-sm text-slate-500">
          Loading organization...
        </div>
      </div>
    );
  }

  if (isError || !organization) {
    return (
      <div className="p-6">
        <button
          onClick={() => navigate("/organizations")}
          className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft size={18} />
          Back to Organizations
        </button>

        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h2 className="font-semibold text-red-700">
            Organization not found
          </h2>

          <p className="mt-1 text-sm text-red-600">
            The organization you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <button
            onClick={() => navigate("/organizations")}
            className="mb-4 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft size={17} />
            Back to Organizations
          </button>

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Building2 size={28} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {organization.name}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Organization ID: {organization.id}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() =>
              navigate(`/organizations/${organization.id}/edit`)
            }
            className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            onClick={() => statusMutation.mutate()}
            disabled={statusMutation.isPending}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${
              organization.status === "Active"
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            <Power size={16} />

            {statusMutation.isPending
              ? "Updating..."
              : organization.status === "Active"
              ? "Deactivate"
              : "Activate"}
          </button>
        </div>
      </div>

      {/* Status */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Organization Status
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Current organization status
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              organization.status === "Active"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {organization.status}
          </span>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Employees
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {organization.employees}
              </p>
            </div>

            <Users className="text-blue-600" size={24} />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Industry
              </p>

              <p className="mt-2 text-lg font-semibold text-slate-900">
                {organization.industry}
              </p>
            </div>

            <Briefcase
              className="text-purple-600"
              size={24}
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Tenant
              </p>

              <p className="mt-2 text-lg font-semibold text-slate-900">
                {organization.tenant}
              </p>
            </div>

            <Building2
              className="text-orange-600"
              size={24}
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Location
              </p>

              <p className="mt-2 text-lg font-semibold text-slate-900">
                {organization.location}
              </p>
            </div>

            <MapPin
              className="text-emerald-600"
              size={24}
            />
          </div>
        </div>

      </div>

      {/* Organization Information */}
      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 p-5">
            <h2 className="font-semibold text-slate-900">
              Organization Information
            </h2>
          </div>

          <div className="space-y-5 p-5">

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Organization Name
              </p>

              <p className="mt-1 text-sm font-medium text-slate-900">
                {organization.name}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Tenant
              </p>

              <p className="mt-1 text-sm text-slate-700">
                {organization.tenant}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Tenant ID
              </p>

              <p className="mt-1 text-sm text-slate-700">
                {organization.tenantId}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Industry
              </p>

              <p className="mt-1 text-sm text-slate-700">
                {organization.industry}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Location
              </p>

              <p className="mt-1 text-sm text-slate-700">
                {organization.location}
              </p>
            </div>

          </div>
        </div>

        {/* Contact */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 p-5">
            <h2 className="font-semibold text-slate-900">
              Contact Information
            </h2>
          </div>

          <div className="space-y-5 p-5">

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-2">
                <Mail
                  size={18}
                  className="text-blue-600"
                />
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Email
                </p>

                <p className="text-sm font-medium text-slate-800">
                  {organization.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-50 p-2">
                <Phone
                  size={18}
                  className="text-emerald-600"
                />
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Phone
                </p>

                <p className="text-sm font-medium text-slate-800">
                  {organization.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-orange-50 p-2">
                <MapPin
                  size={18}
                  className="text-orange-600"
                />
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Location
                </p>

                <p className="text-sm font-medium text-slate-800">
                  {organization.location}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Dates */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 font-semibold text-slate-900">
          Record Information
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">

          <div>
            <p className="text-xs text-slate-400">
              Created At
            </p>

            <p className="mt-1 text-sm text-slate-700">
              {new Date(
                organization.createdAt
              ).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Last Updated
            </p>

            <p className="mt-1 text-sm text-slate-700">
              {organization.updatedAt
                ? new Date(
                    organization.updatedAt
                  ).toLocaleDateString()
                : "Not updated"}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default OrganizationDetails;