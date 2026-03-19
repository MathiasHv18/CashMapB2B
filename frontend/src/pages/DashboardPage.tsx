import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import NoBusinessConfigured from "../components/NoBusinessConfigured";
import { getBusinesses } from "../api/owner";
import BussinessDashboard from "../components/BusinessDashboard";

export default function DashboardPage() {
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hasBusiness, setHasBusiness] = useState(false);

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

  return (
    <div className="flex h-screen w-full bg-[#0F0F0F] text-white font-sans overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-y-auto">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            Cargando...
          </div>
        ) : hasBusiness ? (
          <BussinessDashboard business={business} />
        ) : (
          <NoBusinessConfigured />
        )}
      </main>
    </div>
  );
}
