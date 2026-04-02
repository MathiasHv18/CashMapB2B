import { useState, useEffect } from "react";
import { getItemsByBusinessId } from "../api/item";
import { registerExpense } from "../api/transaction";
import {
  IconArrowLeft,
  IconReceipt,
  IconBox,
  IconBanknote,
  IconPhone,
  IconSearch,
  IconX,
} from "./icons";

interface ItemData {
  idItem: number;
  name: string;
  description: string;
  sellPrice: number;
  costPrice?: number;
  stock: number;
  isService: boolean;
}

interface CartItem extends ItemData {
  quantity: number;
  cartId: string;
  customCostPrice: number;
}

interface Props {
  business: any;
  onBack: () => void;
}

export default function RegistrarGasto({ business, onBack }: Props) {
  const [tab, setTab] = useState<"operativo" | "mercaderia">("operativo");

  // Estado para Operativo
  const [opAmount, setOpAmount] = useState("");
  const [opDescription, setOpDescription] = useState("");

  // Estado para Mercadería
  const [items, setItems] = useState<ItemData[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);

  // Estado Compartido
  const [paymentMethod, setPaymentMethod] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const idToUse = business?.idBusiness || business?.id;
      if (!idToUse || tab !== "mercaderia") return;

      try {
        setLoading(true);
        const result = await getItemsByBusinessId(idToUse);
        // Filtrar para mostrar solo los que NO son servicios (mercadería)
        const productsOnly = (result.data || []).filter(
          (item: ItemData) => !item.isService,
        );
        setItems(productsOnly);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [business, tab]);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  // Funciones de Carrito
  const addToCart = (item: ItemData) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.idItem === item.idItem);
      if (existing) {
        return prev.map((c) =>
          c.idItem === item.idItem ? { ...c, quantity: c.quantity + 1 } : c,
        );
      }
      return [
        ...prev,
        {
          ...item,
          cartId: Date.now().toString() + Math.random().toString(),
          quantity: 1,
          customCostPrice: item.costPrice || 0,
        },
      ];
    });
  };

  const updateQuantity = (idItem: number, delta: number) => {
    setCart((prev) =>
      prev.map((c) => {
        if (c.idItem === idItem) {
          const newQ = c.quantity + delta;
          return newQ > 0 ? { ...c, quantity: newQ } : c;
        }
        return c;
      }),
    );
  };

  const handleCostPriceChange = (idItem: number, newPrice: string) => {
    const numeric = parseFloat(newPrice);
    setCart((prev) =>
      prev.map((c) =>
        c.idItem === idItem
          ? { ...c, customCostPrice: isNaN(numeric) ? 0 : numeric }
          : c,
      ),
    );
  };

  const removeItem = (idItem: number) => {
    setCart((prev) => prev.filter((c) => c.idItem !== idItem));
  };

  const totalMercaderia = cart.reduce(
    (acc, c) => acc + c.customCostPrice * c.quantity,
    0,
  );

  // Submit General
  const handleConfirmGasto = async () => {
    if (!business) return;

    const idToUse = business.idBusiness || business.id;
    let payload: any = {
      idBusiness: idToUse,
      idPaymentMethod: paymentMethod,
    };

    if (tab === "operativo") {
      const amountParsed = parseFloat(opAmount);
      if (isNaN(amountParsed) || amountParsed <= 0) {
        alert("Por favor ingrese un monto valido");
        return;
      }
      if (!opDescription.trim()) {
        alert("Por favor ingrese una descripcion");
        return;
      }
      payload = {
        ...payload,
        amount: amountParsed,
        description: opDescription,
        isStockPurchase: false,
        items: [],
      };
    } else {
      if (cart.length === 0) return;
      const descParts = cart.map((c) => `${c.quantity} ${c.name}`);
      payload = {
        ...payload,
        amount: totalMercaderia,
        description: `Compra de mercadería (${descParts.join(" y ")})`,
        isStockPurchase: true,
        items: cart.map((c) => ({
          idItem: c.idItem,
          quantity: c.quantity,
          unitPrice: c.customCostPrice,
        })),
      };
    }

    try {
      setIsSubmitting(true);
      await registerExpense(payload);
      alert("¡Gasto registrado exitosamente!");
      onBack();
    } catch (error) {
      console.error("Error al registrar gasto:", error);
      alert("Hubo un problema al registrar el gasto");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 pb-20">
      {/* Top Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#1a1a1a] text-[#888888] hover:text-white transition-colors"
        >
          <IconArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Registrar Gasto
          </h1>
          <p className="text-sm text-[#888888]">Registra salidas de dinero</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl flex overflow-hidden">
        <button
          onClick={() => setTab("operativo")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
            tab === "operativo"
              ? "bg-[#1a1a1a] text-white"
              : "text-[#888888] hover:text-white hover:bg-[#1a1a1a]/50"
          }`}
        >
          <IconReceipt />
          Gasto Operativo
        </button>
        <button
          onClick={() => setTab("mercaderia")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors border-l border-[#2A2A2A] ${
            tab === "mercaderia"
              ? "bg-[#1a1a1a] text-white"
              : "text-[#888888] hover:text-white hover:bg-[#1a1a1a]/50"
          }`}
        >
          <IconBox />
          Compra Mercaderia
        </button>
      </div>

      {/* Card Content */}
      <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6">
        {tab === "operativo" ? (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">
                Gasto Operativo
              </h2>
              <p className="text-sm text-[#888888]">
                Luz, agua, alquiler, suministros y otros gastos del negocio.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#888888]">Monto</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888888]">
                  S/
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className="w-full bg-[#1a1a1a] border border-[#2A2A2A] text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-[#922340] transition-colors"
                  value={opAmount}
                  onChange={(e) => setOpAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#888888]">Descripcion</label>
              <input
                type="text"
                placeholder="Ej: Pago de luz del mes de marzo"
                className="w-full bg-[#1a1a1a] border border-[#2A2A2A] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#922340] transition-colors"
                value={opDescription}
                onChange={(e) => setOpDescription(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">
                Compra de Mercaderia
              </h2>
              <p className="text-sm text-[#888888]">
                Registra compras y actualiza el stock automaticamente.
              </p>
            </div>

            <div className="relative w-full">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]">
                <IconSearch />
              </div>
              <input
                type="text"
                placeholder="Buscar producto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#2A2A2A] text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-[#922340] transition-colors text-sm"
              />
            </div>

            {loading ? (
              <div className="py-8 text-center text-[#888888]">Cargando...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-60 overflow-y-auto pr-2">
                {filteredItems.map((item) => (
                  <button
                    key={item.idItem}
                    onClick={() => addToCart(item)}
                    className="bg-[#1a1a1a] border border-[#2A2A2A] hover:border-[#922340] rounded-xl p-4 text-left transition-all group"
                  >
                    <div className="text-sm text-white font-medium mb-1 line-clamp-1">
                      {item.name}
                    </div>
                    <div className="text-[#888888] text-xs">
                      Costo: S/{" "}
                      {item.costPrice
                        ? Number(item.costPrice).toFixed(2)
                        : "0.00"}
                    </div>
                  </button>
                ))}
                {filteredItems.length === 0 && (
                  <div className="col-span-full py-8 text-center text-[#888888]">
                    No se encontraron productos
                  </div>
                )}
              </div>
            )}

            {/* Carrito de Compras de Mercaderia */}
            {cart.length > 0 && (
              <div className="mt-4 border-t border-[#2A2A2A] pt-6 flex flex-col gap-4">
                <h3 className="text-white font-semibold text-sm">
                  Resumen de Compra
                </h3>
                <div className="flex flex-col gap-3">
                  {cart.map((c) => (
                    <div
                      key={c.cartId}
                      className="bg-[#1a1a1a] border border-[#2A2A2A] rounded-xl p-3 flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 flex flex-col min-w-0">
                        <span className="text-white text-sm font-medium line-clamp-1">
                          {c.name}
                        </span>
                        <div className="flex items-center text-xs text-[#888888] gap-1 mt-1">
                          <span>Costo U. S/</span>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={
                              c.customCostPrice === 0 ? "" : c.customCostPrice
                            }
                            onChange={(e) =>
                              handleCostPriceChange(c.idItem, e.target.value)
                            }
                            className="bg-transparent text-[#888888] focus:text-white w-14 focus:outline-none border-b border-transparent focus:border-[#922340] transition-colors"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-[#111111] border border-[#2A2A2A] rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(c.idItem, -1)}
                            className="w-6 h-6 flex items-center justify-center text-[#888888] hover:text-white"
                          >
                            -
                          </button>
                          <span className="w-5 text-center text-sm font-medium text-white">
                            {c.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(c.idItem, 1)}
                            className="w-6 h-6 flex items-center justify-center text-[#888888] hover:text-white"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(c.idItem)}
                          className="text-[#888888] hover:text-[#f43f5e] transition-colors"
                        >
                          <IconX />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-2 px-1">
                  <span className="text-[#888888] text-sm">Total Compra:</span>
                  <span className="text-xl font-bold text-white">
                    S/ {totalMercaderia.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Seccion Compartida abajo: Metodo de pago y Boton */}
        <div className="mt-8 pt-8 border-t border-[#2A2A2A] flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#888888]">Metodo de pago</label>
            <div className="flex gap-4">
              <button
                onClick={() => setPaymentMethod(1)}
                className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 transition-colors ${
                  paymentMethod === 1
                    ? "bg-[#1a1a1a] border-[#888888] text-white label-selected"
                    : "bg-[#1a1a1a] border-[#2a2a2a] text-[#888888] hover:border-[#888888]"
                }`}
              >
                <IconBanknote />
                <span className="text-sm font-medium">Efectivo</span>
              </button>
              <button
                onClick={() => setPaymentMethod(2)}
                className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 transition-colors ${
                  paymentMethod === 2
                    ? "bg-[#1a1a1a] border-[#888888] text-white label-selected"
                    : "bg-[#1a1a1a] border-[#2a2a2a] text-[#888888] hover:border-[#888888]"
                }`}
              >
                <IconPhone />
                <span className="text-sm font-medium">Digital</span>
              </button>
            </div>
          </div>

          <button
            onClick={handleConfirmGasto}
            disabled={
              isSubmitting ||
              (tab === "operativo" && (!opAmount || !opDescription)) ||
              (tab === "mercaderia" && cart.length === 0)
            }
            className="w-full py-4 bg-[#7a1c27] hover:bg-[#922340] text-white font-semibold rounded-xl transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isSubmitting ? "Registrando..." : "Registrar Gasto"}
          </button>
        </div>
      </div>
    </div>
  );
}
