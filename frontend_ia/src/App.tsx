import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OnboardingPage from "./pages/OnboardingPage";
import DashboardPage from "./pages/DashboardPage";
import CatalogoPage from "./pages/CatalogoPage";
import VentasPage from "./pages/VentasPage";
import GastosPage from "./pages/GastosPage";
import Toast from "./components/ui/Toast";
import { useToast } from "./hooks/useToast";
import { DEMO_CATALOG, DEMO_SALES, DEMO_EXPENSES } from "./lib/mock";
import type {
  RootPage,
  AppPage,
  AppState,
  BusinessProfile,
  InitialBalance,
  CatalogItem,
  Sale,
  Expense,
} from "./types";

// ── helper: stable nano-id ────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 9);

// ── initial app state (demo data pre-loaded) ──────────────────────────────────
const INITIAL_STATE: AppState = {
  catalog: DEMO_CATALOG,
  sales: DEMO_SALES,
  expenses: DEMO_EXPENSES,
};

export default function App() {
  const [rootPage, setRootPage] = useState<RootPage>("login");
  const [appPage, setAppPage] = useState<AppPage>("inicio");
  const [appState, setAppState] = useState<AppState>(INITIAL_STATE);
  const { toasts, showToast, dismissToast } = useToast();

  // ── state mutators ──────────────────────────────────────────────────────────
  const handleOnboardingComplete = (
    business: BusinessProfile,
    balance: InitialBalance,
  ) => {
    setAppState((prev) => ({ ...prev, business, initialBalance: balance }));
    setRootPage("app");
  };

  const handleAddItem = (item: Omit<CatalogItem, "id">) => {
    setAppState((prev) => ({
      ...prev,
      catalog: [...prev.catalog, { ...item, id: uid() }],
    }));
  };

  const handleDeleteItem = (id: string) => {
    setAppState((prev) => ({
      ...prev,
      catalog: prev.catalog.filter((c) => c.id !== id),
    }));
  };

  const handleConfirmSale = (sale: Omit<Sale, "id">) => {
    setAppState((prev) => ({
      ...prev,
      sales: [{ ...sale, id: uid() }, ...prev.sales],
    }));
  };

  const handleConfirmExpense = (expense: Omit<Expense, "id">) => {
    setAppState((prev) => ({
      ...prev,
      expenses: [{ ...expense, id: uid() }, ...prev.expenses],
    }));
  };

  // ── derive display initials from business name ──────────────────────────────
  const businessName = appState.business?.name ?? "Mi Negocio";
  const userInitials = businessName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  // ── shared page props ───────────────────────────────────────────────────────
  const sharedPageProps = {
    appState,
    userInitials,
    onNavigate: setAppPage,
    showToast,
  };

  // ── render ──────────────────────────────────────────────────────────────────
  const renderPage = () => {
    if (rootPage === "login") {
      return <LoginPage onRegister={() => setRootPage("register")} />;
    }

    if (rootPage === "register") {
      return (
        <RegisterPage
          onLogin={() => setRootPage("login")}
          onRegisterSuccess={() => setRootPage("onboarding")}
        />
      );
    }

    if (rootPage === "onboarding") {
      return <OnboardingPage onComplete={handleOnboardingComplete} />;
    }

    // rootPage === "app"
    if (appPage === "ventas") {
      return (
        <VentasPage {...sharedPageProps} onConfirmSale={handleConfirmSale} />
      );
    }
    if (appPage === "gastos") {
      return (
        <GastosPage
          {...sharedPageProps}
          onConfirmExpense={handleConfirmExpense}
        />
      );
    }
    if (appPage === "catalogo") {
      return (
        <CatalogoPage
          {...sharedPageProps}
          onAddItem={handleAddItem}
          onDeleteItem={handleDeleteItem}
        />
      );
    }

    // "inicio" (default dashboard)
    return <DashboardPage {...sharedPageProps} />;
  };

  return (
    <>
      {renderPage()}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
