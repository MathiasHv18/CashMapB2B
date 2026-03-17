import { useState } from "react";
import Logo from "../ui/Logo";
import SubmitButton from "../ui/SubmitButton";
import MoneyInput from "../ui/MoneyInput";
import ErrorMessage from "../ui/ErrorMessage";
import {
  IconArrowLeft,
  IconBanknote,
  IconPhone,
  IconWallet,
} from "../components/icons";
import { setInitialBusinessBalance } from "../api/business";

interface Props {
  idBusiness: number;
  onBack: () => void;
  onFinish: () => void;
}

export default function Step2Balance({ idBusiness, onBack, onFinish }: Props) {
  const [cash, setCash] = useState("");
  const [digital, setDigital] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const total = (parseFloat(cash) || 0) + (parseFloat(digital) || 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await setInitialBusinessBalance({
        idBusiness,
        digitalBalance: parseFloat(digital) || 0,
        cashBalance: parseFloat(cash) || 0,
      });
      onFinish();
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al guardar el balance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Logo />
      <h2 className="text-white font-bold text-2xl text-center tracking-tight">
        Corte de caja inicial
      </h2>
      <p className="text-slate-400 text-sm text-center mt-1.5">
        ¿Cuánto dinero tienes ahora mismo? Podrás ajustarlo después.
      </p>

      <form className="mt-7 flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Efectivo */}
        <div
          className="rounded-xl p-4"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
              <IconBanknote />
            </div>
            <span className="text-white text-sm font-semibold">
              Dinero Físico (Efectivo)
            </span>
          </div>
          <MoneyInput value={cash} onChange={setCash} />
        </div>

        {/* Digital */}
        <div
          className="rounded-xl p-4"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center text-violet-400">
              <IconPhone />
            </div>
            <span className="text-white text-sm font-semibold">
              Dinero Digital (Yape, Plin, Cuentas)
            </span>
          </div>
          <MoneyInput value={digital} onChange={setDigital} />
        </div>

        {/* Total */}
        <div
          className="rounded-xl p-4 flex items-center gap-4"
          style={{
            background: "rgba(109,40,217,0.1)",
            border: "1px solid rgba(139,92,246,0.2)",
          }}
        >
          <div className="w-8 h-8 rounded-xl bg-violet-600/25 flex items-center justify-center text-violet-300">
            <IconWallet />
          </div>
          <span className="flex-1 text-slate-300 text-sm">
            Balance Total Inicial
          </span>
          <span className="text-white font-bold text-xl">
            S/{" "}
            {total.toLocaleString("es-PE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>

        <ErrorMessage error={error} />

        {/* Volver + Finalizar */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-slate-300 text-sm font-semibold transition-all hover:text-white active:scale-[0.98]"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <IconArrowLeft /> Volver
          </button>
          <SubmitButton
            loading={loading}
            label="Ir a mi Dashboard"
            loadingLabel="Guardando..."
          />
        </div>
      </form>
    </div>
  );
}
