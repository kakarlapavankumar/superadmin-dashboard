import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Edit,
  Mail,
  MapPin,
  Phone,
  Users,
  Calendar,
  Hash,
  Briefcase,
} from "lucide-react";

import { useOrganization } from "../../hooks/useOrganizations";

export default function OrganizationDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const organizationQuery = useOrganization(id);

  const organization = organizationQuery.data;

  if (organizationQuery.isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

              <p className="mt-4 text-sm text-slate-500">
                Loading organization...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (organizationQuery.isError) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-6xl">
          <button
            type="button"
            onClick={() => navigate("/organizations")}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={18} />
            Back to Organizations
          </button>

          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <Building2 size={24} className="text-red-600" />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              Failed to load organization
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Something went wrong while loading the organization details.
            </p>

            <button
              type="button"
              onClick={() => organizationQuery.refetch()}
              className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-6xl">
          <button
            type="button"
            onClick={() => navigate("/organizations")}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={18} />
            Back to Organizations
          </button>

          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <Building2 size={42} className="mx-auto text-slate-300" />

            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              Organization not found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              The organization you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    navigate(`/organizations/${organization.id}/edit`);
  };

  const formatDate = (date: string) => {
    if (!date) {
      return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              type="button"
              onClick={() => navigate("/organizations")}
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              <ArrowLeft size={18} />
              Back to Organizations
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <Building2 size={24} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {organization.name}
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Organization details and information
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleEdit}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Edit size={17} />
            Edit Organization
          </button>
        </div>

        {/* Summary Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Employees */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Employees</p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {organization.employees.toLocaleString()}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <Users size={20} className="text-blue-600" />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Status</p>

                <div className="mt-2">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                      organization.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        organization.status === "Active"
                          ? "bg-emerald-500"
                          : "bg-red-500"
                      }`}
                    />

                    {organization.status}
                  </span>
                </div>
              </div>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  organization.status === "Active"
                    ? "bg-emerald-100"
                    : "bg-red-100"
                }`}
              >
                <Briefcase
                  size={20}
                  className={
                    organization.status === "Active"
                      ? "text-emerald-600"
                      : "text-red-600"
                  }
                />
              </div>
            </div>
          </div>

          {/* Industry */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-sm text-slate-500">Industry</p>

                <p className="mt-2 truncate text-lg font-semibold text-slate-900">
                  {organization.industry || "-"}
                </p>
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100">
                <Briefcase size={20} className="text-purple-600" />
              </div>
            </div>
          </div>

          {/* Tenant */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-sm text-slate-500">Tenant</p>

                <p className="mt-2 truncate text-lg font-semibold text-slate-900">
                  {organization.tenantName || "-"}
                </p>
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100">
                <Building2 size={20} className="text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Organization Information */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-5">
                <h2 className="text-lg font-semibold text-slate-900">
                  Organization Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  General information about this organization.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                {/* Name */}
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                    <Building2 size={19} className="text-slate-600" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Organization Name
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {organization.name}
                    </p>
                  </div>
                </div>

                {/* Code */}
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                    <Hash size={19} className="text-slate-600" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Organization Code
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {organization.code}
                    </p>
                  </div>
                </div>

                {/* Tenant */}
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                    <Building2 size={19} className="text-slate-600" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Tenant
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {organization.tenantName || "-"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Tenant ID: {organization.tenantId}
                    </p>
                  </div>
                </div>

                {/* Industry */}
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                    <Briefcase size={19} className="text-slate-600" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Industry
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {organization.industry || "-"}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                    <MapPin size={19} className="text-slate-600" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Location
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {organization.location || "-"}
                    </p>
                  </div>
                </div>

                {/* Employees */}
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                    <Users size={19} className="text-slate-600" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Employees
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {organization.employees.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="border-t border-slate-200 px-6 py-5">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Description
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {organization.description || "No description available."}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-5">
                <h2 className="text-lg font-semibold text-slate-900">
                  Contact Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Organization contact details.
                </p>
              </div>

              <div className="space-y-5 p-6">
                {/* Email */}
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                    <Mail size={19} className="text-blue-600" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Email
                    </p>

                    <p className="mt-1 break-all text-sm font-medium text-slate-900">
                      {organization.email || "-"}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                    <Phone size={19} className="text-emerald-600" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Phone
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {organization.phone || "-"}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100">
                    <MapPin size={19} className="text-purple-600" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Location
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {organization.location || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-5">
                <h2 className="text-lg font-semibold text-slate-900">
                  Timeline
                </h2>
              </div>

              <div className="space-y-5 p-6">
                {/* Created */}
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                    <Calendar size={19} className="text-slate-600" />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Created
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {formatDate(organization.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Updated */}
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                    <Calendar size={19} className="text-slate-600" />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Last Updated
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {formatDate(organization.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <button
            type="button"
            onClick={() => navigate("/organizations")}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft size={17} />
            Back
          </button>

          <button
            type="button"
            onClick={handleEdit}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Edit size={17} />
            Edit Organization
          </button>
        </div>
      </div>
    </div>
  );
}
