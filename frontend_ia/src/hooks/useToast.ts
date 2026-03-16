// useToast — lightweight hook that manages toast state.
// Import this once at the root and pass the handlers down (or use context).

import { useState, useCallback } from "react";
import type { ToastMessage, ToastType } from "../types";

let _idCounter = 0;

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback(
    (message: string, type: ToastType = "success") => {
      const id = `toast-${++_idCounter}`;
      setToasts((prev) => [...prev, { id, message, type }]);
    },
    [],
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, showToast, dismissToast };
}
