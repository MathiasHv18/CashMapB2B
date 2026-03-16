import { IconBolt, IconChart, IconClock } from "./icons";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

function Feature({ icon, title, desc }: FeatureProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-white font-semibold text-sm">{title}</p>
        <p className="text-slate-400 text-sm mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

export default function MarketingPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-center px-16 xl:px-24 w-1/2 relative overflow-hidden">
      {/* Subtle grid texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-md">
        <h1 className="text-white font-extrabold text-4xl xl:text-5xl leading-tight tracking-tight">
          El mapa que le dice a tu negocio si su esfuerzo se tradujo en{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(to right, #a78bfa, #c4b5fd)",
            }}
          >
            dinero real
          </span>
        </h1>

        <p className="mt-6 text-slate-400 text-base leading-relaxed">
          CashMap Business es tu copiloto financiero. Controla tu flujo de caja,
          gestiona efectivo y pagos digitales, y descubre si tu día fue
          realmente rentable.
        </p>

        <div className="mt-10 flex flex-col gap-5">
          <Feature
            icon={<IconClock />}
            title="Control Total"
            desc="Sabe exactamente cuánto dinero tienes y dónde"
          />
          <Feature
            icon={<IconChart />}
            title="Análisis Instantáneo"
            desc="Ve la salud de tu negocio en tiempo real"
          />
          <Feature
            icon={<IconBolt />}
            title="Velocidad"
            desc="Registra ventas en segundos con efectivo, Yape o Plin"
          />
        </div>
      </div>
    </div>
  );
}
