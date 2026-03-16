// Onboarding Step 2 — declare initial cash balances.
// Endpoint: POST /business/{id}/set-initial-balance

import { useState } from "react";
import Logo from "../ui/Logo";
import Spinner from "../ui/Spinner";
import {
  IconBanknote,
  IconSmartphone,
  IconWallet,
  IconArrowLeft,
} from "../ui/icons";
import { inputBase, inputFocused, inputBlurred } from "../../lib/styles";
import type { InitialBalance } from "../../types";

interface InitialBalanceStepProps {
  onBack: () => void;
  onFinish: (balance: InitialBalance) => void;
}

function MoneyInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative mt-2">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold pointer-events-none select-none">
        S/
      </span>
      <input
        type="number"
        min={0}
        step="0.01"
        placeholder="0.00"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
        style={inputBase}
        onFocus={(e) => Object.assign(e.currentTarget.style, inputFocused)}
        onBlur={(e) => Object.assign(e.currentTarget.style, inputBlurred)}
      />
    </div>
  );
}

function fmt(n: number) {
  return n.toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function InitialBalanceStep({
  onBack,
  onFinish,
}: InitialBalanceStepProps) {
  const [cash, setCash] = useState("");
  const [digital, setDigital] = useState("");
  const [loading, setLoading] = useState(false);

  const cashNum = parseFloat(cash) || 0;
  const digitalNum = parseFloat(digital) || 0;
  const total = cashNum + digitalNum;

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: call POST /business/{id}/set-initial-balance
    setTimeout(() => {
      setLoading(false);
      onFinish({ cash: cashNum, digital: digitalNum });
    }, 900);
  };

  return (
    <div className="w-full max-w-120">
      <Logo />

      <h2 className="text-white font-bold text-2xl text-center tracking-tight">
        Hagamos un corte de caja inicial
      </h2>
      <p className="text-slate-400 text-sm text-center mt-1.5">
        Ingresa el dinero que tienes actualmente. Podrás ajustarlo después.
      </p>

      <form className="mt-7 flex flex-col gap-5" onSubmit={handleFinish}>
        {/* Dinero Físico */}
        <div
          className="rounded-xl p-4"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <IconBanknote className="w-4 h-4" />
            </div>
            <span className="text-white text-sm font-semibold">
              Dinero Físico (Efectivo)
            </span>
          </div>
          <MoneyInput value={cash} onChange={setCash} />
        </div>

        {/* Dinero Digital */}
        <div
          className="rounded-xl p-4"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="w-7 h-7 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400">
              <IconSmartphone className="w-4 h-4" />
            </div>
            <span className="text-white text-sm font-semibold">
              Dinero Digital (Yape, Plin, Cuentas)
            </span>
          </div>
          <MoneyInput value={digital} onChange={setDigital} />
        </div>

        {/* Balance total */}
        <div
          className="rounded-xl p-4 flex items-center gap-4"
          style={{
            background: "rgba(109,40,217,0.12)",
            border: "1px solid rgba(139,92,246,0.25)",
          }}
        >
          <div className="w-9 h-9 rounded-xl bg-violet-600/30 flex items-center justify-center text-violet-300">
            <IconWallet />
          </div>
          <span className="flex-1 text-slate-300 text-sm">
            Balance Total Inicial
          </span>
          <span className="text-white font-bold text-xl tracking-tight">
            S/ {fmt(total)}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-1">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-slate-300 text-sm font-semibold transition-all hover:text-white active:scale-[0.98] shrink-0"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <IconArrowLeft className="w-4 h-4" />
            Volver
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3.5 rounded-xl text-white font-semibold text-sm tracking-wide transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
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
            Ir a mi Dashboard
          </button>
        </div>
      </form>
    </div>
  );
}
