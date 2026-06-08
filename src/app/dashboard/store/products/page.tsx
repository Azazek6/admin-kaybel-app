"use client";
import ProductModal from "@/modules/products/presentation/components/ProductModal";
import ProductTable from "@/modules/products/presentation/components/ProductTable";
import Button from "@/shared/components/custom-ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";

const Product = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-lg tracking-wide font-semibold text-gray-900">
          Listado de Productos
        </h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-900 rounded-xl hover:bg-gray-800 text-white text-sm gap-2 px-4 py-2 transition-colors"
        >
          <Plus size={15} />
          Agregar
        </Button>
      </div>

      <ProductTable />

      <ProductModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default Product;
