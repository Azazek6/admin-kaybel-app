import apiClient from "@/shared/infrastructure/http/client";
import { IBrandRepository } from "../../domain/brand.repository.interface";
import { Brand, BrandDto } from "../../domain/brand.type";
import { ApiPagination } from "@/shared/types/general";
import { Fetcher } from "swr";

export class BrandRepository implements IBrandRepository {
  async create(dto: BrandDto): Promise<void> {
    const { data } = await apiClient.post("/brands", dto);
    return data;
  }

  getBrands(): Fetcher<ApiPagination<Brand>> {
    return async (route: string) => {
      const response = await apiClient.get<ApiPagination<Brand>>(route);
      return response.data;
    };
  }
}

export const brandRepository = new BrandRepository();
