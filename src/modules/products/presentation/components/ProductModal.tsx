"use client";
import React, { useState, useRef } from "react";
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
import { Textarea } from "@/shared/components/ui/textarea";
import { useProduct } from "../hooks/useProduct";
import { Spinner } from "@/shared/components/ui/spinner";
import { Plus, Trash2, ImagePlus, X, Star } from "lucide-react";
import { ProductVariantDto } from "../../domain/product.type";
import { useBrand } from "@/modules/brands/presentation/hooks/useBrand";
import { useCategory } from "@/modules/categories/presentation/hooks/useCategory";

const GROUP_OPTIONS = [
  "Perfumes",
  "Cremas",
  "Hombres",
  "Mujeres",
  "Monocromático",
  "Monogrameadas",
  "Unisex",
  "Sets",
];

const generateSKU = (prodName: string, varName: string, index: number) => {
  const cleanProd = prodName.trim().substring(0, 3).toUpperCase() || "PRD";
  const cleanVar = varName.trim().substring(0, 3).toUpperCase() || "VAR";
  const uniqueNum = String(index + 1).padStart(3, "0");
  return `${cleanProd}-${cleanVar}-${uniqueNum}`;
};

const preventNegativeInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "-" || e.key === "e") e.preventDefault();
};

const preventDecimalAndNegative = (
  e: React.KeyboardEvent<HTMLInputElement>,
) => {
  if (e.key === "-" || e.key === "e" || e.key === "." || e.key === ",")
    e.preventDefault();
};

