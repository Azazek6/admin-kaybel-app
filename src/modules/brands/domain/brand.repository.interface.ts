import { ApiPagination } from "@/shared/types/general";
import { Brand, BrandDto } from "./brand.type";
import { Fetcher } from "swr";

type status = "Active" | "Inactive";

export interface IBrandRepository {
  getBrands(): Fetcher<ApiPagination<Brand>>;
  create(dto: BrandDto): Promise<void>;
  update(id: string, dto: BrandDto): Promise<void>;
  changeStatusBrand(id: string, status: status): Promise<void>;
}
