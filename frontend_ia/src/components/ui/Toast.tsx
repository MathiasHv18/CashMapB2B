// Toast notification overlay — rendered once at the app root, receives messages
// via the ToastMessage[] prop from the useToast hook.

import { useEffect } from "react";
import type { ToastMessage } from "../../types";
import { IconAlertCircle, IconCheckCircle, IconInfo, IconX } from "./icons";

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

const config = {
  success: {
    icon: <IconCheckCircle className="w-5 h-5 text-emerald-400" />,
    bar: "bg-emerald-500",
    bg: "bg-emerald-950/80 border-emerald-800/60",
  },
  error: {
    icon: <IconAlertCircle className="w-5 h-5 text-red-400" />,
    bar: "bg-red-500",
    bg: "bg-red-950/80 border-red-800/60",
  },
  info: {
    icon: <IconInfo className="w-5 h-5 text-violet-400" />,
    bar: "bg-violet-500",
    bg: "bg-violet-950/80 border-violet-800/60",
  },
};

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}) {
  const { icon, bar, bg } = config[toast.type];

  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 3200);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div
      className={`relative flex items-center gap-3 rounded-xl px-4 py-3 border backdrop-blur-md shadow-2xl min-w-65 max-w-sm overflow-hidden ${bg}`}
    >
      {/* accent bar */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${bar}`}
      />
      <div className="ml-1 shrink-0">{icon}</div>
      <p className="text-sm text-white font-medium leading-snug flex-1">
        {toast.message}
      </p>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-white/40 hover:text-white/80 transition-colors ml-1"
      >
        <IconX className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function Toast({ toasts, onDismiss }: ToastProps) {
  if (!toasts.length) return null;

  return (
    <div className="fixed top-5 right-5 z-9999 flex flex-col gap-2">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
