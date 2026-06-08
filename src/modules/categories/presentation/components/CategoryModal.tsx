"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import Button from "@/shared/components/custom-ui/button";
import Input from "@/shared/components/custom-ui/input";
import { toast } from "sonner";
import { Spinner } from "@/shared/components/ui/spinner";
import { useCategory } from "../hooks/useCategory";

interface CategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { createCategory } = useCategory();

  const [category, setCategory] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    try {
      await createCategory(category);
      setCategory({ name: "" });
      onOpenChange(false);
      toast.success("Se ha registrado la categoria");
    } catch (error: any) {
      toast.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-112.5 bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl">Nueva Categoria</DialogTitle>
          <DialogDescription className="text-gray-500">
            Ingresa el nombre de la nueva categoria para agregarla al catálogo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Nombre de la Categoria
            </label>
            <Input
              id="name"
              name="name"
              value={category.name}
              onChange={handleChange}
              placeholder="Ej. Dior..."
            />
          </div>

          <DialogFooter className="mt-2 flex gap-2">
            <Button
              type="button"
              onClick={() => onOpenChange(false)}
              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2"
            >
              Cancelar
            </Button>
            <Button
              disabled={loading}
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Spinner className="size-4" /> : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
