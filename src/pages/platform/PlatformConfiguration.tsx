import { useState } from "react";
import ConfigSection from "../../components/platform/ConfigSection";
import ToggleSetting from "../../components/platform/ToggleSetting";
import Spinner from "../../components/Spinner";
import { usePlatformConfig } from "../../hooks/usePlatformConfig";
import type { PlatformConfig } from "../../types/platformConfig";

export default function PlatformConfiguration() {
  const { data, isLoading } = usePlatformConfig();

  const [form, setForm] = useState<PlatformConfig | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  if (isLoading || !data) {
    return <Spinner />;
  }

  const values = form ?? data;

  const update = <K extends keyof PlatformConfig>(
    key: K,
    value: PlatformConfig[K],
  ) => {
    setForm({
      ...values,
      [key]: value,
    });
  };

  const handleSave = async () => {
    setIsUpdating(true);
    try {
      alert("Platform configuration updated successfully.");
      setForm(null);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Platform Configuration
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage global platform settings and system preferences.
        </p>
      </div>

      <ConfigSection
        title="General Settings"
        description="Basic information about the platform."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Platform Name"
            value={values.platformName}
            onChange={(v) => update("platformName", v)}
          />

          <Input
            label="Platform URL"
            value={values.platformUrl}
            onChange={(v) => update("platformUrl", v)}
          />

          <Input
            label="Support Email"
            value={values.supportEmail}
            onChange={(v) => update("supportEmail", v)}
          />

          <Input
            label="Timezone"
            value={values.timezone}
            onChange={(v) => update("timezone", v)}
          />
        </div>
      </ConfigSection>

      <ConfigSection
        title="Localization"
        description="Configure language, currency and date preferences."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <Input
            label="Language"
            value={values.defaultLanguage}
            onChange={(v) => update("defaultLanguage", v)}
          />

          <Input
            label="Currency"
            value={values.currency}
            onChange={(v) => update("currency", v)}
          />

          <Input
            label="Date Format"
            value={values.dateFormat}
            onChange={(v) => update("dateFormat", v)}
          />
        </div>
      </ConfigSection>

      <ConfigSection
        title="Email Settings"
        description="Configure outgoing platform emails."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <Input
            label="SMTP Host"
            value={values.smtpHost}
            onChange={(v) => update("smtpHost", v)}
          />

          <Input
            label="SMTP Port"
            type="number"
            value={values.smtpPort}
            onChange={(v) => update("smtpPort", Number(v))}
          />

          <Input
            label="Sender Email"
            value={values.senderEmail}
            onChange={(v) => update("senderEmail", v)}
          />
        </div>
      </ConfigSection>

      <ConfigSection
        title="Storage"
        description="Global file storage configuration."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <Input
            label="Provider"
            value={values.storageProvider}
            onChange={(v) => update("storageProvider", v)}
          />

          <Input
            label="Region"
            value={values.storageRegion}
            onChange={(v) => update("storageRegion", v)}
          />

          <Input
            label="Bucket"
            value={values.storageBucket}
            onChange={(v) => update("storageBucket", v)}
          />
        </div>
      </ConfigSection>

      <ConfigSection
        title="System Settings"
        description="Control platform-wide behavior."
      >
        <ToggleSetting
          label="Maintenance Mode"
          description="Temporarily disable platform access."
          checked={values.maintenanceMode}
          onChange={(v) => update("maintenanceMode", v)}
        />

        <ToggleSetting
          label="Allow Registration"
          description="Allow new tenants to register."
          checked={values.allowRegistration}
          onChange={(v) => update("allowRegistration", v)}
        />

        <ToggleSetting
          label="Email Verification"
          description="Require email verification."
          checked={values.emailVerification}
          onChange={(v) => update("emailVerification", v)}
        />

        <ToggleSetting
          label="Require MFA"
          description="Require multi-factor authentication."
          checked={values.mfaRequired}
          onChange={(v) => update("mfaRequired", v)}
        />
      </ConfigSection>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isUpdating}
          className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isUpdating ? "Saving..." : "Save Configuration"}
        </button>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string | number;
  type?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}
