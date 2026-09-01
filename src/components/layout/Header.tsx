import { Bell, Menu, Search, ChevronDown } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>

        <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
          <Search size={17} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            className="w-48 bg-transparent text-sm outline-none placeholder:text-slate-400 lg:w-72"
          />

          <kbd className="hidden rounded border border-slate-200 bg-white px-2 py-0.5 text-xs text-slate-400 lg:block">
            Ctrl K
          </kbd>
        </div>

        <div className="md:hidden">
          <p className="text-sm font-semibold text-slate-900">Super Admin</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100">
          <Bell size={20} />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="hidden h-6 w-px bg-slate-200 sm:block" />

        <button className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-slate-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
            PK
          </div>

          <div className="hidden text-left md:block">
            <p className="text-sm font-semibold text-slate-800">Super Admin</p>

            <p className="text-xs text-slate-500">Administrator</p>
          </div>

          <ChevronDown size={16} className="hidden text-slate-400 md:block" />
        </button>
      </div>
    </header>
  );
}

export default Header;
