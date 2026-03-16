import { useState } from "react";

interface Props {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (val: string) => void;
  type?: string; // "text" por defecto
  placeholder?: string;
  rightSlot?: React.ReactNode; // por ej. el botón del ojo en la contraseña
  min?: number;
  max?: number;
}

// Campo de formulario reutilizable: label + ícono + input.
// El borde violeta al hacer focus se maneja internamente.
export default function Field({
  label,
  icon,
  value,
  onChange,
  type = "text",
  placeholder,
  rightSlot,
  min,
  max,
}: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <label className="block text-slate-300 text-xs font-medium mb-1.5 ml-1">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full pl-12 ${rightSlot ? "pr-12" : "pr-4"} py-3.5 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all`}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${focused ? "rgba(139,92,246,0.7)" : "rgba(255,255,255,0.08)"}`,
          }}
        />
        {rightSlot && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {rightSlot}
          </div>
        )}
      </div>
    </div>
  );
}
