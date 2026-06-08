import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { ApiPagination } from "@/shared/types/general";
import { Category, CategoryDto } from "../../domain/category.type";
import { categoryService } from "../../infrastructure/services/category.service";

export const useCategory = () => {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);

  const getCategories = (page: number = 1, limit: number = 10) => {
    const response = useSWR<ApiPagination<Category>>(
      `/categories?page=${page}&limit=${limit}`,
      categoryService.getBrands(),
      { keepPreviousData: true, revalidateOnFocus: false },
    );
    return response;
  };

  const createCategory = async (request: CategoryDto): Promise<void> => {
    setIsLoading(true);
    try {
      await categoryService.create(request);
      mutate((key) => typeof key === "string" && key.startsWith("/categories"));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getCategories,
    createCategory,
    isLoading,
    setIsLoading,
  };
};
