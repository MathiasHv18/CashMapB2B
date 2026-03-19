import { useNavigate } from "react-router-dom";
import { IconBuilding, IconSparkles, IconArrowRight } from "./icons";


export default function NoBusinessConfigured() {
  const navigate = useNavigate();
  let dateTime = new Date()


  return (
    <div className="flex-1 h-screen bg-[#111111] text-white flex flex-col">
      {/* Header Info (Sin negocio configurado) */}
      <div className="px-10 py-8 border-b border-[#2A2A2A] flex justify-between items-center bg-[#111111]">
        <div>
          <h1 className="text-xl font-semibold mb-1">
            Sin negocio configurado
          </h1>
          <p className="text-[#888888] text-sm">
            {String(dateTime)}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#0F0F0F]">
        <div className="max-w-xl w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#2D1B69] rounded-2xl flex items-center justify-center mb-6 text-[#A78BFA]">
            <IconBuilding />
          </div>

          <h2 className="text-2xl font-semibold mb-4">Configura tu negocio</h2>

          <p className="text-[#A1A1AA] mb-10 leading-relaxed max-w-md">
            Para comenzar a usar CashMap, necesitas configurar la informacion de
            tu negocio y establecer tu balance inicial. Solo te tomara un par de
            minutos.
          </p>

          <div className="flex flex-col gap-4 w-full max-w-sm mb-10 text-left">
            <div className="flex items-center gap-4 text-[#E4E4E7]">
              <div className="w-8 h-8 rounded-full bg-[#2D1B69] text-[#A78BFA] flex items-center justify-center shrink-0">
                <IconSparkles />
              </div>
              <span>Controla tu flujo de caja diario</span>
            </div>
            <div className="flex items-center gap-4 text-[#E4E4E7]">
              <div className="w-8 h-8 rounded-full bg-[#2D1B69] text-[#A78BFA] flex items-center justify-center shrink-0">
                <IconSparkles />
              </div>
              <span>Registra ventas y gastos facilmente</span>
            </div>
            <div className="flex items-center gap-4 text-[#E4E4E7]">
              <div className="w-8 h-8 rounded-full bg-[#2D1B69] text-[#A78BFA] flex items-center justify-center shrink-0">
                <IconSparkles />
              </div>
              <span>Visualiza tus ganancias en tiempo real</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/onboarding")}
            className="w-full max-w-sm bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
          >
            Configurar mi negocio
            <IconArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
