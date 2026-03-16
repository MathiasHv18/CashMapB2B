// Shell layout: sidebar + topbar + scrollable main content area.

import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import type { AppPage } from "../../types";

interface AppLayoutProps {
  children: ReactNode;
  activePage: AppPage;
  onNavigate: (page: AppPage) => void;
  businessName: string;
  userInitials: string;
  onRegisterSale: () => void;
  onRegisterExpense: () => void;
}

export default function AppLayout({
  children,
  activePage,
  onNavigate,
  businessName,
  userInitials,
  onRegisterSale,
  onRegisterExpense,
}: AppLayoutProps) {
  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 10% 0%, rgba(109,40,217,0.1) 0%, transparent 60%), #080810",
      }}
    >
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        businessName={businessName}
        userInitials={userInitials}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          businessName={businessName}
          onRegisterSale={onRegisterSale}
          onRegisterExpense={onRegisterExpense}
        />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
