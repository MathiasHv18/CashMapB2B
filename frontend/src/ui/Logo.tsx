import { IconLogo } from "../components/icons";

// Logo de la app. Se usa en LoginForm y RegisterForm.
export default function Logo() {
  return (
    <div className="flex flex-col items-center mb-6">
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
        style={{ background: "linear-gradient(135deg, #7c3aed, #5b21b6)" }}
      >
        <IconLogo />
      </div>
      <p className="text-violet-400 text-xs font-bold tracking-widest uppercase">
        CashMap
      </p>
      <p className="text-slate-500 text-[10px] tracking-widest uppercase">
        Business
      </p>
    </div>
  );
}
