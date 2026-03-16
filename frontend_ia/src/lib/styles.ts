// Shared CSS-in-JS helpers — single source of truth for dark input styling.

import type React from "react";

export const inputBase: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
};

export const inputFocused: React.CSSProperties = {
  border: "1px solid rgba(139,92,246,0.7)",
};

export const inputBlurred: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.08)",
};

export const cardGlass: React.CSSProperties = {
  background:
    "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(20px)",
  boxShadow:
    "0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
};
