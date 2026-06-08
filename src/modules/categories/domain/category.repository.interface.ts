import { ApiPagination } from "@/shared/types/general";
import { Fetcher } from "swr";
import { Category, CategoryDto } from "./category.type";

type status = "Active" | "Inactive";

export interface ICategoryRepository {
  getCategories(): Fetcher<ApiPagination<Category>>;
  create(dto: CategoryDto): Promise<void>;
  update(id: string, dto: CategoryDto): Promise<void>;
  changeStatusCategory(id: string, status: status): Promise<void>;
}
