// Demo data used during development. Replace calls here with real API calls.
// All IDs are stable strings so the UI doesn't flicker on re-renders.

import type { CatalogItem, Sale, Expense } from "../types";

export const DEMO_CATALOG: CatalogItem[] = [
  {
    id: "c1",
    name: "Coca Cola 500ml",
    type: "producto",
    price: 3.5,
    category: "Bebidas",
  },
  {
    id: "c2",
    name: "Galletas Maria",
    type: "producto",
    price: 1.5,
    category: "Snacks",
  },
  {
    id: "c3",
    name: "Corte de Cabello",
    type: "servicio",
    price: 15.0,
    category: "Servicios",
  },
  {
    id: "c4",
    name: "Pan Frances (unidad)",
    type: "producto",
    price: 0.3,
    category: "Panadería",
  },
  {
    id: "c5",
    name: "Afeitada Completa",
    type: "servicio",
    price: 10.0,
    category: "Servicios",
  },
  {
    id: "c6",
    name: "Inca Kola 500ml",
    type: "producto",
    price: 3.5,
    category: "Bebidas",
  },
  {
    id: "c7",
    name: "Cigarros Hamilton",
    type: "producto",
    price: 2.0,
    category: "Tabaco",
  },
  {
    id: "c8",
    name: "Tinte de Cabello",
    type: "servicio",
    price: 25.0,
    category: "Servicios",
  },
];

const today = new Date();
const iso = (hours: number) =>
  new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    hours,
  ).toISOString();

export const DEMO_SALES: Sale[] = [
  {
    id: "s1",
    items: [
      { catalogItemId: "c1", name: "Coca Cola 500ml", price: 3.5, qty: 1 },
      { catalogItemId: "c2", name: "Galletas Maria", price: 1.5, qty: 1 },
    ],
    total: 5.0,
    paymentMethod: "efectivo",
    date: iso(17),
  },
  {
    id: "s2",
    items: [
      { catalogItemId: "c3", name: "Corte de Cabello", price: 15.0, qty: 1 },
    ],
    total: 15.0,
    paymentMethod: "yape",
    date: iso(15),
  },
  {
    id: "s3",
    items: [
      { catalogItemId: "c4", name: "Pan Frances (unidad)", price: 0.3, qty: 3 },
    ],
    total: 0.9,
    paymentMethod: "efectivo",
    date: iso(12),
  },
];

export const DEMO_EXPENSES: Expense[] = [
  {
    id: "e1",
    description: "Pago de luz - Marzo",
    amount: 120.5,
    type: "operativo",
    paymentMethod: "yape",
    date: iso(16),
  },
  {
    id: "e2",
    description: "Reposición de gaseosas",
    amount: 85.0,
    type: "mercaderia",
    paymentMethod: "efectivo",
    date: iso(13),
  },
  {
    id: "e3",
    description: "Bolsas plásticas",
    amount: 15.0,
    type: "operativo",
    paymentMethod: "efectivo",
    date: iso(9),
  },
];

export const BUSINESS_CATEGORIES = [
  "Bodega / Minimarket",
  "Barbería / Salón",
  "Cafetería / Restaurant",
  "Farmacia / Botica",
  "Ferretería",
  "Librería / Papelería",
  "Otro",
] as const;
