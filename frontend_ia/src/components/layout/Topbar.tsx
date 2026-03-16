// Top bar with business name, current date and quick-action CTA buttons.

import { IconShoppingCart, IconReceipt } from "../ui/icons";

interface TopbarProps {
  businessName: string;
  onRegisterSale: () => void;
  onRegisterExpense: () => void;
}

function todayLabel(): string {
  return new Date().toLocaleDateString("es-PE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Topbar({
  businessName,
  onRegisterSale,
  onRegisterExpense,
}: TopbarProps) {
  return (
    <header
      className="flex items-center gap-4 px-6 py-4 shrink-0"
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(8,8,16,0.6)",
      }}
    >
      {/* Left: business name + date */}
      <div className="flex-1 min-w-0">
        <h1 className="text-white font-semibold text-sm truncate">
          {businessName}
        </h1>
        <p className="text-slate-500 text-xs capitalize">{todayLabel()}</p>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onRegisterSale}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-semibold transition-all active:scale-[0.97]"
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
          <IconShoppingCart className="w-3.5 h-3.5" />
          Registrar Venta
        </button>

        <button
          onClick={onRegisterExpense}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-rose-300 text-xs font-semibold transition-all active:scale-[0.97]"
          style={{
            background: "rgba(244,63,94,0.1)",
            border: "1px solid rgba(244,63,94,0.3)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(244,63,94,0.18)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(244,63,94,0.1)")
          }
        >
          <IconReceipt className="w-3.5 h-3.5" />
          Registrar Gasto
        </button>
      </div>
    </header>
  );
}
