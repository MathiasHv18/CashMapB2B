// Empty state shown on Dashboard when there are no sales today.

import { IconShoppingCart, IconPackage } from "../ui/icons";

interface EmptyStateProps {
  onRegisterSale: () => void;
  onGoToCatalog: () => void;
}

export default function EmptyState({
  onRegisterSale,
  onGoToCatalog,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-5">
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <IconShoppingCart className="w-9 h-9 text-slate-600" />
      </div>

      <div className="text-center">
        <h3 className="text-white font-semibold text-lg">
          Aún no hay movimientos hoy
        </h3>
        <p className="text-slate-500 text-sm mt-1.5 max-w-xs mx-auto leading-relaxed">
          Registra tu primera venta o gasto para ver el resumen diario aquí.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onRegisterSale}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all active:scale-[0.97]"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
            boxShadow: "0 2px 12px rgba(109,40,217,0.4)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow =
              "0 4px 20px rgba(109,40,217,0.6)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow =
              "0 2px 12px rgba(109,40,217,0.4)")
          }
        >
          <IconShoppingCart className="w-4 h-4" />
          Registrar mi primera venta
        </button>

        <button
          onClick={onGoToCatalog}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-slate-300 text-sm font-semibold transition-all active:scale-[0.97]"
          style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.11)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
          }
        >
          <IconPackage className="w-4 h-4" />
          Agregar productos
        </button>
      </div>
    </div>
  );
}
