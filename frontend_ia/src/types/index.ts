// Central TypeScript types shared across the app.
// As the project grows these map 1-to-1 with backend response schemas.

// ── Domain models ──────────────────────────────────────────────────────────────

export type ItemType = "producto" | "servicio";

export interface CatalogItem {
  id: string;
  name: string;
  type: ItemType;
  price: number;
  category: string;
  description?: string;
}

/** Payment methods accepted in the POS and expense forms. */
export type PaymentMethod = "efectivo" | "yape" | "tarjeta";

/** Expense classification tabs. */
export type ExpenseType = "operativo" | "mercaderia";

export interface SaleItem {
  catalogItemId: string;
  name: string;
  price: number;
  qty: number;
}

export interface Sale {
  id: string;
  items: SaleItem[];
  total: number;
  paymentMethod: PaymentMethod;
  /** ISO 8601 string, e.g. new Date().toISOString() */
  date: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  type: ExpenseType;
  paymentMethod: PaymentMethod;
  /** ISO 8601 string */
  date: string;
  notes?: string;
}

// ── Navigation ─────────────────────────────────────────────────────────────────

export type AppPage = "inicio" | "ventas" | "gastos" | "catalogo";

export type RootPage = "login" | "register" | "onboarding" | "app";

// ── App-wide context shapes ────────────────────────────────────────────────────

export interface BusinessProfile {
  name: string;
  category: string;
  email: string;
  foundingYear: number;
  description: string;
}

export interface InitialBalance {
  cash: number;
  digital: number;
}

export interface AppState {
  business?: BusinessProfile;
  initialBalance?: InitialBalance;
  catalog: CatalogItem[];
  sales: Sale[];
  expenses: Expense[];
}

// ── Toast ──────────────────────────────────────────────────────────────────────

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}
