import { Product, ProductCategory } from "./product";

export type PromotionCategory =
  | "groceries"
  | "electronics"
  | "clothing"
  | "home"
  | "beauty"
  | "sports"
  | "other";

export type PromotionStatus = "active" | "inactive";

export interface Promotion {
  id: string;
  productId: string;
  product: Product;
  promoPrice: number;
  promoDiscount: number;
  stockQuantity: number;
  lowStockThreshold: number;
  status: PromotionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePromotionData {
  productId: string;
  promoPrice: number;
  promoDiscount: number;
  stockQuantity: number;
  lowStockThreshold?: number;
  status?: PromotionStatus;
}

export interface UpdatePromotionData {
  promoPrice?: number;
  promoDiscount?: number;
  stockQuantity?: number;
  lowStockThreshold?: number;
  status?: PromotionStatus;
}

export interface PromotionFilters {
  search?: string;
  category?: PromotionCategory;
  status?: PromotionStatus;
}

export interface PromotionSort {
  field: keyof Promotion;
  direction: "asc" | "desc";
}

export interface PromotionListResponse {
  promotions: Promotion[];
  total: number;
  page: number;
  limit: number;
}

// Re-export product category for convenience
export type { ProductCategory };
