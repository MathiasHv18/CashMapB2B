// Summary metric card for the Dashboard (balance, ingresos, gastos, etc.)

import type { ReactNode } from "react";

interface SummaryCardProps {
  label: string;
  sublabel: string;
  value: string;
  /** Colored icon element (pass an icon wrapped in a div or JSX) */
  icon: ReactNode;
  /** Tailwind/inline bg for the icon circle */
  iconBg: string;
  trend?: "up" | "down" | "neutral";
}

export default function SummaryCard({
  label,
  sublabel,
  value,
  icon,
  iconBg,
  trend,
}: SummaryCardProps) {
  const trendColor =
    trend === "up"
      ? "#34d399"
      : trend === "down"
        ? "#f87171"
        : "rgba(255,255,255,0.3)";
  const trendArrow = trend === "up" ? "▲" : trend === "down" ? "▼" : null;

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-4 transition-all"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-xs font-medium">{label}</p>
          <p className="text-slate-600 text-[11px] mt-0.5">{sublabel}</p>
        </div>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: iconBg }}
        >
          {icon}
        </div>
      </div>

      <div className="flex items-end justify-between">
        <span className="text-white font-bold text-2xl tracking-tight">
          {value}
        </span>
        {trendArrow && (
          <span className="text-xs font-semibold" style={{ color: trendColor }}>
            {trendArrow}
          </span>
        )}
      </div>
    </div>
  );
}
