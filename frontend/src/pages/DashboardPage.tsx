import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import NoBusinessConfigured from "../components/NoBusinessConfigured";
import { getBusinesses } from "../api/owner";
import BussinessDashboard from "../components/BusinessDashboard";

export default function DashboardPage() {
  const [hasBusiness, setHasBusiness] = useState(false);
  useEffect(() => {
    const loadBusinessStatus = async () => {
      try {
        const result = await getBusinesses();
        setHasBusiness(result.data.length > 0);
        console.log("Businesses loaded:", result.data);
      } catch (error) {
        console.error("Error loading business status:", error);
      }
    };
    loadBusinessStatus();
    console.log("Business status loaded:", hasBusiness);
  }, []);

  return (
    <div className="flex h-screen w-full bg-[#0F0F0F] text-white font-sans overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-y-auto">
        {hasBusiness ? <BussinessDashboard /> : <NoBusinessConfigured />}
      </main>
    </div>
  );
}
