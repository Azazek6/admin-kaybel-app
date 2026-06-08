import { Fetcher } from "swr";
import { categoryRepository } from "../repositories/category.repository";
import { ApiPagination } from "@/shared/types/general";
import { ICategoryRepository } from "../../domain/category.repository.interface";
import { Category, CategoryDto } from "../../domain/category.type";

export class CategoryService {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  getBrands(): Fetcher<ApiPagination<Category>> {
    return this.categoryRepository.getCategories();
  }

  async create(dto: CategoryDto): Promise<void> {
    return this.categoryRepository.create(dto);
  }

  async update(id: string, dto: CategoryDto): Promise<void> {
    return this.categoryRepository.update(id, dto);
  }

  async changeStatusCategory(
    id: string,
    status: "Active" | "Inactive",
  ): Promise<void> {
    return this.categoryRepository.changeStatusCategory(id, status);
  }
}

export const categoryService = new CategoryService(categoryRepository);
