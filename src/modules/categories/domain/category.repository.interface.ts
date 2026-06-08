import { ApiPagination } from "@/shared/types/general";
import { Fetcher } from "swr";
import { Category, CategoryDto } from "./category.type";

export interface ICategoryRepository {
  getCategories(): Fetcher<ApiPagination<Category>>;
  create(dto: CategoryDto): Promise<void>;
}
