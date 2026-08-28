import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-5">
      <h1 className="text-xl font-bold mb-8">OneCloud Admin</h1>

      <nav className="space-y-2">
        <Link to="/" className="block px-4 py-3 rounded hover:bg-slate-700">
          Dashboard
        </Link>

        <Link
          to="/tenants"
          className="block px-4 py-3 rounded hover:bg-slate-700"
        >
          Tenants
        </Link>
      </nav>
    </aside>
  );
}
