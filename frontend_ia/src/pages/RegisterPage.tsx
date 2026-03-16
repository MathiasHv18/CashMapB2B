import RegisterForm from "../components/auth/RegisterForm";
import MarketingPanel from "../components/auth/MarketingPanel";

interface RegisterPageProps {
  onLogin: () => void;
  onRegisterSuccess: () => void;
}

export default function RegisterPage({
  onLogin,
  onRegisterSuccess,
}: RegisterPageProps) {
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
        <RegisterForm onLogin={onLogin} onRegisterSuccess={onRegisterSuccess} />
      </div>
    </div>
  );
}
