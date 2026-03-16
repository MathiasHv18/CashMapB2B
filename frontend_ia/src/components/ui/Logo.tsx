// Brand logo — used on Auth screens and the top nav bar.

export default function Logo() {
  return (
    <div className="flex items-center gap-3 justify-center mb-8">
      <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-900/50">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-6 h-6 text-white"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 20l-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1
               1.447-.894L9 7m0 13l6-3m-6-10l6-3m0 16l5.447-2.724A1 1 0 0 0
               21 16.382V5.618a1 1 0 0 0-1.447-.894L15 7m0 13V7"
          />
        </svg>
      </div>

      <div className="text-left">
        <p className="text-white font-bold text-lg leading-none tracking-wide">
          CashMap
        </p>
        <p className="text-violet-400 text-[10px] font-semibold tracking-[0.2em] uppercase">
          Business
        </p>
      </div>
    </div>
  );
}
