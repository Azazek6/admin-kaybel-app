"use client";
import React, { useState, useEffect } from "react";
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
import { useBrand } from "../hooks/useBrand";
import { toast } from "sonner";
import { Spinner } from "@/shared/components/ui/spinner";

interface BrandModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brandToEdit?: { id: string; name: string } | null;
}

const BrandModal: React.FC<BrandModalProps> = ({
  open,
  onOpenChange,
  brandToEdit,
}) => {
  const { createBrand, updateBrand } = useBrand();

  const [brand, setBrand] = useState({ name: "" });
  const [loading, setLoading] = useState(false);

  const isEditing = !!brandToEdit;

  useEffect(() => {
    if (open) {
      if (brandToEdit) {
        setBrand({ name: brandToEdit.name });
      } else {
        setBrand({ name: "" });
      }
    }
  }, [open, brandToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBrand((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing && brandToEdit) {
        await updateBrand(brandToEdit.id, brand);
        toast.success("Se ha actualizado la marca correctamente");
      } else {
        await createBrand(brand);
        toast.success("Se ha registrado la marca");
      }

      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-112.5 bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isEditing ? "Editar Marca" : "Nueva Marca"}
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            {isEditing
              ? "Actualiza el nombre de la marca en tu catálogo."
              : "Ingresa el nombre de la nueva marca para agregarla al catálogo."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Nombre de la Marca
            </label>
            <Input
              id="name"
              name="name"
              value={brand.name}
              onChange={handleChange}
              placeholder="Ej. Dior..."
              required
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
              disabled={loading || !brand.name.trim()}
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

export default BrandModal;
