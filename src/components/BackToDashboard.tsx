import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackToDashboardProps {
  className?: string;
}

export default function BackToDashboard({
  className = "",
}: BackToDashboardProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/")}
      className={`inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 ${className}`}
    >
      <ArrowLeft size={17} />
      Back to Dashboard
    </button>
  );
}
