// Onboarding wizard wrapper: step indicator + floating card layout.

import { useState } from "react";
import BusinessProfileStep from "../components/onboarding/BusinessProfileStep";
import InitialBalanceStep from "../components/onboarding/InitialBalanceStep";
import type { BusinessProfile, InitialBalance } from "../types";

interface OnboardingPageProps {
  onComplete: (business: BusinessProfile, balance: InitialBalance) => void;
}

export default function OnboardingPage({ onComplete }: OnboardingPageProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [businessData, setBusinessData] = useState<BusinessProfile | null>(
    null,
  );

  const handleNext = (data: BusinessProfile) => {
    setBusinessData(data);
    setStep(2);
  };

  const handleBack = () => setStep(1);

  const handleFinish = (balance: InitialBalance) => {
    if (businessData) {
      onComplete(businessData, balance);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(109,40,217,0.3) 0%, transparent 70%), #080810",
      }}
    >
      {/* Step indicator + content card */}
      <div className="w-full max-w-130 flex flex-col items-center gap-6">
        {/* Step dots */}
        <div className="flex items-center gap-2">
          <div
            className="h-2 rounded-full transition-all"
            style={{
              width: step === 1 ? "28px" : "8px",
              background: step === 1 ? "#7c3aed" : "rgba(255,255,255,0.15)",
            }}
          />
          <div
            className="h-2 rounded-full transition-all"
            style={{
              width: step === 2 ? "28px" : "8px",
              background: step === 2 ? "#7c3aed" : "rgba(255,255,255,0.15)",
            }}
          />
        </div>

        {/* Glass card */}
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
            <BusinessProfileStep onNext={handleNext} />
          ) : (
            <InitialBalanceStep onBack={handleBack} onFinish={handleFinish} />
          )}
        </div>

        {/* Step label */}
        <p className="text-slate-600 text-xs">Paso {step} de 2</p>
      </div>
    </div>
  );
}
