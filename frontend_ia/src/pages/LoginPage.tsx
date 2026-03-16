// Full-screen login page: combines the marketing panel and the auth form.

import LoginForm from "../components/auth/LoginForm";
import MarketingPanel from "../components/auth/MarketingPanel";

interface LoginPageProps {
  onRegister: () => void;
}

export default function LoginPage({ onRegister }: LoginPageProps) {
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
        <LoginForm onRegister={onRegister} />
      </div>
    </div>
  );
}
