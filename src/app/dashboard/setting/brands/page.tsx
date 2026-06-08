"use client";
import React, { useState } from "react";
import Button from "@/shared/components/custom-ui/button";
import { Plus } from "lucide-react";
import BrandModal from "@/modules/brands/presentation/components/BrandModal";
import BrandTable from "@/modules/brands/presentation/components/BrandTable";

const Brands = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-lg tracking-wide font-semibold text-gray-900">
          Listado de Marcas
        </h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-900 rounded-xl hover:bg-gray-800 text-white text-sm gap-2 px-4 py-2 transition-colors"
        >
          <Plus size={15} />
          Agregar
        </Button>
      </div>

      <BrandTable />

      <BrandModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default Brands;
