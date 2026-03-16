import { useState } from "react";
import Step1Business from "./Step1Business";
import Step2Balance from "./Step2Balance";

interface Props {
  onComplete: () => void;
}

export default function OnboardingPage({ onComplete }: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [idBusiness, setIdBusiness] = useState(0); // se llenará con el id devuelto por el backend en el paso 1

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(109,40,217,0.3) 0%, transparent 70%), #080810",
      }}
    >
      <div className="w-full max-w-lg flex flex-col items-center gap-6">
        {/* Indicador de pasos — dos puntos, el activo se alarga */}
        <div className="flex items-center gap-2">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: step === n ? "28px" : "8px",
                background: step === n ? "#7c3aed" : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>

        {/* Tarjeta de contenido */}
        <div
          className="w-full rounded-3xl p-8 sm:p-10"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(24px)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
          }}
        >
          {step === 1 ? (
            <Step1Business
              onNext={(id) => {
                setIdBusiness(id);
                setStep(2);
              }}
            />
          ) : (
            <Step2Balance
              idBusiness={idBusiness}
              onBack={() => setStep(1)}
              onFinish={onComplete}
            />
          )}
        </div>

        <p className="text-slate-600 text-xs">Paso {step} de 2</p>
      </div>
    </div>
  );
}
