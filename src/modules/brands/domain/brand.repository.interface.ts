import { ApiPagination } from "@/shared/types/general";
import { Brand, BrandDto } from "./brand.type";
import { Fetcher } from "swr";

export interface IBrandRepository {
  getBrands(): Fetcher<ApiPagination<Brand>>;
  create(dto: BrandDto): Promise<void>;
}