interface ImagePreview {
  file: File;
  url: string;
  isPrimary: boolean;
}

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ open, onOpenChange }) => {
  const { createProduct, isLoading } = useProduct();
  const { getBrands } = useBrand();
  const { getCategories } = useCategory();

  const { data: responseBrand, isLoading: loadingBrand } = getBrands();
  const { data: responseCat, isLoading: loadingCat } = getCategories();

  const brands = responseBrand?.data || [];
  const categories = responseCat?.data || [];

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    basePrice: "",
    categoryId: "",
    brandId: "",
  });

  const [variants, setVariants] = useState<any[]>([
    {
      groupName: "",
      variantName: "",
      sku: "",
      price: "",
      compareAtPrice: "",
      discountType: "",
      discountValue: "",
      stockQty: "",
      attributes: [],
    },
  ]);

  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);

  const handleProductChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const incoming = Array.from(e.target.files);
    const remaining = 5 - imagePreviews.length;
    const toAdd = incoming.slice(0, remaining);

    const newPreviews: ImagePreview[] = toAdd.map((file, i) => ({
      file,
      url: URL.createObjectURL(file),
      isPrimary: imagePreviews.length === 0 && i === 0,
    }));

    setImagePreviews((prev) => [...prev, ...newPreviews]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    setImagePreviews((prev) => {
      const removingPrimary = prev[index].isPrimary;
      const next = prev.filter((_, i) => i !== index);
      if (removingPrimary && next.length > 0) {
        next[0] = { ...next[0], isPrimary: true };
      }
      return next;
    });
  };

  const setPrimary = (index: number) => {
    setImagePreviews((prev) =>
      prev.map((img, i) => ({ ...img, isPrimary: i === index })),
    );
  };

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        groupName: "",
        variantName: "",
        sku: "",
        price: "",
        compareAtPrice: "",
        discountType: "",
        discountValue: "",
        stockQty: "",
        attributes: [],
      },
    ]);
  };

  const removeVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVariantChange = (index: number, field: string, value: string) => {
    const newVariants = [...variants];
    if (
      field === "discountType" &&
      value === "percent" &&
      Number(newVariants[index].discountValue) > 100
    ) {
      newVariants[index].discountValue = "100";
    }
    newVariants[index][field] = value;
    if (field === "discountType" && value === "") {
      newVariants[index]["discountValue"] = "";
    }
    if (field === "variantName" && !newVariants[index].sku) {
      newVariants[index].sku = generateSKU(product.name, value, index);
    }
    setVariants(newVariants);
  };

  const addAttribute = (variantIndex: number) => {
    const newVariants = [...variants];
    newVariants[variantIndex].attributes.push({ attrKey: "", attrValue: "" });
    setVariants(newVariants);
  };

  const removeAttribute = (variantIndex: number, attrIndex: number) => {
    const newVariants = [...variants];
    newVariants[variantIndex].attributes = newVariants[
      variantIndex
    ].attributes.filter((_: any, i: number) => i !== attrIndex);
    setVariants(newVariants);
  };

  const handleAttributeChange = (
    variantIndex: number,
    attrIndex: number,
    field: "attrKey" | "attrValue",
    value: string,
  ) => {
    const newVariants = [...variants];
    newVariants[variantIndex].attributes[attrIndex][field] = value;
    setVariants(newVariants);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    const cleanedVariants: ProductVariantDto[] = variants.map((v) => ({
      groupName: v.groupName || undefined,
      variantName: v.variantName,
      sku: v.sku || undefined,
      price: v.price ? Number(v.price) : undefined,
      compareAtPrice: v.compareAtPrice ? Number(v.compareAtPrice) : undefined,
      discountType: v.discountType || undefined,
      discountValue: v.discountValue ? Number(v.discountValue) : undefined,
      stockQty: v.stockQty ? Number(v.stockQty) : undefined,
      attributes: v.attributes.length > 0 ? v.attributes : undefined,
    }));

    const productData = {
      name: product.name,
      description: product.description || undefined,
      basePrice: product.basePrice ? Number(product.basePrice) : undefined,
      categoryId: product.categoryId,
      brandId: product.brandId,
      variants: cleanedVariants,
    };

    formData.append("data", JSON.stringify(productData));
    const sorted = [...imagePreviews].sort((a, b) =>
      a.isPrimary ? -1 : b.isPrimary ? 1 : 0,
    );
    sorted.forEach(({ file }) => formData.append("images", file));

    try {
      await createProduct(formData);
      setProduct({
        name: "",
        description: "",
        basePrice: "",
        categoryId: "",
        brandId: "",
      });
      setVariants([
        {
          groupName: "",
          variantName: "",
          sku: "",
          price: "",
          compareAtPrice: "",
          discountType: "",
          discountValue: "",
          stockQty: "",
          attributes: [],
        },
      ]);
      setImagePreviews([]);
      onOpenChange(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-187.5 bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Nuevo Producto</DialogTitle>
          <DialogDescription className="text-gray-500">
            Ingresa los datos generales, variantes, atributos y galería del
            producto.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Nombre del Producto *
              </label>
              <Input
                name="name"
                value={product.name}
                onChange={handleProductChange}
                placeholder="Ej. Yara Candy EDP 100ml"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Marca *
              </label>
              <select
                name="brandId"
                value={product.brandId}
                onChange={handleProductChange}
                required
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-300 ease-in-out"
              >
                <option value="" disabled>
                  Selecciona una marca
                </option>
                {loadingBrand ? (
                  <option disabled>Cargando marcas...</option>
                ) : (
                  brands.map((brand: any) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Categoría *
              </label>
              <select
                name="categoryId"
                value={product.categoryId}
                onChange={handleProductChange}
                required
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-300 ease-in-out"
              >
                <option value="" disabled>
                  Selecciona una categoría
                </option>
                {loadingCat ? (
                  <option disabled>Cargando categorías...</option>
                ) : (
                  categories.map((category: any) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="flex flex-col gap-2 col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Precio Referencial (S/.){" "}
                <span className="text-gray-400 font-normal">(Opcional)</span>
              </label>
              <Input
                name="basePrice"
                type="number"
                step="0.01"
                min="0"
                onKeyDown={preventNegativeInput}
                placeholder="0.00"
                value={product.basePrice}
                onChange={handleProductChange}
              />
            </div>

            <div className="flex flex-col gap-2 col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Descripción del producto
              </label>
              <Textarea
                name="description"
                value={product.description}
                onChange={handleProductChange}
                placeholder="Escribe los detalles, notas olfativas, características..."
                className="resize-none"
                rows={3}
              />
            </div>

            <div className="flex flex-col gap-3 col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Galería de Imágenes
                  </label>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Máx. 5 imágenes. Haz clic en{" "}
                    <Star size={10} className="inline -mt-0.5" /> para definir
                    la imagen principal.
                  </p>
                </div>
                {imagePreviews.length < 5 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 border border-gray-200 px-3 py-1.5 rounded-md transition-colors"
                  >
                    <ImagePlus size={14} />
                    Agregar imagen
                  </button>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {imagePreviews.length === 0 ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-gray-200 rounded-lg py-8 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <ImagePlus size={24} strokeWidth={1.5} />
                  <span className="text-xs">
                    Haz clic para seleccionar imágenes
                  </span>
                </button>
              ) : (
                <div className="grid grid-cols-5 gap-2">
                  {imagePreviews.map((img, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img
                        src={img.url}
                        alt={`Imagen ${index + 1}`}
                        className={`w-full h-full object-cover rounded-lg border-2 transition-all ${
                          img.isPrimary
                            ? "border-gray-900"
                            : "border-gray-100 group-hover:border-gray-300"
                        }`}
                      />

                      {img.isPrimary && (
                        <span className="absolute bottom-1 left-1 text-[9px] font-semibold bg-gray-900 text-white px-1.5 py-0.5 rounded-sm leading-tight">
                          Principal
                        </span>
                      )}

                      <div className="absolute inset-0 rounded-lg bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                        {!img.isPrimary && (
                          <button
                            type="button"
                            onClick={() => setPrimary(index)}
                            title="Marcar como principal"
                            className="p-1 rounded-md bg-white/90 hover:bg-white text-gray-700 transition-colors"
                          >
                            <Star size={13} />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          title="Eliminar imagen"
                          className="p-1 rounded-md bg-white/90 hover:bg-white text-red-500 transition-colors"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {imagePreviews.length < 5 && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1 text-gray-300 hover:border-gray-300 hover:text-gray-400 transition-colors"
                    >
                      <Plus size={18} strokeWidth={1.5} />
                      <span className="text-[10px]">
                        {5 - imagePreviews.length} más
                      </span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <hr className="border-gray-200" />

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900">
                  Variantes e Inventario
                </h3>
                <p className="text-xs text-gray-500">
                  Agrega las diferentes opciones, precios y stock de este
                  producto.
                </p>
              </div>
              <Button
                type="button"
                onClick={addVariant}
                className="bg-gray-100 text-gray-900 hover:bg-gray-200 px-3 py-1.5 text-xs"
              >
                <Plus size={14} className="mr-1" /> Agregar Variante
              </Button>
            </div>

            {variants.map((variant, vIndex) => (
              <div
                key={vIndex}
                className="p-5 border border-gray-200 rounded-lg bg-gray-50 flex flex-col gap-5 relative"
              >
                {variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVariant(vIndex)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition-colors"
                    title="Eliminar variante"
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                <div className="grid grid-cols-2 gap-x-4 gap-y-5 pr-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Nombre de la Variante *
                    </label>
                    <Input
                      required
                      placeholder="Ej: Azul Noche, Light Peach"
                      value={variant.variantName}
                      onChange={(e) =>
                        handleVariantChange(
                          vIndex,
                          "variantName",
                          e.target.value,
                        )
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Agrupación Visual{" "}
                      <span className="text-gray-400 font-normal normal-case">
                        (Opcional)
                      </span>
                    </label>
                    <select
                      value={variant.groupName}
                      onChange={(e) =>
                        handleVariantChange(vIndex, "groupName", e.target.value)
                      }
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-300 ease-in-out"
                    >
                      <option value="">Sin Agrupar</option>
                      {GROUP_OPTIONS.map((group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Código SKU
                    </label>
                    <Input
                      placeholder="Ej: PROD-VAR-001"
                      value={variant.sku}
                      onChange={(e) =>
                        handleVariantChange(vIndex, "sku", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Cantidad en Stock *
                    </label>
                    <Input
                      type="number"
                      step="1"
                      min="0"
                      onKeyDown={preventDecimalAndNegative}
                      required
                      placeholder="0"
                      value={variant.stockQty}
                      onChange={(e) =>
                        handleVariantChange(vIndex, "stockQty", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Precio de Venta (S/.) *
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      onKeyDown={preventNegativeInput}
                      required
                      placeholder="Ej: 128.00"
                      value={variant.price}
                      onChange={(e) =>
                        handleVariantChange(vIndex, "price", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Precio Original Tachado (S/.)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      onKeyDown={preventNegativeInput}
                      placeholder="Ej: 160.00"
                      value={variant.compareAtPrice}
                      onChange={(e) =>
                        handleVariantChange(
                          vIndex,
                          "compareAtPrice",
                          e.target.value,
                        )
                      }
                    />
                    <span className="text-[10px] text-gray-400">
                      Si lo dejas vacío, no se mostrará como oferta.
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Tipo de Descuento
                    </label>
                    <select
                      value={variant.discountType}
                      onChange={(e) =>
                        handleVariantChange(
                          vIndex,
                          "discountType",
                          e.target.value,
                        )
                      }
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-300 ease-in-out"
                    >
                      <option value="">Ninguno</option>
                      <option value="percent">Porcentaje (%)</option>
                      <option value="fixed">Monto Fijo (S/.)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Valor del Descuento
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      max={
                        variant.discountType === "percent" ? "100" : undefined
                      }
                      onKeyDown={preventNegativeInput}
                      disabled={!variant.discountType}
                      placeholder={
                        variant.discountType === "percent"
                          ? "Ej: 20 (para 20%)"
                          : variant.discountType === "fixed"
                            ? "Ej: 15.00 (para S/. 15 off)"
                            : "Selecciona un tipo de descuento"
                      }
                      value={variant.discountValue}
                      onChange={(e) => {
                        let val = e.target.value;
                        if (
                          variant.discountType === "percent" &&
                          Number(val) > 100
                        )
                          val = "100";
                        handleVariantChange(vIndex, "discountValue", val);
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        Atributos Adicionales
                      </h4>
                      <span className="text-[10px] text-gray-400">
                        Ej: "Acabado" - "Mate" / "Duración" - "16 hrs"
                      </span>
                    </div>
                    <Button
                      type="button"
                      onClick={() => addAttribute(vIndex)}
                      className="text-xs text-gray-600 bg-transparent hover:bg-gray-200 border border-gray-300 px-2 py-1 h-auto"
                    >
                      <Plus size={12} className="mr-1" /> Atributo
                    </Button>
                  </div>

                  {variant.attributes.map((attr: any, aIndex: number) => (
                    <div key={aIndex} className="flex items-center gap-2">
                      <Input
                        className="h-8 text-xs"
                        placeholder="Característica (Ej: Talla, Acabado)"
                        value={attr.attrKey}
                        onChange={(e) =>
                          handleAttributeChange(
                            vIndex,
                            aIndex,
                            "attrKey",
                            e.target.value,
                          )
                        }
                        required
                      />
                      <Input
                        className="h-8 text-xs"
                        placeholder="Valor (Ej: XL, Mate)"
                        value={attr.attrValue}
                        onChange={(e) =>
                          handleAttributeChange(
                            vIndex,
                            aIndex,
                            "attrValue",
                            e.target.value,
                          )
                        }
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeAttribute(vIndex, aIndex)}
                        className="text-gray-400 hover:text-red-600 p-2"
                        title="Eliminar atributo"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <DialogFooter className="mt-4 flex gap-2 sticky bottom-0 bg-white py-4 border-t border-gray-100 z-10">
            <Button
              type="button"
              onClick={() => onOpenChange(false)}
              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2"
            >
              Cancelar
            </Button>
            <Button
              disabled={
                isLoading ||
                !product.name.trim() ||
                !product.brandId ||
                !product.categoryId
              }
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? <Spinner className="size-4" /> : "Guardar Producto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
