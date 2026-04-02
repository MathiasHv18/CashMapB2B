import { IconShoppingCart, IconReceipt } from "../components/icons";

interface HeaderProps {
  businessName: string;
  onRegistrarVenta?: () => void;
}

export default function Header({
  businessName,
  onRegistrarVenta,
}: HeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-white">{businessName}</h1>
        <p className="text-lg text-gray-400">
          {new Date().toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="flex gap-4">
        <button
          onClick={onRegistrarVenta}
          className="flex gap-2 items-center px-4 py-2 bg-[#7F30FA] hover:bg-[#6c28d9] text-white text-sm font-medium rounded-md transition-colors"
        >
          <IconShoppingCart />
          Registrar Venta
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-[#922340] text-[#922340] hover:bg-[#922340]/10 text-sm font-medium rounded-md transition-colors">
          <IconReceipt />
          Registrar Gasto
        </button>
      </div>
    </div>
  );
}
