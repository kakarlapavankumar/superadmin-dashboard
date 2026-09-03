import type { ReactNode } from "react";

interface ConfigSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function ConfigSection({
  title,
  description,
  children,
}: ConfigSectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 border-b border-slate-100 pb-4">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>

        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>

      {children}
    </section>
  );
}
