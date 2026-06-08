export interface Category {
  id: string
  name: string
  isActive: boolean,
  createdAt: string
  updatedAt?: string
}

export interface CategoryDto{
  name: string
}