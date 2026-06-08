export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  pagination?: {
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  errors?: any;
}

export interface Pagination {
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page?: number;
  limit?: number;
}

export interface ApiPagination<T> {
  pagination: Pagination;
  data: T[];
  [key: string]: any; // Para permitir otros campos adicionales
}
