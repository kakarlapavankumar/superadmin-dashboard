import { Bell, Search } from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:ml-64 lg:px-8">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Super Admin Portal
        </h2>

        <p className="hidden text-xs text-slate-500 sm:block">
          One Enterprise Cloud Platform
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <button className="hidden rounded-lg border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-50 sm:block">
          <Search size={18} />
        </button>

        {/* Notification */}
        <button className="relative rounded-lg border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-50">
          <Bell size={18} />

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>

        <div className="h-7 w-px bg-slate-200" />

        {/* User */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
            PA
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">Super Admin</p>

            <p className="text-xs text-slate-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
