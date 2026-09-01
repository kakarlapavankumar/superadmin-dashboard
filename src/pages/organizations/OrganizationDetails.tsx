import { Building2, Edit, Mail, MapPin, Phone, Users } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import BackToDashboard from "../../components/BackToDashboard";
import StatusBadge from "../../components/StatusBadge";

import {
  useOrganization,
  useToggleOrganizationStatus,
} from "../../hooks/useOrganizations";

export default function OrganizationDetails() {
  const { id } = useParams<{
    id: string;
  }>();

  const navigate = useNavigate();

  const { data: organization, isLoading } = useOrganization(id);

  const statusMutation = useToggleOrganizationStatus();

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-slate-500">
        Loading organization details...
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="p-6">
        <BackToDashboard />

        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
          Organization not found.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl">
        <BackToDashboard />

        <div className="mt-5 mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-xl font-bold text-blue-700">
              {organization.name.charAt(0)}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {organization.name}
              </h1>

              <p className="text-sm text-slate-500">
                {organization.code} · Tenant ID {organization.tenant}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => navigate(`/organizations/${organization.id}/edit`)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Edit size={17} />
              Edit
            </button>

            <button
              type="button"
              disabled={statusMutation.isPending}
              onClick={() => statusMutation.mutate(organization.id)}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold ${
                organization.status === "Active"
                  ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              }`}
            >
              {organization.status === "Active" ? "Deactivate" : "Activate"}
            </button>
          </div>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard
            label="Employees"
            value={organization.employees.toLocaleString()}
            icon={<Users size={20} />}
          />

          <InfoCard
            label="Industry"
            value={organization.industry}
            icon={<Building2 size={20} />}
          />

          <InfoCard
            label="Location"
            value={organization.location}
            icon={<MapPin size={20} />}
          />

          <InfoCard
            label="Status"
            value={organization.status}
            icon={<Building2 size={20} />}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Section title="Organization Information">
              <div className="grid gap-6 sm:grid-cols-2">
                <Detail label="Organization ID" value={organization.id} />

                <Detail label="Organization Code" value={organization.code} />

                <Detail label="Tenant ID" value={organization.tenant} />

                <Detail label="Tenant" value={organization.tenant} />

                <Detail label="Industry" value={organization.industry} />

                <Detail label="Location" value={organization.location} />

                <Detail
                  label="Employees"
                  value={organization.employees.toLocaleString()}
                />

                <Detail label="Status" value={organization.status} />
              </div>
            </Section>

            <Section title="Description">
              <p className="text-sm leading-7 text-slate-600">
                No description available.
              </p>
            </Section>
          </div>

          <div>
            <Section title="Contact Information">
              <div className="space-y-5">
                <Contact
                  icon={<Mail size={18} />}
                  label="Email"
                  value={organization.email}
                />

                <Contact
                  icon={<Phone size={18} />}
                  label="Phone"
                  value={organization.phone}
                />

                <Contact
                  icon={<MapPin size={18} />}
                  label="Location"
                  value={organization.location}
                />
              </div>
            </Section>

            <Section title="System Information">
              <div className="space-y-4">
                <Detail label="Created At" value={organization.createdAt} />

                <Detail label="Last Updated" value={organization.createdAt} />
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm text-slate-500">{label}</span>

        <div className="rounded-lg bg-blue-50 p-2 text-blue-600">{icon}</div>
      </div>

      <div className="font-bold text-slate-900">
        {label === "Status" ? (
          <StatusBadge status={value as "Active" | "Inactive"} />
        ) : (
          value
        )}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-bold text-slate-900">{title}</h2>

      {children}
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-800">
        {value || "—"}
      </p>
    </div>
  );
}

function Contact({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="rounded-lg bg-blue-50 p-2 text-blue-600">{icon}</div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-all text-sm font-semibold text-slate-800">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}
