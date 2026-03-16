// Login form card — email, password, remember-me, forgot password, submit.

import { useState } from "react";
import Logo from "../ui/Logo";
import { IconEye, IconLock, IconMail } from "../ui/icons";

// Shared style helpers ─────────────────────────────────────────────────────────
const inputBase: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
};
const inputFocused: React.CSSProperties = {
  border: "1px solid rgba(139,92,246,0.7)",
};
const inputBlurred: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.08)",
};

// ──────────────────────────────────────────────────────────────────────────────

interface LoginFormProps {
  onRegister: () => void;
}

export default function LoginForm({ onRegister }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call auth service
  };

  return (
    <div
      className="w-full max-w-md rounded-3xl p-8 lg:p-10"
      style={{
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        boxShadow:
          "0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      <Logo />

      <h2 className="text-white font-bold text-2xl text-center tracking-tight">
        Bienvenido de vuelta
      </h2>
      <p className="text-slate-400 text-sm text-center mt-1.5">
        Ingresa a tu cuenta para continuar
      </p>

      <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* ── Email ── */}
        <div>
          <label className="block text-slate-300 text-xs font-medium mb-1.5 ml-1">
            Correo Electrónico
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
              <IconMail />
            </span>
            <input
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
              style={inputBase}
              onFocus={(e) =>
                Object.assign(e.currentTarget.style, inputFocused)
              }
              onBlur={(e) => Object.assign(e.currentTarget.style, inputBlurred)}
            />
          </div>
        </div>

        {/* ── Password ── */}
        <div>
          <label className="block text-slate-300 text-xs font-medium mb-1.5 ml-1">
            Contraseña
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
              <IconLock />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
              style={inputBase}
              onFocus={(e) =>
                Object.assign(e.currentTarget.style, inputFocused)
              }
              onBlur={(e) => Object.assign(e.currentTarget.style, inputBlurred)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
            >
              <IconEye open={showPassword} />
            </button>
          </div>
        </div>

        {/* ── Remember + Forgot ── */}
        <div className="flex items-center justify-between mt-1">
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <div
              role="checkbox"
              aria-checked={remember}
              onClick={() => setRemember((v) => !v)}
              className={`w-4 h-4 rounded flex items-center justify-center transition-all ${
                remember
                  ? "bg-violet-600 border-violet-600"
                  : "border border-slate-600 bg-transparent"
              }`}
            >
              {remember && (
                <svg
                  viewBox="0 0 12 12"
                  className="w-2.5 h-2.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <polyline points="1.5,6 4.5,9 10.5,3" />
                </svg>
              )}
            </div>
            <span className="text-slate-400 text-xs select-none group-hover:text-slate-300 transition-colors">
              Recordarme
            </span>
          </label>

          <button
            type="button"
            className="text-violet-400 text-xs hover:text-violet-300 transition-colors font-medium"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        {/* ── Submit ── */}
        <button
          type="submit"
          className="mt-2 w-full py-3.5 rounded-xl text-white font-semibold text-sm tracking-wide transition-all active:scale-[0.98]"
          style={{
            background:
              "linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%)",
            boxShadow: "0 4px 24px rgba(109,40,217,0.45)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow =
              "0 6px 32px rgba(109,40,217,0.65)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow =
              "0 4px 24px rgba(109,40,217,0.45)")
          }
        >
          Iniciar Sesión
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-slate-500">
        ¿No tienes una cuenta?{" "}
        <button
          onClick={onRegister}
          className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
        >
          Regístrate aquí
        </button>
      </p>
    </div>
  );
}
