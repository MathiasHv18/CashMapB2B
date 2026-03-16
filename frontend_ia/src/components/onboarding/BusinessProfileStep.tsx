// Onboarding Step 1 — collect business profile data.
// Endpoint: POST /business/create

import { useState } from "react";
import Logo from "../ui/Logo";
import Spinner from "../ui/Spinner";
import {
  IconStore,
  IconChevronDown,
  IconMail,
  IconCalendar,
  IconFileText,
} from "../ui/icons";
import { inputBase, inputFocused, inputBlurred } from "../../lib/styles";
import { BUSINESS_CATEGORIES } from "../../lib/mock";
import type { BusinessProfile } from "../../types";

interface BusinessProfileStepProps {
  onNext: (data: BusinessProfile) => void;
}

export default function BusinessProfileStep({
  onNext,
}: BusinessProfileStepProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [foundingYear, setFoundingYear] = useState(
    new Date().getFullYear().toString(),
  );
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: call POST /business/create
    setTimeout(() => {
      setLoading(false);
      onNext({
        name,
        category,
        email,
        foundingYear: Number(foundingYear),
        description,
      });
    }, 800);
  };

  const descMax = 200;

  return (
    <div className="w-full max-w-120">
      <Logo />

      <h2 className="text-white font-bold text-2xl text-center tracking-tight">
        ¡Bienvenido a bordo!
      </h2>
      <p className="text-slate-400 text-sm text-center mt-1.5">
        Cuéntanos sobre tu negocio. Este será tu espacio principal de trabajo.
      </p>

      <form className="mt-7 flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Nombre del negocio */}
        <div>
          <label className="block text-slate-300 text-xs font-medium mb-1.5 ml-1">
            Nombre del negocio
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
              <IconStore />
            </span>
            <input
              required
              type="text"
              placeholder="Mi Bodeguita"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
              style={inputBase}
              onFocus={(e) =>
                Object.assign(e.currentTarget.style, inputFocused)
              }
              onBlur={(e) => Object.assign(e.currentTarget.style, inputBlurred)}
            />
          </div>
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-slate-300 text-xs font-medium mb-1.5 ml-1">
            Categoría
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
              <IconStore />
            </span>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full pl-10 pr-9 py-3.5 rounded-xl text-sm outline-none transition-all appearance-none cursor-pointer"
              style={{
                ...inputBase,
                color: category ? "white" : "rgba(148,163,184,0.5)",
              }}
              onFocus={(e) => {
                Object.assign(e.currentTarget.style, inputFocused);
                e.currentTarget.style.color = "white";
              }}
              onBlur={(e) => {
                Object.assign(e.currentTarget.style, inputBlurred);
                if (!category)
                  e.currentTarget.style.color = "rgba(148,163,184,0.5)";
              }}
            >
              <option value="" disabled hidden>
                Selecciona una categoría
              </option>
              {BUSINESS_CATEGORIES.map((c) => (
                <option
                  key={c}
                  value={c}
                  style={{ background: "#0f0b1e", color: "white" }}
                >
                  {c}
                </option>
              ))}
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
              <IconChevronDown />
            </span>
          </div>
        </div>

        {/* Correo + Año de fundación */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-300 text-xs font-medium mb-1.5 ml-1">
              Correo del negocio
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                <IconMail />
              </span>
              <input
                required
                type="email"
                placeholder="contacto@minegocio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              Año de fundación
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                <IconCalendar />
              </span>
              <input
                required
                type="number"
                min={1900}
                max={new Date().getFullYear()}
                value={foundingYear}
                onChange={(e) => setFoundingYear(e.target.value)}
                className="w-full pl-10 pr-3 py-3.5 rounded-xl text-sm text-white outline-none transition-all"
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

        {/* Descripción */}
        <div>
          <label className="block text-slate-300 text-xs font-medium mb-1.5 ml-1">
            Breve descripción{" "}
            <span className="text-slate-600 font-normal">(Opcional)</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3.5 text-slate-500 pointer-events-none">
              <IconFileText />
            </span>
            <textarea
              maxLength={descMax}
              rows={3}
              placeholder="Describe tu negocio en pocas palabras..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all resize-none"
              style={inputBase}
              onFocus={(e) =>
                Object.assign(e.currentTarget.style, inputFocused)
              }
              onBlur={(e) => Object.assign(e.currentTarget.style, inputBlurred)}
            />
            <span className="absolute right-3 bottom-2.5 text-xs text-slate-600">
              {description.length}/{descMax} caracteres
            </span>
          </div>
        </div>

        {/* CTA */}
        <button
          type="submit"
          disabled={loading}
          className="mt-1 w-full py-3.5 rounded-xl text-white font-semibold text-sm tracking-wide transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
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
          Siguiente paso
        </button>
      </form>
    </div>
  );
}
