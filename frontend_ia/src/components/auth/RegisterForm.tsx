// Register form card — nombre, apellido, edad, sexo, email, password.

import { useState } from "react";
import Logo from "../ui/Logo";
import Spinner from "../ui/Spinner";
import {
  IconCalendar,
  IconChevronDown,
  IconEye,
  IconLock,
  IconMail,
  IconUser,
} from "../ui/icons";

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

const SEXO_OPTIONS = ["Masculino", "Femenino", "Prefiero no decir"] as const;
type Sexo = (typeof SEXO_OPTIONS)[number] | "";

interface RegisterFormProps {
  onLogin: () => void;
  onRegisterSuccess: () => void;
}

// ──────────────────────────────────────────────────────────────────────────────

export default function RegisterForm({
  onLogin,
  onRegisterSuccess,
}: RegisterFormProps) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [sexo, setSexo] = useState<Sexo>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: call POST /auth/register
    setTimeout(() => {
      setLoading(false);
      onRegisterSuccess();
    }, 900);
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
        Crea tu cuenta en CashMap
      </h2>
      <p className="text-slate-400 text-sm text-center mt-1.5">
        Empieza a controlar las finanzas de tu negocio
      </p>

      <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* ── Nombre + Apellido ── */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-300 text-xs font-medium mb-1.5 ml-1">
              Nombre
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                <IconUser />
              </span>
              <input
                type="text"
                placeholder="Juan"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full pl-10 pr-3 py-3.5 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
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
              Apellido
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                <IconUser />
              </span>
              <input
                type="text"
                placeholder="Pérez"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className="w-full pl-10 pr-3 py-3.5 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
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
        </div>

        {/* ── Edad + Sexo ── */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-300 text-xs font-medium mb-1.5 ml-1">
              Edad
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                <IconCalendar />
              </span>
              <input
                type="number"
                min={16}
                max={99}
                placeholder="25"
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
                className="w-full pl-10 pr-3 py-3.5 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
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
              Sexo
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                <IconUser />
              </span>
              <select
                value={sexo}
                onChange={(e) => setSexo(e.target.value as Sexo)}
                className="w-full pl-10 pr-8 py-3.5 rounded-xl text-sm outline-none transition-all appearance-none cursor-pointer"
                style={{
                  ...inputBase,
                  color: sexo ? "white" : "rgba(148,163,184,0.5)", // slate-600
                }}
                onFocus={(e) => {
                  Object.assign(e.currentTarget.style, inputFocused);
                  e.currentTarget.style.color = "white";
                }}
                onBlur={(e) => {
                  Object.assign(e.currentTarget.style, inputBlurred);
                  if (!sexo)
                    e.currentTarget.style.color = "rgba(148,163,184,0.5)";
                }}
              >
                <option value="" disabled hidden style={{ color: "#94a3b8" }}>
                  Seleccionar
                </option>
                {SEXO_OPTIONS.map((opt) => (
                  <option
                    key={opt}
                    value={opt}
                    style={{ background: "#0f0b1e", color: "white" }}
                  >
                    {opt}
                  </option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                <IconChevronDown />
              </span>
            </div>
          </div>
        </div>

        {/* ── Correo Electrónico ── */}
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

        {/* ── Contraseña ── */}
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

        {/* ── Submit ── */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full py-3.5 rounded-xl text-white font-semibold text-sm tracking-wide transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
          style={{
            background:
              "linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%)",
            boxShadow: "0 4px 24px rgba(109,40,217,0.45)",
          }}
          onMouseEnter={(e) =>
            !loading &&
            (e.currentTarget.style.boxShadow =
              "0 6px 32px rgba(109,40,217,0.65)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow =
              "0 4px 24px rgba(109,40,217,0.45)")
          }
        >
          {loading && <Spinner />}
          Crear Cuenta
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-slate-500">
        ¿Ya tienes un negocio registrado?{" "}
        <button
          onClick={onLogin}
          className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
        >
          Inicia Sesión
        </button>
      </p>
    </div>
  );
}
