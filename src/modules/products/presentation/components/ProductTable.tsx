"use client";
import React, { useState } from "react";
import { useProduct } from "../hooks/useProduct";
import {
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Eye,
} from "lucide-react";
import Button from "@/shared/components/custom-ui/button";
import ProductDetailModal from "./ProductDetail";

const ProductTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );

  const { getProducts } = useProduct();
  const { data: response, isLoading, error } = getProducts(page, limit);

  const products = response?.data || [];
  const pagination = response?.pagination || {
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  };

  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, pagination.total);

  const handleOpenDetail = (id: string) => {
    setSelectedProductId(id);
    setIsDetailOpen(true);
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-sm text-gray-500">
        Cargando productos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-sm text-red-500">
        Error al cargar los productos.
      </div>
    );
  }

  return (
    <>
      <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-10">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            {/* ... THEAD ... */}
            <thead className="text-xs text-gray-500 bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider">
                  Marca
                </th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No hay productos registrados.
                  </td>
                </tr>
              ) : (
                products.map((product: any) => {
                  const totalStock =
                    product.variants?.reduce(
                      (acc: number, variant: any) =>
                        acc + (variant.stockQty || 0),
                      0,
                    ) || 0;

                  const mainImage = product.images?.[0]?.imageUrl;

                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {mainImage ? (
                            <img
                              src={mainImage}
                              alt={product.name}
                              className="size-10 rounded-md object-cover border border-gray-200"
                            />
                          ) : (
                            <div className="size-10 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                              <ImageIcon size={20} />
                            </div>
                          )}
                          <span className="font-medium text-gray-900 capitalize">
                            {product.name.toLowerCase()}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {product.brand?.name || "Sin marca"}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {product.category?.name || "Sin categoría"}
                      </td>

                      <td className="px-6 py-4 font-medium">
                        {totalStock === 0 ? (
                          <span className="text-red-500">Sin Stock</span>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <span className="text-gray-900">{totalStock}</span>
                            {totalStock <= 10 && (
                              <span className="text-yellow-600 text-xs">
                                Poco Stock
                              </span>
                            )}
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4 text-gray-600 font-medium">
                        S/. {product.basePrice}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                            product.isActive
                              ? "bg-green-100/50 text-green-700"
                              : "bg-red-100/50 text-red-700"
                          }`}
                        >
                          {product.isActive ? "Activo" : "Inactivo"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-3">
                          <Button
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                            title="Ver detalle"
                            onClick={() => handleOpenDetail(product.id)}
                          >
                            <Eye size={18} />
                          </Button>
                          <Button
                            className="text-gray-400 hover:text-gray-900 transition-colors"
                            title="Editar"
                          >
                            <Edit size={18} />
                          </Button>
                          <Button
                            className="text-gray-400 hover:text-red-600 transition-colors"
                            title="Deshabilitar"
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>
              {pagination.total > 0
                ? `${startItem}-${endItem} de ${pagination.total}`
                : "0 resultados"}
            </span>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
              className="border border-gray-200 rounded-md px-2 py-1 bg-transparent focus:outline-none focus:ring-1 focus:ring-gray-900 cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!pagination.hasPreviousPage}
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
              Anterior
            </button>

            <span className="flex items-center justify-center w-8 h-8 text-sm font-medium text-gray-900 border border-gray-300 rounded-md bg-gray-50">
              {page}
            </span>

            <button
              onClick={() =>
                setPage((p) => Math.min(pagination.totalPages, p + 1))
              }
              disabled={!pagination.hasNextPage}
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Siguiente
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <ProductDetailModal
        open={isDetailOpen}
        onOpenChange={(isOpen) => {
          setIsDetailOpen(isOpen);
          if (!isOpen) setSelectedProductId(null);
        }}
        productId={selectedProductId}
      />
    </>
  );
};

export default ProductTable;
