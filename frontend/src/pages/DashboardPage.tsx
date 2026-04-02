import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import NoBusinessConfigured from "../components/NoBusinessConfigured";
import { getBusinesses } from "../api/owner";
import BussinessDashboard from "../components/BusinessDashboard";
import Catalogo from "../components/Catalogo";
import NuevaVenta from "../components/NuevaVenta";
import Header from "../ui/Header";

export default function DashboardPage() {
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hasBusiness, setHasBusiness] = useState(false);

  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const loadBusinessStatus = async () => {
      try {
        const result = await getBusinesses();
        if (result && result.data.length > 0) {
          setHasBusiness(true);
          setBusiness(result.data[0]);
        }
        console.log("Businesses loaded:", result);
      } catch (error) {
        console.error("Error loading business status:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBusinessStatus();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <BussinessDashboard business={business} />;
      case "catalogo":
        return <Catalogo business={business} />;
      case "nueva_venta":
        return (
          <NuevaVenta
            business={business}
            onBack={() => setActiveTab("dashboard")}
          />
        );
      case "ventas":
        return <div className="p-6">Módulo de Ventas (Próximamente)</div>;
      case "gastos":
        return <div className="p-6">Módulo de Gastos (Próximamente)</div>;
      default:
        return <BussinessDashboard business={business} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#0F0F0F] text-white font-sans overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 flex flex-col overflow-y-auto relative">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            Cargando...
          </div>
        ) : hasBusiness ? (
          <>
            {activeTab !== "nueva_venta" && (
              <div className="p-8 pb-0 max-w-7xl mx-auto w-full">
                <Header
                  businessName={business.name}
                  onRegistrarVenta={() => setActiveTab("nueva_venta")}
                />
              </div>
            )}
            <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
              {renderContent()}
            </div>
          </>
        ) : (
          <NoBusinessConfigured />
        )}
      </main>
    </div>
  );
}
