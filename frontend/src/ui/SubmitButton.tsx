interface Props {
  loading: boolean;
  label: string;
  loadingLabel: string;
}

// Botón de envío con gradiente violeta y efecto hover.
export default function SubmitButton({ loading, label, loadingLabel }: Props) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="mt-2 w-full py-3.5 rounded-xl text-white font-semibold text-sm tracking-wide transition-all active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      style={{
        background:
          "linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%)",
        boxShadow: "0 4px 24px rgba(109,40,217,0.45)",
      }}
      onMouseEnter={(e) =>
        !loading &&
        (e.currentTarget.style.boxShadow = "0 6px 32px rgba(109,40,217,0.65)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "0 4px 24px rgba(109,40,217,0.45)")
      }
    >
      {loading ? loadingLabel : label}
    </button>
  );
}
