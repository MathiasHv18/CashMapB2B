// Gastos page: register an operating or merchandise expense.
// Two tabs: Operativo / Mercadería.
// Endpoint: POST /expenses

import { useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import Spinner from "../components/ui/Spinner";
import {
  IconReceipt,
  IconBanknote,
  IconFileText,
  IconCalendar,
  IconSmartphone,
  IconCreditCard,
} from "../components/ui/icons";
import { inputBase, inputFocused, inputBlurred } from "../lib/styles";
import type {
  AppPage,
  AppState,
  Expense,
  ExpenseType,
  PaymentMethod,
  ToastType,
} from "../types";

interface GastosPageProps {
  appState: AppState;
  userInitials: string;
  onNavigate: (page: AppPage) => void;
  onConfirmExpense: (expense: Omit<Expense, "id">) => void;
  showToast: (message: string, type?: ToastType) => void;
}

function fmt(n: number) {
  return n.toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const PAYMENT_OPTIONS: {
  method: PaymentMethod;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  { method: "efectivo", label: "Efectivo", Icon: IconBanknote },
  { method: "yape", label: "Yape/Plin", Icon: IconSmartphone },
  { method: "tarjeta", label: "Tarjeta", Icon: IconCreditCard },
];

export default function GastosPage({
  appState,
  userInitials,
  onNavigate,
  onConfirmExpense,
  showToast,
}: GastosPageProps) {
  const [activeTab, setActiveTab] = useState<ExpenseType>("operativo");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("efectivo");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setDescription("");
    setAmount("");
    setPaymentMethod("efectivo");
    setDate(new Date().toISOString().split("T")[0]);
    setNotes("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: POST /expenses
    setTimeout(() => {
      setLoading(false);
      onConfirmExpense({
        description,
        amount: parseFloat(amount),
        type: activeTab,
        paymentMethod,
        date: new Date(date).toISOString(),
        notes,
      });
      reset();
      showToast("Gasto registrado exitosamente", "success");
    }, 700);
  };

  // This month totals per type
  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthExpenses = appState.expenses.filter((e) =>
    e.date.startsWith(thisMonth),
  );
  const totalOperativo = monthExpenses
    .filter((e) => e.type === "operativo")
    .reduce((a, e) => a + e.amount, 0);
  const totalMercaderia = monthExpenses
    .filter((e) => e.type === "mercaderia")
    .reduce((a, e) => a + e.amount, 0);

  return (
    <AppLayout
      activePage="gastos"
      onNavigate={onNavigate}
      businessName={appState.business?.name ?? "Mi Negocio"}
      userInitials={userInitials}
      onRegisterSale={() => onNavigate("ventas")}
      onRegisterExpense={() => {}}
    >
      <div className="max-w-xl mx-auto">
        <h2 className="text-white font-semibold text-lg mb-5">
          Registrar Gasto
        </h2>

        {/* Tabs */}
        <div
          className="flex rounded-xl p-1 mb-6"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {(["operativo", "mercaderia"] as ExpenseType[]).map((tab) => {
            const total =
              tab === "operativo" ? totalOperativo : totalMercaderia;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all"
                style={{
                  background:
                    activeTab === tab ? "rgba(124,58,237,0.25)" : "transparent",
                  color:
                    activeTab === tab ? "#c4b5fd" : "rgba(148,163,184,0.6)",
                  border:
                    activeTab === tab
                      ? "1px solid rgba(139,92,246,0.35)"
                      : "1px solid transparent",
                }}
              >
                <IconReceipt className="w-4 h-4" />
                {tab === "operativo" ? "Operativo" : "Mercadería"}
                {total > 0 && (
                  <span className="text-xs opacity-70 ml-1">
                    S/ {fmt(total)}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation mini-card */}
        <div
          className="rounded-xl px-4 py-3 mb-6 text-slate-400 text-xs leading-relaxed"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {activeTab === "operativo" ? (
            <>
              <strong className="text-slate-300">Gasto Operativo:</strong>{" "}
              Gastos del día a día del negocio — servicios (agua, luz,
              internet), sueldos, alquiler, etc.
            </>
          ) : (
            <>
              <strong className="text-slate-300">Compra de Mercadería:</strong>{" "}
              Compras de productos para revender o insumos directamente
              relacionados con tu servicio.
            </>
          )}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-6 flex flex-col gap-4"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Description */}
          <div>
            <label className="block text-slate-300 text-xs font-medium mb-1.5 ml-1">
              Descripción del gasto
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                <IconFileText className="w-4 h-4" />
              </span>
              <input
                required
                type="text"
                placeholder={
                  activeTab === "operativo"
                    ? "Ej: Pago de alquiler"
                    : "Ej: Compra de harina"
                }
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
                style={inputBase}
                onFocus={(e) =>
                  Object.assign(e.currentTarget.style, inputFocused)
                }
                onBlur={(e) =>
                  Object.assign(e.currentTarget.style, inputBlurred)
                }
              />
            </div>
          </div>

          {/* Amount + Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 text-xs font-medium mb-1.5 ml-1">
                Monto (S/)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold pointer-events-none">
                  S/
                </span>
                <input
                  required
                  type="number"
                  min={0}
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-8 pr-3 py-3 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
                  style={inputBase}
                  onFocus={(e) =>
                    Object.assign(e.currentTarget.style, inputFocused)
                  }
                  onBlur={(e) =>
                    Object.assign(e.currentTarget.style, inputBlurred)
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-xs font-medium mb-1.5 ml-1">
                Fecha
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                  <IconCalendar className="w-4 h-4" />
                </span>
                <input
                  required
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 rounded-xl text-sm text-white outline-none transition-all"
                  style={{ ...inputBase, colorScheme: "dark" }}
                  onFocus={(e) =>
                    Object.assign(e.currentTarget.style, inputFocused)
                  }
                  onBlur={(e) =>
                    Object.assign(e.currentTarget.style, inputBlurred)
                  }
                />
              </div>
            </div>
          </div>

          {/* Payment method */}
          <div>
            <p className="text-slate-300 text-xs font-medium mb-2 ml-1">
              Método de pago
            </p>
            <div className="grid grid-cols-3 gap-2">
              {PAYMENT_OPTIONS.map(({ method, label, Icon }) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all"
                  style={{
                    background:
                      paymentMethod === method
                        ? "rgba(124,58,237,0.25)"
                        : "rgba(255,255,255,0.05)",
                    border:
                      paymentMethod === method
                        ? "1px solid rgba(139,92,246,0.4)"
                        : "1px solid rgba(255,255,255,0.08)",
                    color:
                      paymentMethod === method
                        ? "#c4b5fd"
                        : "rgba(148,163,184,0.6)",
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Notes (optional) */}
          <div>
            <label className="block text-slate-300 text-xs font-medium mb-1.5 ml-1">
              Notas{" "}
              <span className="text-slate-600 font-normal">(Opcional)</span>
            </label>
            <textarea
              rows={2}
              placeholder="Detalles adicionales..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all resize-none"
              style={inputBase}
              onFocus={(e) =>
                Object.assign(e.currentTarget.style, inputFocused)
              }
              onBlur={(e) => Object.assign(e.currentTarget.style, inputBlurred)}
            />
          </div>

          {/* CTA */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.97] disabled:opacity-70 mt-1"
            style={{
              background: "linear-gradient(135deg, #be185d, #9d174d)",
              boxShadow: "0 2px 12px rgba(190,24,93,0.4)",
            }}
            onMouseEnter={(e) =>
              !loading &&
              (e.currentTarget.style.boxShadow =
                "0 4px 20px rgba(190,24,93,0.6)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 2px 12px rgba(190,24,93,0.4)")
            }
          >
            {loading ? (
              <Spinner size="sm" />
            ) : (
              <IconReceipt className="w-4 h-4" />
            )}
            Registrar Gasto
          </button>
        </form>

        {/* Recent expenses list */}
        {appState.expenses.length > 0 && (
          <div className="mt-6">
            <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
              Gastos Recientes
            </h3>
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {appState.expenses.slice(0, 8).map((exp) => (
                <div
                  key={exp.id}
                  className="flex items-center gap-3 px-4 py-3.5"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div className="w-8 h-8 rounded-lg bg-rose-500/15 flex items-center justify-center text-rose-400 shrink-0">
                    <IconReceipt className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">
                      {exp.description}
                    </p>
                    <p className="text-slate-500 text-xs capitalize">
                      {exp.type} · {exp.paymentMethod}
                    </p>
                  </div>
                  <span className="text-rose-400 font-semibold text-sm shrink-0">
                    −S/ {fmt(exp.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
