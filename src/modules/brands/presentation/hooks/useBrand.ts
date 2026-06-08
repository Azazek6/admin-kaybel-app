import { useState } from "react";
import { Brand, BrandDto } from "../../domain/brand.type";
import { brandService } from "../../infrastructure/services/brand.service";
import useSWR, { useSWRConfig } from "swr";
import { ApiPagination } from "@/shared/types/general";
import { toast } from "sonner";

export const useBrand = () => {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);

  const getBrands = (page: number = 1, limit: number = 10) => {
    const response = useSWR<ApiPagination<Brand>>(
      `/brands?page=${page}&limit=${limit}`,
      brandService.getBrands(),
      { keepPreviousData: true, revalidateOnFocus: false },
    );
    return response;
  };

  const createBrand = async (request: BrandDto): Promise<void> => {
    setIsLoading(true);
    try {
      await brandService.create(request);
      mutate((key) => typeof key === "string" && key.startsWith("/brands"));
    } finally {
      setIsLoading(false);
    }
  };

  const updateBrand = async (id: string, request: BrandDto): Promise<void> => {
    setIsLoading(true);
    try {
      await brandService.update(id, request);
      mutate((key) => typeof key === "string" && key.startsWith("/brands"));
    } finally {
      setIsLoading(false);
    }
  };

  const changeStatusBrand = async (
    id: string,
    status: "Active" | "Inactive",
  ): Promise<void> => {
    const isActive = status === "Active";
    const accion = isActive ? "habilitada" : "deshabilitada";
    setIsLoading(true);
    try {
      await brandService.changeStatusBrand(id, status);
      toast.success(`La marca a sido ${accion}`);
      mutate((key) => typeof key === "string" && key.startsWith("/brands"));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getBrands,
    createBrand,
    updateBrand,
    changeStatusBrand,
    isLoading,
    setIsLoading,
  };
};
