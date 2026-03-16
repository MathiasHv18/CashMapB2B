// Modal for adding a new catalog item (product or service).

import { useState } from "react";
import Spinner from "../ui/Spinner";
import { IconX, IconTag, IconStore, IconFileText } from "../ui/icons";
import { inputBase, inputFocused, inputBlurred } from "../../lib/styles";
import type { CatalogItem } from "../../types";

interface NuevoItemModalProps {
  onClose: () => void;
  onSave: (item: Omit<CatalogItem, "id">) => void;
}

export default function NuevoItemModal({
  onClose,
  onSave,
}: NuevoItemModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"producto" | "servicio">("producto");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSave({ name, price: parseFloat(price), category, type, description });
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-120 rounded-2xl p-7"
        style={{
          background: "#0f0b1e",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-semibold text-base">Nuevo Ítem</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 transition-all"
            style={{ background: "rgba(255,255,255,0.07)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.12)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
            }
          >
            <IconX className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Type toggle */}
          <div
            className="flex rounded-xl p-1"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {(["producto", "servicio"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className="flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition-all"
                style={{
                  background:
                    type === t ? "rgba(124,58,237,0.3)" : "transparent",
                  color: type === t ? "#c4b5fd" : "rgba(148,163,184,0.6)",
                  border:
                    type === t
                      ? "1px solid rgba(139,92,246,0.4)"
                      : "1px solid transparent",
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Name */}
          <div>
            <label className="block text-slate-300 text-xs font-medium mb-1.5 ml-1">
              Nombre
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                <IconStore className="w-4 h-4" />
              </span>
              <input
                required
                type="text"
                placeholder="Coca Cola 600ml"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
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

          {/* Price + Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 text-xs font-medium mb-1.5 ml-1">
                Precio (S/)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-xs font-semibold">
                  S/
                </span>
                <input
                  required
                  type="number"
                  min={0}
                  step="0.01"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full pl-8 pr-3 py-3 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
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
                Categoría
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                  <IconTag className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="Bebidas"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
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

          {/* Description (optional) */}
          <div>
            <label className="block text-slate-300 text-xs font-medium mb-1.5 ml-1">
              Descripción{" "}
              <span className="text-slate-600 font-normal">(Opcional)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-slate-500 pointer-events-none">
                <IconFileText className="w-4 h-4" />
              </span>
              <textarea
                rows={2}
                placeholder="Breve descripción del ítem..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full pl-9 pr-3 py-3 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all resize-none"
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

          {/* CTA */}
          <div className="flex gap-3 mt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl text-slate-300 text-sm font-semibold transition-all"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.11)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
              }
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl text-white text-sm font-semibold disabled:opacity-70 flex items-center justify-center gap-2 transition-all active:scale-[0.97]"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                boxShadow: "0 2px 12px rgba(109,40,217,0.4)",
              }}
            >
              {loading && <Spinner size="sm" />}
              Guardar ítem
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
