// Fixed sidebar navigation for the main app.

import Logo from "../ui/Logo";
import {
  IconGrid,
  IconShoppingCart,
  IconReceipt,
  IconPackage,
  IconChevronRight,
} from "../ui/icons";
import type { AppPage } from "../../types";

interface SidebarProps {
  activePage: AppPage;
  onNavigate: (page: AppPage) => void;
  businessName: string;
  userInitials: string;
}

const NAV: {
  page: AppPage;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  { page: "inicio", label: "Inicio", Icon: IconGrid },
  { page: "ventas", label: "Ventas", Icon: IconShoppingCart },
  { page: "gastos", label: "Gastos", Icon: IconReceipt },
  { page: "catalogo", label: "Catálogo", Icon: IconPackage },
];

export default function Sidebar({
  activePage,
  onNavigate,
  businessName,
  userInitials,
}: SidebarProps) {
  return (
    <aside
      className="flex flex-col h-full w-52 shrink-0 py-6 px-3"
      style={{
        background: "rgba(8,8,16,0.9)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo */}
      <div className="px-2 mb-6">
        <Logo />
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-0.5">
        {NAV.map(({ page, label, Icon }) => {
          const active = activePage === page;
          return (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-medium transition-all text-left"
              style={{
                background: active ? "rgba(124,58,237,0.25)" : "transparent",
                color: active ? "#c4b5fd" : "rgba(148,163,184,0.7)",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "rgba(148,163,184,0.7)";
                }
              }}
            >
              <Icon className="w-4.5 h-4.5" />
              {label}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
          {userInitials}
        </div>
        <span className="text-slate-300 text-xs font-medium flex-1 truncate">
          {businessName}
        </span>
        <IconChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
      </div>
    </aside>
  );
}
