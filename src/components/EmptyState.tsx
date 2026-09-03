import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export default function EmptyState({
  title = "Nothing here",
  message = "No data found.",
}: EmptyStateProps) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center px-6 py-10 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
        <Inbox className="h-6 w-6 text-slate-400" />
      </div>

      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>

      <p className="mt-1 max-w-sm text-sm text-slate-500">{message}</p>
    </div>
  );
}
