import { useState } from "react";
import Logo from "../ui/Logo";
import Field from "../ui/Field";
import SubmitButton from "../ui/SubmitButton";
import { IconCalendar, IconMail, IconStore } from "../components/icons";

// TODO: verificar que estos IDs coincidan con la tabla CATEGORY_BUSINESSES en la DB
const CATEGORIES = [
  { id: 1, name: "Bodega / Abarrotes" },
  { id: 2, name: "Restaurante / Comida" },
  { id: 3, name: "Ropa / Calzado" },
  { id: 4, name: "Tecnología / Electrónica" },
  { id: 5, name: "Servicios" },
];

interface Props {
  onNext: (idBusiness: number) => void;
}

export default function Step1Business({ onNext }: Props) {
  const [name, setName] = useState("");
  const [idCategory, setIdCategory] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch("http://localhost:8000/business/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          idCategoryBusiness: Number(idCategory),
          name,
          description,
          email,
          foundationYear: Number(year),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail ?? "Error al crear el negocio");
        return;
      }
      onNext(data.idBusiness);
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Logo />
      <h2 className="text-white font-bold text-2xl text-center tracking-tight">
        ¡Bienvenido a bordo!
      </h2>
      <p className="text-slate-400 text-sm text-center mt-1.5">
        Cuéntanos sobre tu negocio.
      </p>

      <form className="mt-7 flex flex-col gap-4" onSubmit={handleSubmit}>
        <Field
          label="Nombre del negocio"
          icon={<IconStore />}
          placeholder="Mi Bodeguita"
          value={name}
          onChange={setName}
        />

        {/* Select de categoría — igual que el select de Sexo en RegisterForm */}
        <div>
          <label className="block text-slate-300 text-xs font-medium mb-1.5 ml-1">
            Categoría
          </label>
          <select
            required
            value={idCategory}
            onChange={(e) => setIdCategory(e.target.value)}
            className="w-full px-3 py-3.5 rounded-xl text-sm outline-none transition-all appearance-none cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: idCategory ? "white" : "rgb(75 85 99)",
            }}
          >
            <option value="" disabled hidden style={{ background: "#0f0f1a" }}>
              Selecciona una categoría
            </option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id} style={{ background: "#0f0f1a" }}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Correo del negocio"
            icon={<IconMail />}
            type="email"
            placeholder="negocio@correo.com"
            value={email}
            onChange={setEmail}
          />
          <Field
            label="Año de fundación"
            icon={<IconCalendar />}
            type="number"
            placeholder="2020"
            value={year}
            onChange={setYear}
            min={1900}
            max={new Date().getFullYear()}
          />
        </div>

        {/* Descripción — textarea, no Field porque es multilínea */}
        <div>
          <label className="block text-slate-300 text-xs font-medium mb-1.5 ml-1">
            Descripción (opcional)
          </label>
          <textarea
            placeholder="Brevemente, ¿a qué se dedica tu negocio?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all resize-none"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
        </div>

        {error && (
          <p className="text-red-400 text-xs text-center bg-red-500/10 border border-red-500/20 rounded-xl py-2.5 px-3">
            {error}
          </p>
        )}

        <SubmitButton
          loading={loading}
          label="Continuar"
          loadingLabel="Guardando..."
        />
      </form>
    </div>
  );
}
