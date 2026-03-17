import { useState } from "react";
import { IconCalendar, IconEye, IconLock, IconMail, IconUser } from "./icons";
import AuthCard from "../ui/AuthCard";
import Logo from "../ui/Logo";
import Field from "../ui/Field";
import SubmitButton from "../ui/SubmitButton";
import ErrorMessage from "../ui/ErrorMessage";
import { register } from "../api/auth";

interface Props {
  onLogin: () => void; // botón "ya tienes cuenta"
  onSuccess: () => void; // registro exitoso → onboarding
}

const SEXO_OPTIONS = ["Masculino", "Femenino", "Prefiero no decir"];

export default function RegisterForm({ onLogin, onSuccess }: Props) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [sexo, setSexo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register({
        name: nombre,
        lastname: apellido,
        age: Number(edad),
        sex: sexo,
        email,
        password,
      });
      onSuccess();
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.detail);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <Logo />

      <h2 className="text-white font-bold text-2xl text-center tracking-tight">
        Crea tu cuenta
      </h2>
      <p className="text-slate-400 text-sm text-center mt-1.5">
        Empieza a controlar las finanzas de tu negocio
      </p>

      <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Nombre + Apellido */}
        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Nombre"
            icon={<IconUser />}
            placeholder="Juan"
            value={nombre}
            onChange={setNombre}
          />
          <Field
            label="Apellido"
            icon={<IconUser />}
            placeholder="Pérez"
            value={apellido}
            onChange={setApellido}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Edad"
            icon={<IconCalendar />}
            type="number"
            placeholder="25"
            value={edad}
            onChange={setEdad}
            min={16}
            max={99}
          />
          <div>
            <label className="block text-slate-300 text-xs font-medium mb-1.5 ml-1">
              Sexo
            </label>
            <select
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              className="w-full px-3 py-3.5 rounded-xl text-sm outline-none transition-all appearance-none cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: sexo ? "white" : "rgb(75 85 99)",
              }}
            >
              <option
                value=""
                disabled
                hidden
                style={{ background: "#0f0f1a" }}
              >
                Seleccionar
              </option>
              {SEXO_OPTIONS.map((op) => (
                <option key={op} value={op} style={{ background: "#0f0f1a" }}>
                  {op}
                </option>
              ))}
            </select>
          </div>
        </div>

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

        <ErrorMessage error={error} />

        <SubmitButton
          loading={loading}
          label="Crear Cuenta"
          loadingLabel="Creando cuenta..."
        />
      </form>

      <p className="mt-7 text-center text-sm text-slate-500">
        ¿Ya tienes una cuenta?{" "}
        <button
          onClick={onLogin}
          className="text-violet-400 hover:text-violet-300 font-semibold transition-colors cursor-pointer"
        >
          Inicia sesión
        </button>
      </p>
    </AuthCard>
  );
}
