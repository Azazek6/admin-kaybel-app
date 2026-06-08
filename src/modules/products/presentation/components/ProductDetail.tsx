"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { useProduct } from "../hooks/useProduct";
import { Spinner } from "@/shared/components/ui/spinner";
import { Package } from "lucide-react";

interface ProductDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string | null;
}

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-2">
    {children}
  </p>
);

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  open,
  onOpenChange,
  productId,
}) => {
  const { getProductById } = useProduct();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data: response, isLoading, error } = getProductById(productId ?? "");
  const product = response;

  const primaryImage =
    product?.images?.find((img: any) => img.isPrimary)?.imageUrl ??
    product?.images?.[0]?.imageUrl ??
    null;

  const activeImage = selectedImage ?? primaryImage;

  const totalStock =
    product?.variants?.reduce(
      (acc: number, v: any) => acc + (v.stockQty || 0),
      0,
    ) ?? 0;

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) setSelectedImage(null);
        onOpenChange(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-4xl bg-white max-h-[92vh] overflow-y-auto p-0 rounded-xl border border-gray-100 shadow-xl">
        <DialogTitle className="sr-only">Detalle del producto</DialogTitle>
        <DialogDescription className="sr-only">
          Información detallada del producto seleccionado.
        </DialogDescription>

        {isLoading && (
          <div className="flex flex-col items-center justify-center gap-3 p-16 text-gray-400">
            <Spinner className="size-6" />
            <p className="text-xs tracking-wider uppercase">
              Cargando producto
            </p>
          </div>
        )}

        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center gap-2 p-16">
            <p className="text-sm text-red-500">
              No se pudo cargar el producto.
            </p>
          </div>
        )}

        {product && !isLoading && (
          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-4 px-8 pt-7 pb-5 border-b border-gray-100">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">
                    {product.brand?.name}
                  </span>
                  <span className="text-gray-200 text-xs">·</span>
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">
                    {product.category?.name}
                  </span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 tracking-tight leading-tight">
                  {product.name}
                </h2>
              </div>

              <div className="flex items-center gap-3 pt-1 shrink-0">
                <span className="text-[11px] font-medium text-gray-500 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full">
                  {totalStock} en stock
                </span>
                <span
                  className={`text-[11px] font-semibold px-3 py-1 rounded-full ${
                    product.isActive
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      : "bg-red-50 text-red-600 border border-red-100"
                  }`}
                >
                  {product.isActive ? "Activo" : "Inactivo"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              <div className="px-8 py-6 flex flex-col gap-3">
                <SectionLabel>Galería</SectionLabel>

                <div className="rounded-lg overflow-hidden border border-gray-100 bg-gray-50 aspect-square w-full flex items-center justify-center">
                  {activeImage ? (
                    <img
                      src={activeImage}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Package size={36} className="text-gray-300" />
                  )}
                </div>

                {product.images && product.images.length > 1 && (
                  <div className="flex gap-2 flex-wrap">
                    {product.images.map((img: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(img.imageUrl)}
                        className={`w-14 h-14 rounded-md overflow-hidden border transition-all ${
                          activeImage === img.imageUrl
                            ? "border-gray-900 ring-1 ring-gray-900"
                            : "border-gray-100 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={img.imageUrl}
                          alt={`Imagen ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                <div className="mt-2 pt-4 border-t border-gray-100">
                  <SectionLabel>Precio referencial</SectionLabel>
                  <p className="text-3xl font-semibold text-gray-900 tracking-tight">
                    S/. {Number(product.basePrice || 0).toFixed(2)}
                  </p>
                </div>

                {product.description && (
                  <div className="pt-1">
                    <SectionLabel>Descripción</SectionLabel>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}
              </div>

              <div className="px-8 py-6 flex flex-col gap-4">
                <div className="flex items-baseline justify-between">
                  <SectionLabel>Variantes e inventario</SectionLabel>
                  <span className="text-[11px] text-gray-400 -mt-2">
                    {product.variants?.length || 0} variantes
                  </span>
                </div>

                <div className="flex flex-col divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-[2fr_1fr_80px] gap-2 px-4 py-2.5 bg-gray-50/80">
                    {["Variante / SKU", "Precio", "Stock"].map((h) => (
                      <span
                        key={h}
                        className="text-[10px] font-semibold tracking-[0.08em] uppercase text-gray-400"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {product.variants?.length > 0 ? (
                    product.variants.map((variant: any) => {
                      const isLowStock =
                        variant.stockQty > 0 && variant.stockQty <= 5;
                      const isOutOfStock = variant.stockQty === 0;

                      return (
                        <div
                          key={variant.sku}
                          className="grid grid-cols-[2fr_1fr_80px] gap-2 px-4 py-3.5 items-start hover:bg-gray-50/50 transition-colors"
                        >
                          <div className="flex flex-col gap-0.5">
                            <p className="text-sm font-medium text-gray-900">
                              {variant.variantName}
                            </p>
                            <p className="text-[11px] text-gray-400 font-mono">
                              {variant.sku}
                            </p>
                            {variant.attributes?.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                {variant.attributes.map(
                                  (attr: any, i: number) => (
                                    <span
                                      key={i}
                                      className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                                    >
                                      {attr.attrKey}: {attr.attrValue}
                                    </span>
                                  ),
                                )}
                              </div>
                            )}
                          </div>

                          <p className="text-sm text-gray-700 pt-0.5">
                            S/. {Number(variant.price || 0).toFixed(2)}
                          </p>

                          <div className="pt-0.5">
                            <span
                              className={`inline-flex items-center text-[11px] font-medium px-2.5 py-1 rounded-md whitespace-nowrap ${
                                isOutOfStock
                                  ? "bg-red-50 text-red-600 border border-red-100"
                                  : isLowStock
                                    ? "bg-amber-50 text-amber-700 border border-amber-100"
                                    : "bg-gray-100 text-gray-700 border border-gray-200"
                              }`}
                            >
                              {isOutOfStock
                                ? "Sin stock"
                                : `${variant.stockQty} unds.`}
                            </span>
                            {isLowStock && (
                              <p className="text-[10px] text-amber-600 mt-1">
                                Poco stock
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="px-4 py-6 text-center text-sm text-gray-400">
                      Sin variantes registradas
                    </div>
                  )}
                </div>

                {product.variants?.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-1">
                    {[
                      {
                        label: "Total en stock",
                        value: totalStock,
                        color: "text-gray-900",
                      },
                      {
                        label: "Variantes activas",
                        value: product.variants.filter(
                          (v: any) => v.stockQty > 0,
                        ).length,
                        color: "text-emerald-700",
                      },
                      {
                        label: "Sin stock",
                        value: product.variants.filter(
                          (v: any) => v.stockQty === 0,
                        ).length,
                        color: "text-red-500",
                      },
                    ].map(({ label, value, color }) => (
                      <div
                        key={label}
                        className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 flex flex-col gap-0.5"
                      >
                        <p className={`text-lg font-semibold ${color}`}>
                          {value}
                        </p>
                        <p className="text-[10px] text-gray-400 leading-tight">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
