// A single marketing-feature row shown on the left panel of the Auth screen.

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export default function Feature({ icon, title, desc }: FeatureProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="shrink-0 w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-violet-300">
        {icon}
      </div>
      <div>
        <p className="text-white font-semibold text-sm">{title}</p>
        <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
