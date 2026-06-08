import { Brand } from "@/modules/brands/domain/brand.type";
import { Category } from "@/modules/categories/domain/category.type";

export interface ProductAttributeDto {
  attrKey: string;
  attrValue: string;
}

export interface ProductVariantDto {
  groupName?: string;
  variantName: string;
  sku?: string;
  price?: number;
  compareAtPrice?: number;
  discountType?: string;
  discountValue?: number;
  stockQty?: number;
  attributes?: ProductAttributeDto[];
}

export interface SaveProductDto {
  categoryId: string;
  brandId: string;
  name: string;
  description?: string;
  basePrice?: number;
  variants: ProductVariantDto[];
}

export interface ProductVariant {
  id: string;
  productId: string;
  groupId: string;
  variantName: string;
  sku: string;
  price: number;
  currency: string;
  compareAtPrice: number;
  discountType: string;
  discountValue: number;
  stockQty: number;
  inStock: number;
  displayOrder: number;
}

export interface ProductImage {
  id: string;
  productId: string;
  variantId: string;
  imageUrl: string;
  altText: string;
  isPrimary: boolean;
  displayOrder: number;
}

export interface Product {
  id: string;
  categoryId: string;
  brandId: string;
  name: string;
  description: string;
  basePrice: number;
  isActive: boolean;
  category: Category;
  brand: Brand;
  images: ProductImage[];
  variants: ProductVariant[]
}
