interface ErrorMessageProps {
  error: string | null;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null;

  return (
    <p className="text-red-400 text-xs text-center bg-red-500/10 border border-red-500/20 rounded-xl py-2.5 px-3">
      {error}
    </p>
  );
}
