import { useState, useEffect } from "react";
import Logo from "../ui/Logo";
import Field from "../ui/Field";
import SubmitButton from "../ui/SubmitButton";
import ErrorMessage from "../ui/ErrorMessage";
import { IconCalendar, IconMail, IconStore } from "../components/icons";
import { getCategories, createBusiness } from "../api/business";
import type { Category } from "../api/business";

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
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const result = await getCategories();
        setCategories(result.data);
      } catch {
        setError("No se pudo cargar las categorias");
      }
    };
    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await createBusiness({
        idCategoryBusiness: idCategory,
        name,
        description,
        email,
        foundationYear: Number(year),
      });
      onNext(res.data);
      console.log("Business created with ID:", res.data);
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message);
      }
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
            {categories.map((c) => (
              <option
                key={c.idCategoryBusiness}
                value={c.idCategoryBusiness}
                style={{ background: "#0f0f1a" }}
              >
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

        <ErrorMessage error={error} />

        <SubmitButton
          loading={loading}
          label="Continuar"
          loadingLabel="Guardando..."
        />
      </form>
    </div>
  );
}
