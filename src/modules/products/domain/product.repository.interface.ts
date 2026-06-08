import { Fetcher } from "swr";
import { Product } from "./product.type";
import { ApiPagination } from "@/shared/types/general";

export interface IProductRepository {
  getProducts(): Fetcher<ApiPagination<Product>>;
  getProductById(): Fetcher<Product>; 
  create(dto: FormData): Promise<void>;
}