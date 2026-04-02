import { useState, useEffect } from "react";
import { getItemsByBusinessId, addItem } from "../api/item";
import { IconBox, IconPlus, IconSearch, IconWrench, IconMoreHorizontal, IconX } from "./icons";

interface ItemData {
  idItem: number;
  name: string;
  description: string;
  sellPrice: number;
  costPrice?: number;
  stock: number;
  isService: boolean;
}

interface Props {
  business: any;
}

export default function Catalogo({ business }: Props) {
  const [items, setItems] = useState<ItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sellPrice: "",
    isService: false,
    costPrice: "",
    stock: "",
  });

  const handleOpenModal = () => {
    setFormData({
      name: "",
      description: "",
      sellPrice: "",
      isService: false,
      costPrice: "",
      stock: "",
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!business) return;

    setIsSubmitting(true);
    try {
      const idToUse = business.idBusiness || business.id;
      const payload: any = {
        idBusiness: idToUse,
        name: formData.name,
        description: formData.description,
        sellPrice: formData.sellPrice,
        isService: formData.isService ? "True" : "False",
      };

      if (!formData.isService) {
        payload.costPrice = formData.costPrice || "0";
        payload.stock = formData.stock || "0";
      }

      const res = await addItem(payload);
      if (res && res.data) {
        setItems((prev) => [...prev, res.data]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating item:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      if (!business) return;
      
      const idToUse = business.idBusiness || business.id;
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
  }, [business?.idBusiness]);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Catalogo</h1>
          <p className="text-sm text-[#888888]">Administra tus productos y servicios</p>
        </div>
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-2 px-4 py-2 bg-[#6328e0] hover:bg-[#5221b5] text-white text-sm font-medium rounded-lg transition-colors"
        >
          <IconPlus />
          Nuevo Item
        </button>
      </div>

      {/* Search */}
      <div className="relative w-full md:w-96">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]">
          <IconSearch />
        </div>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#1a1a1a] border border-[#2A2A2A] text-white rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#6328e0] transition-colors text-sm"
        />
      </div>

      {/* Table */}
      <div className="w-full border border-[#2A2A2A] rounded-xl overflow-hidden bg-[#111111]">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#2A2A2A] text-[#888888] text-sm">
                <th className="font-normal py-4 px-6">Nombre</th>
                <th className="font-normal py-4 px-6">Tipo</th>
                <th className="font-normal py-4 px-6 text-right">Precio Venta</th>
                <th className="font-normal py-4 px-6 text-right">Costo</th>
                <th className="font-normal py-4 px-6 text-right">Stock</th>
                <th className="font-normal py-4 px-4 w-12"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#888888]">
                    Cargando items...
                  </td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#888888]">
                    {search ? "No se encontraron resultados" : "No tienes items configurados"}
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr
                    key={item.idItem}
                    className="border-b border-[#2A2A2A] hover:bg-[#1a1a1a] transition-colors group"
                  >
                    <td className="py-4 px-6 text-white">{item.name}</td>
                    <td className="py-4 px-6">
                      {item.isService ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#3d191d] text-[#f43f5e] text-xs font-medium">
                          <IconWrench />
                          Servicio
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#251547] text-[#a78bfa] text-xs font-medium">
                          <IconBox />
                          Producto
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right text-white">
                      S/ {Number(item.sellPrice).toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-right text-[#888888]">
                      {item.isService ? "-" : (item.costPrice != null ? `S/ ${Number(item.costPrice).toFixed(2)}` : "-")}
                    </td>
                    <td className="py-4 px-6 text-right text-[#888888]">
                      {item.isService ? "N/A" : item.stock}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button className="text-[#888888] hover:text-white transition-colors">
                        <IconMoreHorizontal />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nuevo Item */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2A2A]">
              <h2 className="text-white font-semibold text-lg">Nuevo Item</h2>
              <button
                onClick={handleCloseModal}
                className="text-[#888888] hover:text-white transition-colors"
              >
                <IconX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col p-6 gap-5 overflow-y-auto">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isService: false })}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    !formData.isService
                      ? "border-[#6328e0] bg-[#6328e0]/10 text-white"
                      : "border-[#2A2A2A] text-[#888888] hover:bg-[#1a1a1a]"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <IconBox />
                    Producto
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isService: true })}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    formData.isService
                      ? "border-[#f43f5e] bg-[#f43f5e]/10 text-[#f43f5e]"
                      : "border-[#2A2A2A] text-[#888888] hover:bg-[#1a1a1a]"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <IconWrench />
                    Servicio
                  </div>
                </button>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-[#888888]">Nombre</label>
                <input
                  required
                  type="text"
                  placeholder="Ej: Corte Premium"
                  className="w-full bg-[#1a1a1a] border border-[#2A2A2A] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#6328e0]"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-[#888888]">Descripción</label>
                <textarea
                  required
                  placeholder="Detalles del producto o servicio"
                  className="w-full bg-[#1a1a1a] border border-[#2A2A2A] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#6328e0] resize-none h-20"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-[#888888]">Precio de Venta</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className="w-full bg-[#1a1a1a] border border-[#2A2A2A] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#6328e0]"
                  value={formData.sellPrice}
                  onChange={(e) => setFormData({ ...formData, sellPrice: e.target.value })}
                />
              </div>

              {!formData.isService && (
                <div className="flex gap-4">
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-sm text-[#888888]">Precio de Costo</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      className="w-full bg-[#1a1a1a] border border-[#2A2A2A] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#6328e0]"
                      value={formData.costPrice}
                      onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-sm text-[#888888]">Stock Inicial</label>
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      className="w-full bg-[#1a1a1a] border border-[#2A2A2A] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#6328e0]"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 py-2.5 rounded-lg text-sm font-medium border border-[#2A2A2A] text-white hover:bg-[#1a1a1a] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-[#6328e0] hover:bg-[#5221b5] text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Guardando..." : "Crear Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}