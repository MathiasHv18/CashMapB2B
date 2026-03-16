import { useState } from "react";
import { IconCheck, IconEye, IconLock, IconMail } from "./icons";
import AuthCard from "../ui/AuthCard";
import Logo from "../ui/Logo";
import Field from "../ui/Field";
import SubmitButton from "../ui/SubmitButton";

interface Props {
  onRegister: () => void;
  onSuccess: () => void;
}

export default function LoginForm({ onRegister, onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail ?? "Credenciales incorrectas");
        return;
      }
      localStorage.setItem("access_token", data.access_token);
      onSuccess();
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <Logo />

      <h2 className="text-white font-bold text-2xl text-center tracking-tight">
        Bienvenido de vuelta
      </h2>
      <p className="text-slate-400 text-sm text-center mt-1.5">
        Ingresa a tu cuenta para continuar
      </p>

      <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
        <Field
          label="Correo Electrónico"
          icon={<IconMail />}
          type="email"
          placeholder="ejemplo@correo.com"
          value={email}
          onChange={setEmail}
        />

        <Field
          label="Contraseña"
          icon={<IconLock />}
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
          rightSlot={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="text-slate-500 hover:text-slate-300 transition-colors"
            >
              <IconEye open={showPassword} />
            </button>
          }
        />

        {/* Recordarme + Olvidé contraseña */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <div
              role="checkbox"
              aria-checked={remember}
              onClick={() => setRemember((v) => !v)}
              className={`w-4 h-4 rounded flex items-center justify-center transition-all ${remember ? "bg-violet-600" : "border border-slate-600"}`}
            >
              {remember && <IconCheck />}
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

        {error && (
          <p className="text-red-400 text-xs text-center bg-red-500/10 border border-red-500/20 rounded-xl py-2.5 px-3">
            {error}
          </p>
        )}

        <SubmitButton
          loading={loading}
          label="Iniciar Sesión"
          loadingLabel="Iniciando sesión..."
        />
      </form>

      <p className="mt-7 text-center text-sm text-slate-500">
        ¿No tienes una cuenta?{" "}
        <button
          onClick={onRegister}
          className="text-violet-400 hover:text-violet-300 font-semibold transition-colors cursor-pointer"
        >
          Regístrate aquí
        </button>
      </p>
    </AuthCard>
  );
}
