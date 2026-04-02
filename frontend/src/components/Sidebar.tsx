import { IconGrid, IconShoppingCart, IconReceipt, IconBox } from "./icons";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: Props) {
  const Tabs = [
    { id: "dashboard", name: "Dashboard", icon: IconGrid },
    { id: "ventas", name: "Ventas", icon: IconShoppingCart },
    { id: "gastos", name: "Gastos", icon: IconReceipt },
    { id: "catalogo", name: "Catálogo", icon: IconBox },
  ];

  return (
    <div className="w-64 h-screen border-r border-[#2A2A2A] bg-[#111111] flex flex-col pt-6 pb-6 px-4">
      <div className="flex items-center gap-3 px-2 mb-12">
        <div className="w-8 h-8 bg-[#6328e0] rounded-lg flex items-center justify-center text-white font-bold">
          BM
        </div>
        <div className="flex flex-col">
          <span className="text-white font-semibold text-lg leading-tight">
            CashMap
          </span>
          <span className="text-[#888888] text-xs font-medium tracking-widest">
            BUSINESS
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col flex-1 gap-2">
        {Tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${
              activeTab === tab.id
                ? "bg-[#6328e0] text-white"
                : "text-[#888888] hover:bg-[#1a1a1a] hover:text-white"
            }`}
          >
            <tab.icon />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
