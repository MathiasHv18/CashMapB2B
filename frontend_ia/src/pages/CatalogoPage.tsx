// Catálogo page: list of products and services with search + add/delete.

import { useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import NuevoItemModal from "../components/catalogo/NuevoItemModal";
import {
  IconPlus,
  IconSearch,
  IconTag,
  IconMoreHorizontal,
} from "../components/ui/icons";
import type { AppPage, AppState, CatalogItem, ToastType } from "../types";

interface CatalogoPageProps {
  appState: AppState;
  userInitials: string;
  onNavigate: (page: AppPage) => void;
  onAddItem: (item: Omit<CatalogItem, "id">) => void;
  onDeleteItem: (id: string) => void;
  showToast: (message: string, type?: ToastType) => void;
}

function fmt(n: number) {
  return n.toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function CatalogoPage({
  appState,
  userInitials,
  onNavigate,
  onAddItem,
  onDeleteItem,
  showToast,
}: CatalogoPageProps) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const filtered = appState.catalog.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSave = (item: Omit<CatalogItem, "id">) => {
    onAddItem(item);
    setShowModal(false);
    showToast(`"${item.name}" agregado al catálogo`, "success");
  };

  const handleDelete = (item: CatalogItem) => {
    onDeleteItem(item.id);
    setOpenMenuId(null);
    showToast(`"${item.name}" eliminado del catálogo`, "info");
  };

  return (
    <>
      <AppLayout
        activePage="catalogo"
        onNavigate={onNavigate}
        businessName={appState.business?.name ?? "Mi Negocio"}
        userInitials={userInitials}
        onRegisterSale={() => onNavigate("ventas")}
        onRegisterExpense={() => onNavigate("gastos")}
      >
        {/* Header row */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-white font-semibold text-lg">Catálogo</h2>
            <p className="text-slate-500 text-xs mt-0.5">
              {appState.catalog.length} ítem
              {appState.catalog.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-all active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
              boxShadow: "0 2px 12px rgba(109,40,217,0.35)",
            }}
          >
            <IconPlus className="w-4 h-4" />
            Nuevo Ítem
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
            <IconSearch className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Buscar por nombre o categoría..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-sm pl-10 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-600 outline-none"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
            }}
          />
        </div>

        {/* Table */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Table header */}
          <div
            className="grid gap-4 px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider"
            style={{
              gridTemplateColumns: "1fr 120px 120px 80px 40px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <span>Nombre</span>
            <span>Categoría</span>
            <span>Precio</span>
            <span>Tipo</span>
            <span />
          </div>

          {/* Rows */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16">
              <IconTag className="w-8 h-8 text-slate-700" />
              <p className="text-slate-500 text-sm">
                {search
                  ? "Sin resultados para tu búsqueda."
                  : "No hay ítems en el catálogo aún."}
              </p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="grid gap-4 px-5 py-4 items-center transition-all relative"
                style={{
                  gridTemplateColumns: "1fr 120px 120px 80px 40px",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.025)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <span className="text-white text-sm font-medium truncate">
                  {item.name}
                </span>
                <span className="text-slate-400 text-sm">
                  {item.category || "—"}
                </span>
                <span className="text-emerald-400 text-sm font-semibold">
                  S/ {fmt(item.price)}
                </span>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-md w-fit capitalize"
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
                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === item.id ? null : item.id)
                    }
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-white transition-colors"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    <IconMoreHorizontal className="w-4 h-4" />
                  </button>
                  {openMenuId === item.id && (
                    <div
                      className="absolute right-0 top-8 z-10 rounded-xl overflow-hidden py-1 w-36"
                      style={{
                        background: "#1a1135",
                        border: "1px solid rgba(255,255,255,0.12)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                      }}
                    >
                      <button
                        onClick={() => handleDelete(item)}
                        className="w-full text-left px-4 py-2 text-rose-400 text-xs font-medium hover:bg-rose-500/10 transition-colors"
                      >
                        Eliminar ítem
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </AppLayout>

      {showModal && (
        <NuevoItemModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}

      {/* Close any open menu when clicking away */}
      {openMenuId && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setOpenMenuId(null)}
        />
      )}
    </>
  );
}
