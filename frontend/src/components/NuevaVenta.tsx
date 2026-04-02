import { useState, useEffect } from "react";
import { getItemsByBusinessId } from "../api/item";
import { registerSale } from "../api/transaction";
import {
  IconArrowLeft,
  IconSearch,
  IconShoppingCart,
  IconBanknote,
  IconPhone,
  IconWallet,
  IconX,
} from "./icons";

interface ItemData {
  idItem: number;
  name: string;
  description: string;
  sellPrice: number;
  stock: number;
  isService: boolean;
}

interface CartItem extends ItemData {
  quantity: number;
  cartId: string;
  customPrice: number;
}

interface Props {
  business: any;
  onBack: () => void;
}

export default function NuevaVenta({ business, onBack }: Props) {
  const [items, setItems] = useState<ItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const idToUse = business?.idBusiness || business?.id;
      if (!idToUse) return;

      try {
        setLoading(true);
        const result = await getItemsByBusinessId(idToUse);
        setItems(result.data || []);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [business]);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

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
          customPrice: item.sellPrice,
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

  const removeItem = (idItem: number) => {
    setCart((prev) => prev.filter((c) => c.idItem !== idItem));
  };

  const handleCustomPriceChange = (idItem: number, newPrice: string) => {
    const numeric = parseFloat(newPrice);
    setCart((prev) =>
      prev.map((c) =>
        c.idItem === idItem
          ? { ...c, customPrice: isNaN(numeric) ? 0 : numeric }
          : c,
      ),
    );
  };

  const total = cart.reduce((acc, c) => acc + c.customPrice * c.quantity, 0);

  const handleConfirmSale = async () => {
    if (cart.length === 0 || !business) return;

    try {
      setIsSubmitting(true);
      const idToUse = business.idBusiness || business.id;

      const descriptionParts = cart.map((c) => `${c.quantity} ${c.name}`);
      const descriptionText = `Venta de ${descriptionParts.join(" y ")}`;

      const payload = {
        idBusiness: idToUse,
        idPaymentMethod: paymentMethod,
        description: descriptionText,
        items: cart.map((c) => ({
          idItem: c.idItem,
          quantity: c.quantity,
          unitPrice: c.customPrice,
        })),
      };

      await registerSale(payload);

      // Resetea carrito y muestra algo
      alert("¡Venta registrada exitosamente!");
      setCart([]);
      onBack();
    } catch (error) {
      console.error("Error al registrar venta:", error);
      alert("Hubo un problema al registrar la venta");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex gap-8">
      {/* Left Area: Header + Search + Grid */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#1a1a1a] text-[#888888] hover:text-white transition-colors"
          >
            <IconArrowLeft />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Nueva Venta</h1>
            <p className="text-sm text-[#888888]">Punto de venta rapido</p>
          </div>
        </div>

        <div className="relative w-full">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]">
            <IconSearch />
          </div>
          <input
            type="text"
            placeholder="Buscar producto o servicio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#2A2A2A] text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-[#6328e0] transition-colors text-sm"
          />
        </div>

        {/* Grid de productos */}
        {loading ? (
          <div className="py-12 text-center text-[#888888]">Cargando...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-12">
            {filteredItems.map((item) => (
              <button
                key={item.idItem}
                onClick={() => addToCart(item)}
                className="bg-[#111111] border border-[#2A2A2A] hover:border-[#6328e0] rounded-xl p-4 text-left transition-all group flex flex-col justify-between min-h-[100px]"
              >
                <div className="text-sm text-white font-medium mb-2">
                  {item.name}
                </div>
                <div>
                  <div className="text-[#6328e0] font-semibold text-lg mb-1">
                    S/ {Number(item.sellPrice).toFixed(2)}
                  </div>
                  <div className="text-xs text-[#888888]">
                    Stock: {item.isService ? "N/A" : item.stock}
                  </div>
                </div>
              </button>
            ))}
            {filteredItems.length === 0 && (
              <div className="col-span-full py-12 text-center text-[#888888]">
                No se encontraron productos o servicios
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Area: Cart */}
      <div className="w-96 flex-shrink-0 bg-[#111111] border border-[#2A2A2A] rounded-2xl flex flex-col h-[calc(100vh-8rem)] sticky top-8">
        <div className="p-5 border-b border-[#2A2A2A] flex justify-between items-center">
          <div className="flex items-center gap-2 text-white font-semibold">
            <IconShoppingCart />
            Carrito
          </div>
          {cart.length > 0 && (
            <span className="text-xs font-medium text-[#888888]">
              {cart.length} items
            </span>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-[#888888] gap-4">
              <div className="w-16 h-16 rounded-full bg-[#1a1a1a] flex items-center justify-center opacity-50">
                <div className="scale-150">
                  <IconShoppingCart />
                </div>
              </div>
              <div className="text-center">
                <div className="text-white font-medium mb-1">Carrito vacio</div>
                <div className="text-sm">Selecciona items para agregar</div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div
                  key={item.cartId}
                  className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-4 flex items-center gap-3 transition-colors hover:border-[#6328e0]/50"
                >
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="text-white font-medium text-sm line-clamp-1 mb-1">
                      {item.name}
                    </div>
                    <div className="flex items-center text-xs text-[#888888] gap-1">
                      <span>S/</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={item.customPrice === 0 ? "" : item.customPrice}
                        onChange={(e) =>
                          handleCustomPriceChange(item.idItem, e.target.value)
                        }
                        className="bg-transparent text-[#888888] focus:text-white w-14 focus:outline-none border-b border-transparent focus:border-[#6328e0] transition-colors"
                        title="Modificar precio unitario"
                      />
                      <span>x {item.quantity}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.idItem, -1)}
                        className="w-6 h-6 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#888888] hover:text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="w-4 text-center text-sm font-medium text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.idItem, 1)}
                        className="w-6 h-6 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#888888] hover:text-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.idItem)}
                      className="text-[#888888] hover:text-[#f43f5e] transition-colors"
                    >
                      <IconX />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer sticky */}
        <div className="p-5 border-t border-[#2A2A2A] bg-[#111111] rounded-b-2xl">
          <div className="flex justify-between flex-wrap gap-2 items-center mb-6">
            <span className="text-[#888888] text-sm">Total a cobrar</span>
            <span className="text-3xl font-bold text-white">
              S/ {total.toFixed(2)}
            </span>
          </div>

          <div className="mb-6">
            <div className="text-xs text-[#888888] mb-3">Metodo de pago</div>
            <div className="flex gap-2">
              <button
                onClick={() => setPaymentMethod(1)}
                className={`flex-1 py-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-colors ${
                  paymentMethod === 1
                    ? "bg-[#6328e0] border-[#6328e0] text-white"
                    : "bg-[#1a1a1a] border-[#2a2a2a] text-[#888888] hover:border-[#888888]"
                }`}
              >
                <IconBanknote />
                <span className="text-xs font-medium">Efectivo</span>
              </button>
              <button
                onClick={() => setPaymentMethod(2)}
                className={`flex-1 py-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-colors ${
                  paymentMethod === 2
                    ? "bg-[#6328e0] border-[#6328e0] text-white"
                    : "bg-[#1a1a1a] border-[#2a2a2a] text-[#888888] hover:border-[#888888]"
                }`}
              >
                <IconPhone />
                <span className="text-xs font-medium">Yape/Plin</span>
              </button>
              <button
                onClick={() => setPaymentMethod(3)}
                className={`flex-1 py-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-colors ${
                  paymentMethod === 3
                    ? "bg-[#6328e0] border-[#6328e0] text-white"
                    : "bg-[#1a1a1a] border-[#2a2a2a] text-[#888888] hover:border-[#888888]"
                }`}
              >
                <IconWallet />
                <span className="text-xs font-medium">Tarjeta</span>
              </button>
            </div>
          </div>

          <button
            onClick={handleConfirmSale}
            disabled={cart.length === 0 || isSubmitting}
            className="w-full py-4 bg-[#6328e0] hover:bg-[#5221b5] text-white font-semibold rounded-xl transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Registrando..." : "Confirmar Venta"}
          </button>
        </div>
      </div>
    </div>
  );
}
