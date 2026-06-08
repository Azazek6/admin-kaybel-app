import apiClient from "@/shared/infrastructure/http/client";
import { ApiPagination } from "@/shared/types/general";
import { Fetcher } from "swr";
import { ICategoryRepository } from "../../domain/category.repository.interface";
import { Category, CategoryDto } from "../../domain/category.type";

export class CategoryRepository implements ICategoryRepository {
  async create(dto: CategoryDto): Promise<void> {
    const { data } = await apiClient.post("/categories", dto);
    return data;
  }

  async update(id: string, dto: CategoryDto): Promise<void> {
    const { data } = await apiClient.patch(`/categories/${id}`, dto);
    return data;
  }

  async changeStatusCategory(
    id: string,
    status: "Active" | "Inactive",
  ): Promise<void> {
    const { data } = await apiClient.patch(`/categories/${id}/status`, {
      status,
    });
    return data;
  }

  getCategories(): Fetcher<ApiPagination<Category>> {
    return async (route: string) => {
      const response = await apiClient.get<ApiPagination<Category>>(route);
      return response.data;
    };
  }
}

export const categoryRepository = new CategoryRepository();
