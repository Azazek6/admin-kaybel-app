"use client";
import CategoryModal from "@/modules/categories/presentation/components/CategoryModal";
import CategoryTable from "@/modules/categories/presentation/components/CategoryTable";
import Button from "@/shared/components/custom-ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-lg tracking-wide font-semibold">
          Listado de Categorias
        </h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-900 rounded-xl hover:bg-gray-800 text-white text-sm gap-2 px-4 py-2 transition-colors"
        >
          <Plus size={15} />
          Agregar
        </Button>
      </div>

      <CategoryTable />

      <CategoryModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default Categories;
