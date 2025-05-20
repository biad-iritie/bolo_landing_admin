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
  name: string;
  description?: string;
  category: PromotionCategory;
  regularPrice: number;
  promoPrice: number;
  promoDiscount: number;
  stockQuantity: number;
  lowStockThreshold: number;
  status: PromotionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePromotionData {
  name: string;
  description?: string;
  category: PromotionCategory;
  regularPrice: number;
  promoPrice: number;
  promoDiscount: number;
  stockQuantity: number;
  lowStockThreshold?: number;
  status?: PromotionStatus;
}

export interface UpdatePromotionData {
  name?: string;
  description?: string;
  category?: PromotionCategory;
  regularPrice?: number;
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
