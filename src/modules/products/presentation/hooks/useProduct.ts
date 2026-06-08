import { useState } from "react";
import { toast } from "sonner";
import { productService } from "../../infrastructure/services/product.service";
import useSWR, { useSWRConfig } from "swr";
import { ApiPagination } from "@/shared/types/general";
import { Product } from "../../domain/product.type";

export const useProduct = () => {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = (page: number = 1, limit: number = 10) => {
    const response = useSWR<ApiPagination<Product>>(
      `/products?page=${page}&limit=${limit}`,
      productService.getProducts(),
      { keepPreviousData: true, revalidateOnFocus: false },
    );
    return response;
  };

  const getProductById = (id: string | null) => {
    const response = useSWR<Product>(
      id ? `/products/${id}` : null, 
      productService.getProductById(),
      { revalidateOnFocus: false }
    );
    return response;
  };

  const createProduct = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await productService.createProduct(formData);
      toast.success("Producto creado con éxito");
      mutate((key) => typeof key === "string" && key.startsWith("/products"));
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Ocurrió un error al crear el producto",
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getProducts,
    getProductById, // Exportamos la nueva función
    createProduct,
    isLoading,
    setIsLoading,
  };
};