import { useState } from "react";

interface MoneyInputProps {
  value: string;
  onChange: (v: string) => void;
}

export default function MoneyInput({ value, onChange }: MoneyInputProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative mt-2">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold pointer-events-none select-none">
        S/
      </span>
      <input
        type="number"
        min={0}
        step="0.01"
        placeholder="0.00"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: `1px solid ${focused ? "rgba(139,92,246,0.7)" : "rgba(255,255,255,0.08)"}`,
        }}
      />
    </div>
  );
}
