import apiClient from "@/shared/infrastructure/http/client";
import { IProductRepository } from "../../domain/product.repository.interface";
import { ApiPagination } from "@/shared/types/general";
import { Fetcher } from "swr";
import { Product } from "../../domain/product.type";

export class ProductRepository implements IProductRepository {
  async create(formData: FormData): Promise<void> {
    const { data } = await apiClient.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  }

  getProducts(): Fetcher<ApiPagination<Product>> {
    return async (route: string) => {
      const response = await apiClient.get<ApiPagination<Product>>(route);
      return response.data;
    };
  }

  getProductById(): Fetcher<Product> {
    return async (route: string) => {
      const response = await apiClient.get<Product>(route);
      return response.data;
    };
  }
}

export const productRepository = new ProductRepository();