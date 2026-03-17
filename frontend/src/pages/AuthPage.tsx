import MarketingPanel from "../components/MarketingPanel";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useState } from "react";

export default function AuthPage() {
  const [showRegister, setShowRegister] = useState(false);
  return (
    <div
      className="min-h-screen flex"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 20% 50%, #1e0a3c 0%, #0a0a18 60%, #080810 100%)",
      }}
    >
      <MarketingPanel />

      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        {showRegister ? (
          <RegisterForm
            onLogin={() => setShowRegister(false)}
            onSuccess={() => setShowRegister(false)}
          />
        ) : (
          <LoginForm onShowRegister={() => setShowRegister(true)} />
        )}
      </div>
    </div>
  );
}
