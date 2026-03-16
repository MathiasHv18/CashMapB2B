import { useState } from "react";
import MarketingPanel from "./components/MarketingPanel";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import OnboardingPage from "./pages/OnboardingPage";

function App() {
  // "login" | "register" | "onboarding" | "app" — cuatro estados posibles
  const [page, setPage] = useState<"login" | "register" | "onboarding" | "app">(
    "login",
  );

  if (page === "onboarding") {
    return <OnboardingPage onComplete={() => setPage("app")} />;
  }

  // Pantalla temporal post-login hasta tener el dashboard real
  if (page === "app") {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 50%, #1e0a3c 0%, #0a0a18 60%, #080810 100%)",
        }}
      >
        <div className="text-center">
          <p className="text-white text-xl font-semibold">
            ¡Sesión iniciada! 🎉
          </p>
          <p className="text-slate-400 text-sm mt-2">Aquí irá el dashboard</p>
          <button
            onClick={() => {
              localStorage.removeItem("access_token");
              setPage("login");
            }}
            className="mt-6 text-violet-400 hover:text-violet-300 text-sm cursor-pointer"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    );
  }

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
        {page === "login" ? (
          <LoginForm
            onRegister={() => setPage("register")}
            onSuccess={() => setPage("app")}
          />
        ) : (
          <RegisterForm
            onLogin={() => setPage("login")}
            onSuccess={() => setPage("onboarding")}
          />
        )}
      </div>
    </div>
  );
}

export default App;
