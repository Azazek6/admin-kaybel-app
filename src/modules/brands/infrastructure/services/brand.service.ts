import { Fetcher } from "swr";
import { IBrandRepository } from "../../domain/brand.repository.interface";
import { Brand, BrandDto } from "../../domain/brand.type";
import { brandRepository } from "../repositories/brand.repository";
import { ApiPagination } from "@/shared/types/general";

export class BrandService {
  constructor(private readonly brandRepository: IBrandRepository) {}

  getBrands(): Fetcher<ApiPagination<Brand>> {
    return this.brandRepository.getBrands();
  }

  async create(dto: BrandDto): Promise<void> {
    return this.brandRepository.create(dto);
  }

  async update(id: string, dto: BrandDto): Promise<void> {
    return this.brandRepository.update(id, dto);
  }

  async changeStatusBrand(
    id: string,
    status: "Active" | "Inactive",
  ): Promise<void> {
    return this.brandRepository.changeStatusBrand(id, status);
  }
}

export const brandService = new BrandService(brandRepository);
