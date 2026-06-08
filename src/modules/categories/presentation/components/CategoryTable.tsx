"use client";
import React, { useState } from "react";
import { Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/shared/components/custom-ui/button";
import { useCategory } from "../hooks/useCategory";

const CategoryTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { getCategories } = useCategory();
  const { data: response, isLoading, error } = getCategories(page, limit);

  const categories = response?.data || [];
  const pagination = response?.pagination || {
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  };

  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, pagination.total);

  if (isLoading) {
    return (
      <div className="p-8 text-center text-sm text-gray-500">
        Cargando categorias...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-sm text-red-500">
        Error al cargar las categorias.
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-10">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-medium uppercase tracking-wider">
                Nombre de la Categoria
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
            {categories.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  No hay categorias registradas.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr
                  key={category.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {category.name}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                        category.isActive
                          ? "bg-green-100/50 text-green-700"
                          : "bg-red-100/50 text-red-700"
                      }`}
                    >
                      {category.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <Button
                        className="text-gray-400 hover:text-gray-900 transition-colors"
                        title="Editar"
                      >
                        <Edit size={18} />
                      </Button>
                      <Button
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
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
  );
};

export default CategoryTable;
