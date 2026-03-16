// Dashboard page: metrics overview + recent movements.
// Replaces the "Inicio" sub-page in AppLayout.

import AppLayout from "../components/layout/AppLayout";
import SummaryCard from "../components/dashboard/SummaryCard";
import EmptyState from "../components/dashboard/EmptyState";
import {
  IconWallet,
  IconSmartphone,
  IconTrendingUp,
  IconTrendingDown,
} from "../components/ui/icons";
import type { AppPage, AppState, ToastType } from "../types";

interface DashboardPageProps {
  appState: AppState;
  userInitials: string;
  onNavigate: (page: AppPage) => void;
  showToast?: (message: string, type?: ToastType) => void;
}

function fmt(n: number) {
  return (
    "S/ " +
    n.toLocaleString("es-PE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

export default function DashboardPage({
  appState,
  userInitials,
  onNavigate,
}: DashboardPageProps) {
  const today = todayStr();
  const todaySales = appState.sales.filter((s) => s.date.startsWith(today));
  const todayExpenses = appState.expenses.filter((e) =>
    e.date.startsWith(today),
  );

  const totalIngresos = todaySales.reduce((acc, s) => acc + s.total, 0);
  const totalGastos = todayExpenses.reduce((acc, e) => acc + e.amount, 0);
  const utilidad = totalIngresos - totalGastos;

  const cashBalance = appState.initialBalance?.cash ?? 0;
  const digitalBalance = appState.initialBalance?.digital ?? 0;

  const handleRegisterSale = () => onNavigate("ventas");
  const handleRegisterExpense = () => onNavigate("gastos");

  return (
    <AppLayout
      activePage="inicio"
      onNavigate={onNavigate}
      businessName={appState.business?.name ?? "Mi Negocio"}
      userInitials={userInitials}
      onRegisterSale={handleRegisterSale}
      onRegisterExpense={handleRegisterExpense}
    >
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <SummaryCard
          label="Balance Físico"
          sublabel="Efectivo en caja"
          value={fmt(cashBalance + totalIngresos * 0.6 - totalGastos * 0.5)}
          icon={<IconWallet className="w-4 h-4 text-emerald-300" />}
          iconBg="rgba(52,211,153,0.15)"
          trend="neutral"
        />
        <SummaryCard
          label="Balance Digital"
          sublabel="Yape, Plin, Cuentas"
          value={fmt(digitalBalance + totalIngresos * 0.4 - totalGastos * 0.5)}
          icon={<IconSmartphone className="w-4 h-4 text-violet-300" />}
          iconBg="rgba(139,92,246,0.15)"
          trend="neutral"
        />
        <SummaryCard
          label="Ingresos Hoy"
          sublabel="Total en ventas"
          value={fmt(totalIngresos)}
          icon={<IconTrendingUp className="w-4 h-4 text-emerald-300" />}
          iconBg="rgba(52,211,153,0.15)"
          trend={totalIngresos > 0 ? "up" : "neutral"}
        />
        <SummaryCard
          label="Utilidad Hoy"
          sublabel="Ingresos − Gastos"
          value={fmt(utilidad)}
          icon={<IconTrendingDown className="w-4 h-4 text-violet-300" />}
          iconBg="rgba(139,92,246,0.15)"
          trend={utilidad > 0 ? "up" : utilidad < 0 ? "down" : "neutral"}
        />
      </div>

      {/* Recent movements */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          className="px-5 py-4 flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <h2 className="text-white font-semibold text-sm">
            Movimientos de Hoy
          </h2>
          {todaySales.length + todayExpenses.length > 0 && (
            <span className="text-slate-500 text-xs">
              {todaySales.length + todayExpenses.length} movimientos
            </span>
          )}
        </div>

        {todaySales.length + todayExpenses.length === 0 ? (
          <EmptyState
            onRegisterSale={handleRegisterSale}
            onGoToCatalog={() => onNavigate("catalogo")}
          />
        ) : (
          <div
            className="divide-y"
            style={{ borderColor: "rgba(255,255,255,0.05)" }}
          >
            {todaySales.map((sale) => (
              <div
                key={sale.id}
                className="flex items-center gap-3 px-5 py-3.5"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400 text-xs font-bold shrink-0">
                  V
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    Venta #{sale.id.slice(-4).toUpperCase()}
                  </p>
                  <p className="text-slate-500 text-xs">
                    {sale.items.length} artículo
                    {sale.items.length !== 1 ? "s" : ""} · {sale.paymentMethod}
                  </p>
                </div>
                <span className="text-emerald-400 font-semibold text-sm">
                  +{fmt(sale.total)}
                </span>
              </div>
            ))}
            {todayExpenses.map((exp) => (
              <div key={exp.id} className="flex items-center gap-3 px-5 py-3.5">
                <div className="w-8 h-8 rounded-lg bg-rose-500/15 flex items-center justify-center text-rose-400 text-xs font-bold shrink-0">
                  G
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {exp.description}
                  </p>
                  <p className="text-slate-500 text-xs capitalize">
                    {exp.type}
                  </p>
                </div>
                <span className="text-rose-400 font-semibold text-sm">
                  −{fmt(exp.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
