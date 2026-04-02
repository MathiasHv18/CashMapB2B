import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { IconCash, IconPhone, IconTrendingUp } from "./icons";

// Datos de prueba para el gráfico de líneas (Últimos 7 días)
const lineData = [
  { name: "Lun", ventas: 450, gastos: 100 },
  { name: "Mar", ventas: 300, gastos: 80 },
  { name: "Mie", ventas: 600, gastos: 200 },
  { name: "Jue", ventas: 400, gastos: 150 },
  { name: "Vie", ventas: 650, gastos: 190 },
  { name: "Sab", ventas: 800, gastos: 250 },
  { name: "Hoy", ventas: 300, gastos: 100 },
];

const pieData = [
  { name: "Efectivo", value: 1250, color: "#2ECA69" },
  { name: "Yape/Plin", value: 890, color: "#7F30FA" },
  { name: "Tarjeta", value: 320, color: "#922340" },
];

export default function BusinessDashboard({ business }: { business: any }) {
  if (!business) return null;

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Caja Física */}
        <div className="bg-[#18181B] rounded-xl p-6 flex flex-col justify-between h-32 border border-[#27272A]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Caja Física</p>
              <p className="text-xs text-gray-500 mt-1">Efectivo</p>
            </div>
            <div className="bg-[#2ECA69]/10 p-2 rounded-lg text-[#2ECA69]">
              <IconCash />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white">
            S/ {Number(business.cashBalance).toFixed(2)}
          </h2>
        </div>

        {/* Caja Digital */}
        <div className="bg-[#18181B] rounded-xl p-6 flex flex-col justify-between h-32 border border-[#27272A] relative overflow-hidden">
          {/* Subtle purple gradient effect background */}
          <div className="absolute inset-0 bg-linear-to-br from-[#7F30FA]/5 to-transparent pointer-events-none" />
          <div className="relative flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Caja Digital</p>
              <p className="text-xs text-gray-500 mt-1">Yape, Plin, Tarjetas</p>
            </div>
            <div className="bg-[#7F30FA]/10 p-2 rounded-lg text-[#7F30FA]">
              <IconPhone />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white relative">
            S/ {Number(business.digitalBalance).toFixed(2)}
          </h2>
        </div>

        {/* Utilidad de Hoy */}
        <div className="bg-[#18181B] rounded-xl p-6 flex flex-col justify-between h-32 border border-[#27272A]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Utilidad de Hoy</p>
              <p className="text-xs text-gray-500 mt-1">Ventas - Gastos</p>
            </div>
            <div className="bg-[#2ECA69]/10 p-2 rounded-lg text-[#2ECA69]">
              <IconTrendingUp />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white">S/ 345.75</h2>
        </div>
      </div>

      {/* GRÁFICOS */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Line Chart */}
        <div className="lg:col-span-3 bg-[#18181B] border border-[#27272A] rounded-xl p-6 h-[400px] flex flex-col">
          <h3 className="text-sm font-semibold text-white mb-6">
            Ventas vs Gastos - Ultimos 7 dias
          </h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={lineData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#27272A"
                />
                <XAxis
                  dataKey="name"
                  stroke="#52525B"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="#52525B"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `S/${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181B",
                    borderColor: "#27272A",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ fontSize: "14px" }}
                />
                <Line
                  type="monotone"
                  dataKey="ventas"
                  name="Ventas"
                  stroke="#7F30FA"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6, fill: "#7F30FA" }}
                />
                <Line
                  type="monotone"
                  dataKey="gastos"
                  name="Gastos"
                  stroke="#922340"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6, fill: "#922340" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#7F30FA]" />
              <span className="text-xs text-gray-400">Ventas</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#922340]" />
              <span className="text-xs text-gray-400">Gastos</span>
            </div>
          </div>
        </div>

        {/* Pie/Donut Chart */}
        <div className="lg:col-span-2 bg-[#18181B] border border-[#27272A] rounded-xl p-6 h-[400px] flex flex-col">
          <h3 className="text-sm font-semibold text-white mb-2">
            Ventas por Metodo de Pago
          </h3>
          <div className="flex-1 min-h-0 relative -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181B",
                    borderColor: "#27272A",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ fontSize: "14px" }}
                  formatter={(value: any) => `S/ ${value}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3 mt-2 pr-4 pl-4">
            {pieData.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-400">{item.name}</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-medium text-white">
                    S/ {item.value}
                  </span>
                  <span className="text-gray-500 w-8 text-right">
                    {Math.round((item.value / 2460) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
