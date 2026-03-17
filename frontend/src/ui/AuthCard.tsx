export default function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full max-w-md rounded-3xl p-8 lg:p-10"
      style={{
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        boxShadow:
          "0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {children}
    </div>
  );
}
