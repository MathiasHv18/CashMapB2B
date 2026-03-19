import { NavLink } from "react-router-dom";
import { IconGrid, IconShoppingCart, IconReceipt, IconBox } from "./icons";

export default function Sidebar() {
  const routes = [
    { path: "/dashboard", name: "Inicio", icon: IconGrid },
    { path: "/ventas", name: "Ventas", icon: IconShoppingCart },
    { path: "/gastos", name: "Gastos", icon: IconReceipt },
    { path: "/catalogo", name: "Catalogo", icon: IconBox },
  ];

  return (
    <div className="w-64 h-screen border-r border-[#2A2A2A] bg-[#111111] flex flex-col pt-6 pb-6 px-4">
      {/* Brand */}
      <div className="flex items-center gap-3 px-2 mb-12">
        <div className="w-8 h-8 bg-[#6328e0] rounded-lg flex items-center justify-center text-white font-bold">
          {/* Un logo placeholder o el componente Logo real */}
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
        {routes.map((route) => (
          <NavLink
            key={route.name}
            to={route.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${
                isActive
                  ? "bg-[#7C3AED] text-white"
                  : "text-[#888888] hover:bg-[#1a1a1a] hover:text-white"
              }`
            }
          >
            <route.icon />
            {route.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
