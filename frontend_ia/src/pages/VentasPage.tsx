// Ventas POS page: product grid (left) + cart panel (right).
// Endpoint: POST /sales

import { useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import Spinner from "../components/ui/Spinner";
import {
  IconSearch,
  IconShoppingCart,
  IconPlus,
  IconX,
  IconCreditCard,
  IconBanknote,
  IconSmartphone,
  IconCheck,
} from "../components/ui/icons";
import type {
  AppPage,
  AppState,
  CatalogItem,
  Sale,
  SaleItem,
  PaymentMethod,
  ToastType,
} from "../types";

interface VentasPageProps {
  appState: AppState;
  userInitials: string;
  onNavigate: (page: AppPage) => void;
  onConfirmSale: (sale: Omit<Sale, "id">) => void;
  showToast: (message: string, type?: ToastType) => void;
}

type CartEntry = { item: CatalogItem; qty: number };

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

export default function VentasPage({
  appState,
  userInitials,
  onNavigate,
  onConfirmSale,
  showToast,
}: VentasPageProps) {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("efectivo");
  const [loading, setLoading] = useState(false);

  const filtered = appState.catalog.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const addToCart = (item: CatalogItem) => {
    setCart((prev) => {
      const existing = prev.find((e) => e.item.id === item.id);
      if (existing)
        return prev.map((e) =>
          e.item.id === item.id ? { ...e, qty: e.qty + 1 } : e,
        );
      return [...prev, { item, qty: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((e) => e.item.id !== itemId));
  };

  const updateQty = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((e) => (e.item.id === itemId ? { ...e, qty: e.qty + delta } : e))
        .filter((e) => e.qty > 0),
    );
  };

  const total = cart.reduce((acc, e) => acc + e.item.price * e.qty, 0);

  const handleConfirm = () => {
    if (cart.length === 0) return;
    setLoading(true);
    const items: SaleItem[] = cart.map((e) => ({
      catalogItemId: e.item.id,
      name: e.item.name,
      price: e.item.price,
      qty: e.qty,
    }));
    // TODO: POST /sales
    setTimeout(() => {
      setLoading(false);
      onConfirmSale({
        items,
        total,
        paymentMethod,
        date: new Date().toISOString(),
      });
      setCart([]);
      showToast("Venta registrada exitosamente ✓", "success");
    }, 800);
  };

  return (
    <AppLayout
      activePage="ventas"
      onNavigate={onNavigate}
      businessName={appState.business?.name ?? "Mi Negocio"}
      userInitials={userInitials}
      onRegisterSale={() => {}}
      onRegisterExpense={() => onNavigate("gastos")}
    >
      <div className="flex gap-5 h-full">
        {/* LEFT — Product grid */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold text-base">Nueva Venta</h2>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
              <IconSearch className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Buscar producto o servicio..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-600 outline-none"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            />
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3">
              <IconSearch className="w-8 h-8 text-slate-700" />
              <p className="text-slate-500 text-sm">
                {search
                  ? "Sin resultados."
                  : "El catálogo está vacío. Agrega ítems primero."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-auto pb-4">
              {filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={() => addToCart(item)}
                  className="text-left rounded-xl p-4 flex flex-col gap-2 transition-all active:scale-[0.97]"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.border =
                      "1px solid rgba(124,58,237,0.4)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.border =
                      "1px solid rgba(255,255,255,0.07)")
                  }
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-white text-sm font-medium leading-tight line-clamp-2">
                      {item.name}
                    </span>
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "rgba(124,58,237,0.2)" }}
                    >
                      <IconPlus className="w-3.5 h-3.5 text-violet-300" />
                    </div>
                  </div>
                  <span className="text-emerald-400 font-semibold text-sm">
                    S/ {fmt(item.price)}
                  </span>
                  <span
                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md capitalize w-fit"
                    style={{
                      background:
                        item.type === "producto"
                          ? "rgba(52,211,153,0.12)"
                          : "rgba(139,92,246,0.15)",
                      color: item.type === "producto" ? "#34d399" : "#a78bfa",
                    }}
                  >
                    {item.type}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — Cart panel */}
        <div
          className="w-72 shrink-0 rounded-2xl flex flex-col"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Cart header */}
          <div
            className="px-4 py-4 flex items-center gap-2"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            <IconShoppingCart className="w-4 h-4 text-violet-400" />
            <span className="text-white font-semibold text-sm flex-1">
              Carrito
            </span>
            {cart.length > 0 && (
              <span className="text-xs text-slate-400">
                {cart.length} ítem{cart.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto px-3 py-2">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-10">
                <IconShoppingCart className="w-9 h-9 text-slate-700" />
                <p className="text-slate-600 text-xs text-center">
                  Agrega productos del catálogo
                </p>
              </div>
            ) : (
              cart.map((entry) => (
                <div
                  key={entry.item.id}
                  className="flex items-center gap-2 py-2.5 px-1"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-medium truncate">
                      {entry.item.name}
                    </p>
                    <p className="text-slate-500 text-[11px]">
                      S/ {fmt(entry.item.price)} c/u
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQty(entry.item.id, -1)}
                      className="w-6 h-6 rounded-md flex items-center justify-center text-slate-400 hover:text-white text-sm font-bold transition-colors"
                      style={{ background: "rgba(255,255,255,0.08)" }}
                    >
                      −
                    </button>
                    <span className="text-white text-xs font-semibold w-4 text-center">
                      {entry.qty}
                    </span>
                    <button
                      onClick={() => updateQty(entry.item.id, 1)}
                      className="w-6 h-6 rounded-md flex items-center justify-center text-slate-400 hover:text-white text-sm font-bold transition-colors"
                      style={{ background: "rgba(255,255,255,0.08)" }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(entry.item.id)}
                      className="w-5 h-5 rounded-md flex items-center justify-center text-slate-600 hover:text-rose-400 transition-colors ml-1"
                    >
                      <IconX className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Payment + total */}
          {cart.length > 0 && (
            <div
              className="px-4 py-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              {/* Payment method */}
              <p className="text-slate-400 text-xs font-medium mb-2">
                Método de pago
              </p>
              <div className="grid grid-cols-3 gap-1.5 mb-4">
                {PAYMENT_OPTIONS.map(({ method, label, Icon }) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className="flex flex-col items-center gap-1 py-2 rounded-xl text-[10px] font-semibold transition-all"
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
                          : "rgba(148,163,184,0.7)",
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                ))}
              </div>

              {/* Total */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-400 text-sm">Total</span>
                <span className="text-white font-bold text-lg">
                  S/ {fmt(total)}
                </span>
              </div>

              {/* Confirm */}
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="w-full py-3 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.97] disabled:opacity-70"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                  boxShadow: "0 2px 12px rgba(109,40,217,0.4)",
                }}
              >
                {loading ? (
                  <Spinner size="sm" />
                ) : (
                  <IconCheck className="w-4 h-4" />
                )}
                Confirmar Venta
              </button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
