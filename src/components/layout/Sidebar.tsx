import {
  BarChart3,
  Building2,
  Building,
  Users,
  ShieldCheck,
  KeyRound,
  Database,
  Settings,
  Boxes,
  CreditCard,
  Lock,
  FileText,
  Bell,
  Activity,
  Plug,
  Receipt,
  FileBarChart,
  LifeBuoy,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navigation = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        path: "/",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        label: "Tenant Management",
        path: "/tenants",
        icon: Building2,
      },
      {
        label: "Organization Management",
        path: "/organizations",
        icon: Building,
      },
      {
        label: "User Management",
        path: "/users",
        icon: Users,
      },
      {
        label: "Role Management",
        path: "/roles",
        icon: ShieldCheck,
      },
      {
        label: "Permission Management",
        path: "/permissions",
        icon: KeyRound,
      },
      {
        label: "Data Permissions",
        path: "/data-permissions",
        icon: Database,
      },
    ],
  },
  {
    title: "Platform",
    items: [
      {
        label: "Platform Configuration",
        path: "/configuration",
        icon: Settings,
      },
      {
        label: "Feature Management",
        path: "/features",
        icon: Boxes,
      },
      {
        label: "Subscription & License",
        path: "/subscriptions",
        icon: CreditCard,
      },
      {
        label: "Security",
        path: "/security",
        icon: Lock,
      },
      {
        label: "Audit Logs",
        path: "/audit-logs",
        icon: FileText,
      },
      {
        label: "Notifications",
        path: "/notifications",
        icon: Bell,
      },
      {
        label: "Monitoring",
        path: "/monitoring",
        icon: Activity,
      },
    ],
  },
  {
    title: "More",
    items: [
      {
        label: "API Management",
        path: "/api-management",
        icon: Plug,
      },
      {
        label: "Billing",
        path: "/billing",
        icon: Receipt,
      },
      {
        label: "Reports & Analytics",
        path: "/reports",
        icon: FileBarChart,
      },
      {
        label: "Support",
        path: "/support",
        icon: LifeBuoy,
      },
    ],
  },
];

function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <button
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
          onClick={onClose}
          aria-label="Close navigation"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72
          transform bg-slate-950 text-white
          transition-transform duration-300
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-slate-800 px-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold">
                OC
              </div>

              <div>
                <p className="text-sm font-bold">OneCloud</p>

                <p className="text-xs text-slate-400">Super Admin Portal</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 lg:hidden"
              aria-label="Close navigation"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-5">
            {navigation.map((section) => (
              <div key={section.title} className="mb-6">
                <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {section.title}
                </p>

                <nav className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;

                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={onClose}
                        end={item.path === "/"}
                        className={({ isActive }) =>
                          `
                          flex items-center gap-3 rounded-lg px-3 py-2.5
                          text-sm font-medium transition
                          ${
                            isActive
                              ? "bg-blue-600 text-white shadow-lg shadow-blue-950/30"
                              : "text-slate-400 hover:bg-slate-900 hover:text-white"
                          }
                          `
                        }
                      >
                        <Icon size={18} />
                        <span>{item.label}</span>
                      </NavLink>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 p-4">
            <div className="rounded-xl bg-slate-900 p-4">
              <p className="text-xs font-semibold text-white">
                Platform Status
              </p>

              <div className="mt-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />

                <span className="text-xs text-slate-400">
                  All systems operational
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
