export type ProductCategory =
  | "groceries"
  | "electronics"
  | "clothing"
  | "home"
  | "beauty"
  | "sports"
  | "other";

export type ProductStatus = "active" | "inactive";

export interface Product {
  id: string;
  name: string;
  description?: string;
  category: ProductCategory;
  regularPrice: number;
  partnerId: string;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductData {
  name: string;
  description?: string;
  category: ProductCategory;
  regularPrice: number;
  partnerId: string;
  status?: ProductStatus;
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  category?: ProductCategory;
  regularPrice?: number;
  status?: ProductStatus;
}

export interface ProductWithPromotion extends Product {
  promotion?: {
    id: string;
    promoPrice: number;
    promoDiscount: number;
    stockQuantity: number;
    status: ProductStatus;
  };
}

// Types for the search functionality
export interface ProductSearchResult {
  id: string;
  name: string;
  category: ProductCategory;
  regularPrice: number;
  description?: string;
}

export interface ProductSearchParams {
  query: string;
  category?: ProductCategory;
  partnerId: string;
}
