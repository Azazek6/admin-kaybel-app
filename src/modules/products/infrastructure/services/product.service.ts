import { Fetcher } from "swr";
import { IProductRepository } from "../../domain/product.repository.interface";
import { productRepository } from "../repositories/product.repository";
import { ApiPagination } from "@/shared/types/general";
import { Product } from "../../domain/product.type";

export class ProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  getProducts(): Fetcher<ApiPagination<Product>> {
    return this.productRepository.getProducts();
  }

  getProductById(): Fetcher<Product> {
    return this.productRepository.getProductById();
  }

  async createProduct(formData: FormData): Promise<void> {
    return this.productRepository.create(formData);
  }
}

export const productService = new ProductService(productRepository);